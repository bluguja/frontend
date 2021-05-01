import Navigo from "navigo";
import "regenerator-runtime/runtime.js";

const {Authentication} = require("./AuthenticationController");
const {Post} = require("./PostsController");
const {Comment} = require("./CommentsController");
const {Like} = require("./LikesController");
const {
    navBar,
    loginForm,
    signUpForm,
    postForm,
    dashboard,
    postBodyHtml,
    postDescription,
    commentBodyHtml,
    commentDescription
} = require("./view");

document.addEventListener("DOMContentLoaded", async function () {
    //Helper method
    const mapToggle = {
        'toggle': 'toggle',
        'show': 'add',
        'hide': 'remove'
    };
    const getInt = (value) => {
        return parseInt(value.replace(/[^\d.]/g, ''))
    }
    const getElement = (id) => {
        return document.getElementById(id);
    }
    //Helper method end
    const navDiv = getElement('navDiv');
    navDiv.innerHTML = navBar
    let posts = getElement("posts")
    const rootDiv = getElement('root');
    let loginButton = getElement("loginButton")
    let signupButton = getElement("signupButton")
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let postFeed = getElement("postFeed")


    // Common logic start
    let post, comment, like, postArray = [];
    const authentication = new Authentication
    const SetAuthToken = async (currentUser) => {
        currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (currentUser !== null) {
            post = new Post(currentUser?.auth_token)
            comment = new Comment(currentUser?.auth_token)
            like = new Like(currentUser?.auth_token)
            signupButton.innerHTML = ""
            loginButton.innerText = "Log Out"
            loginButton.href = "/logout"
        } else {
            loginButton.innerText = "Log in"
            loginButton.href = "/login"
            signupButton.innerHTML = `<a class="signup-button" id="signupButton" href="/sign_up" data-navigo>Sign Up</a>`
        }
    }

    let postDiv, sharePost;
    let showPostsView = async () => {
        if (currentUser && currentUser?.auth_token !== null) {
            let response = await post.index();
            if (response && response.status === 200) {
                postArray = response.data.posts;
                rootDiv.innerHTML = dashboard(postArray);
                let rightPostView = getElement("rightPostView")
                rightPostView.innerHTML = postForm
            } else {
                router.navigate('/');
            }
        } else {
            router.navigate('/login');
        }

    };

    const matchPassword = () => getElement("password").value !== getElement("confirm_password").value
    await SetAuthToken(currentUser);

    // Common logic end

    // Router start

    const router = new Navigo('/');

    router.on('/', function () {
        if (currentUser !== null) {
            router.navigate('/posts');
        } else {
            router.navigate('/login');
        }
    });

    router.on('/sign_up', function () {
        if (currentUser !== null) {
            router.navigate('/');
        } else {
            rootDiv.innerHTML = signUpForm
        }
    })

    router.on('/login', function () {
        if (currentUser !== null) {
            router.navigate('/posts');
        } else {
            rootDiv.innerHTML = loginForm
        }
    })

    router.on('/logout', function () {
    });

    router.on('/posts', async function () {
        await showPostsView();
    });

    router.resolve();

    // Router end

    // Handle Click submission
    loginButton.addEventListener('click', async function (event) {
        if (event.target.text === "Log Out") {
          let response = await authentication.logout(currentUser?.auth_token);
          localStorage.removeItem("currentUser");
          currentUser = null
          await SetAuthToken(currentUser);
          await router.navigate('/login');
        }
    });

    postFeed.addEventListener('click', function (event) {
        event.preventDefault();
        router.navigate('/posts');
    });





    // Listen all clickEvent
    document.addEventListener('click', async function (event) {
        event.preventDefault();
        const element = event.target;
        const id = getInt(element.id)
        const collapsable = element.getAttribute('data-target');
        const collapsableItem = getElement(`post_comment_div${id}`)
        if (collapsable) collapsableItem.classList[mapToggle['toggle']]('show')

        if (element.id === "loginFormBtn") {
            let response = await authentication.login();
            rootDiv.innerHTML = `<div class="d-flex justify-content-center mt-5 pt-5">
                                  <div class="spinner-border" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                  </div>
                                </div>`
            if (response && response.status === 200) {
              localStorage.setItem("currentUser",JSON.stringify(response.data));
              currentUser = JSON.parse(localStorage.getItem("currentUser"));
              await SetAuthToken(currentUser);
              router.navigate('/posts');
            } else {
                router.navigate('/login');
            }
        } else if (element.id === "signupFormBtn") {
            if (matchPassword()) {
                getElement("error").innerText = "Password does not match!"
                router.navigate('/sign_up');
            } else {
                let response = await authentication.signup();
                if (response && response.status === 201) {
                    router.navigate('/login');
                } else {
                    router.navigate('/sign_up');
                }
            }
        } else if (element.id === "sharePost") {
            let response = await post.create();
            const data = response.data
            let currentPost = postBodyHtml(currentUser.user.name, data.post, [], [])
            let postDiv = getElement("postDiv")
            postDiv.innerHTML = currentPost + postDiv.innerHTML
            getElement("post_description").value = ''
        } else if (element.getAttribute("data-name") === "like") {
            let response = await like.updateLike(element.id);
            let likableId = element.getAttribute("data-id-value")
            getElement(`${likableId}likesCount`).innerText = `${response.data.likes} people likes this post`
        } else if (element.id === `${id}postEditBtn`) {
            let post = getElement(id)
            post.innerText = ''
            getElement(`${id}editForm`).hidden = false
        } else if (element.id === `${id}update`) {
            let description = getElement(`${id}edit`).value
            let response = await post.update(id, description);
            getElement(`${id}editForm`).hidden = true
            let postEditDiv = getElement(`${id}postEditDiv`)
            postEditDiv.innerHTML = postDescription(response.data)
        } else if (element.id === `${id}commentEditBtn`) {
            getElement(`${id}comment`).hidden = true
            getElement(`${id}commentEditBtn`).hidden = true
            getElement(`${id}commentDeleteBtn`).hidden = true
            getElement(`${id}commentEditForm`).hidden = false
        } else if (element.id === `${id}commentUpdate`) {
            getElement(`${id}commentEditForm`).hidden = true
            getElement(`${id}commentEditBtn`).hidden = false
            getElement(`${id}commentDeleteBtn`).hidden = false
            let description = getElement(`${id}commentEdit`).value
            let response = await comment.update(id, description);
            let commentEditDiv = getElement(`${id}commentEditDiv`)
            commentEditDiv.innerHTML = commentDescription(response.data)
        } else if (element.id === `${id}postDeleteBtn`) {
            let response = await post.destroy(id);
            let postcard = getElement(`${id}postCard`)
            postcard.remove()
        } else if (element.id === `${id}commentDeleteBtn`) {
            let response = await comment.destroy(id);
            let commentCard = getElement(`${id}commentCard`)
            commentCard.remove()
        }
        if (element.id === `${id}postComment`) {
            let response = await comment.create(id);
            const data = response.data
            let currentComment = commentBodyHtml(currentUser.user.name, data)
            let commentDiv = getElement(`post_comment_div${id}`)
            let commentCount = getElement(`comment_count${id}`)
            commentCount.innerHTML = `
                <i style="font-size: 20px;" class="fa fa-commenting-o"></i>
                ${parseInt(commentCount.innerText) + 1} comments`
            commentDiv.innerHTML = currentComment + commentDiv.innerHTML
            let commentBox = getElement(`post${id}`)
            commentBox.value = ''
            if(collapsableItem.classList.contains('show')){
                collapsableItem.classList[mapToggle['toggle']]('hide')
            } else {
                collapsableItem.classList[mapToggle['toggle']]('show')
            }
        } else if (element.id === `${id}commentCancel`) {
            getElement(`${id}comment`).hidden = false
            getElement(`${id}commentEditBtn`).hidden = false
            getElement(`${id}commentDeleteBtn`).hidden = false
            getElement(`${id}commentEditForm`).hidden = true
        }
        else { return false }
    });

});
