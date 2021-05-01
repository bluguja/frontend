export const navBar =
    `
<nav class="navbar navbar-expand-lg navbar-light fixed-top nav-style">
    <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
           <span class="navbar-toggler-icon"></span>
        </button>
        <a id="postFeed" class="nav-link active feed" aria-current="page" href="/posts" data-navigo>PostFeed</a>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <div class="navbar-nav me-auto mb-2 mb-lg-0">
            </div>
            <a class="login-button" id="loginButton" href="/login" data-navigo>Log in</a>
            <div id="signupButton">Sign Up</div>
        </div>
    </div>
</nav>
  `

export const signUpForm =
    `
  <div class="wrapper fadeInDown sign-form">
    <div id="formContent" class="pt-5">
      <h1 class="p-4">User Registration</h1>
       <span id="error"></span>
       <form id="sign_up_form">
        <input type="text" required id="name" class="fadeIn second" name="name" autocomplete="name"  placeholder="Name">
        <input type="text" required id="email" class="fadeIn second" name="email" autocomplete="email"  placeholder="Email">
        
        <select id="gender" class="formSelect fadeIn second" name="gender" autocomplete="gender" aria-label="Default select example">
          <option value="Other" selected>Other</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        
        <input type="text" required id="address" class="fadeIn second" name="address" autocomplete="address"  placeholder="Address">
        <input type="text" required id="occupation" class="fadeIn second" name="occupation" autocomplete="occupation"  placeholder="Occupation">
        <input type="password" required id="password" class="fadeIn third" name="password" autocomplete="password"  placeholder="password">
        <input type="password" required id="confirm_password" class="fadeIn third" name="confirm_password" autocomplete="confirm_password"  placeholder="Confirm password">
        <input id="signupFormBtn" type="submit" class="fadeIn fourth" value="Sign Up" data-disable-with="Sign up">
      </form>
    </div>
  </div>
  `

export const loginForm =
    `
  <div class="wrapper fadeInDown login-form">
    <div id="formContent" class="pt-5">
      <h1 class="p-4">User Login</h1>
      <span id="error"></span>
       <form id="login_form">
        <input type="text" id="email" class="fadeIn second" name="email" autocomplete="email"  placeholder="Email">
        <input type="password" id="password" class="fadeIn third" name="password" autocomplete="password"  placeholder="password">
        <input id="loginFormBtn" type="submit" class="fadeIn fourth" value="Log In" data-disable-with="Log in">
      </form>
    </div>
  </div>
  `

export const postForm =
    `
<div class="card post-card">
        <div class="card-header">
          <ul class="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
              <a class="nav-link active" id="posts-tab" data-bs-toggle="tab" data-bs-target="#posts" type="button"
                 role="tab" aria-controls="posts" aria-selected="true">Description</a>
            </li>
          </ul>
        </div>
        <div class="card-body">
          <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="posts" role="tabpanel" aria-labelledby="posts-tab">
              <div class="form-group">
                <textarea class="form-control" id="post_description" rows="3" placeholder="What are you thinking?"></textarea>
              </div>
            </div>
            <div class="tab-pane fade" id="images" role="tabpanel" aria-labelledby="images-tab">
              <div class="mb-3">
                <input class="form-control" type="file" id="formFileMultiple" multiple>
              </div>
            </div>
          </div>
          <div class="btn-toolbar justify-content-between">
            <div class="btn-group share ">
              <button id="sharePost" type="submit" class="btn btn-lg btn-success">Share</button>
            </div>
          </div>
        </div>
      </div>
  `

export const profileView = (currentUser) => {
    return `
  <div class="card">
        <div class="card-body">
          <div>
            <i class="loggedInText">Logged in as</i> &nbsp; 
            <b class="h3">${currentUser.name}</b>
          </div>
          <br>
          <div class="h5 text-muted">Email: ${currentUser.email}</div>
        </div>  
         <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <div class="h6 text-muted">Occupation</div>
            <div class="h5">${currentUser.occupation}</div>
          </li>
        </ul>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <div class="h6 text-muted">Gender</div>
            <div class="h5">${currentUser.gender}</div>
          </li>
        </ul>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <div class="h6 text-muted">Address</div>
            <div class="h5">${currentUser.address}</div>
          </li>
        </ul>
      </div>
  `
}

export const postView = (postArray) => {
    let postBody = ''
    let temp = ''
    for (const key in postArray) {
        const post = postArray[key].post;
        const name = postArray[key].name;
        const likes = postArray[key].likes;
        const comments = postArray[key].comments;
        temp = postBodyHtml(name, post, likes, comments)
        postBody = temp + postBody
    }
    return postBody
}

let commentView = (comments) => {

    let commentBody = ''
    let temp = ''
    for (const key in comments) {
        const comment = comments[key].comment;
        const name = comments[key].name;
        temp = commentBodyHtml(name, comment)
        commentBody = temp + commentBody
    }
    return commentBody
}

const commentEditUpdate =(comment,name) =>{
    let currentUser = JSON.parse(localStorage.getItem("currentUser")).user.name
    if(currentUser === name){
        return `
          <div class="commentUpdateDiv">
            <button id="${comment.id}commentEditBtn" data-comment_id="${comment.id}" class="btn btn-secondary btn-sm shadow-none" type="button">Edit</button>
            <button id="${comment.id}commentDeleteBtn" data-comment_id="${comment.id}" class="my-1 btn btn-danger btn-sm shadow-none" type="button">Delete</button>
        </div>
        `
    }
    else return ""
}

export const commentBodyHtml = (name, comment) => {
        return `<div id="${comment.id}commentCard" class="bg-light p-3">
                    <div class="d-flex flex-row align-items-center">
                        <div class="CommenterName">
                            ${convertName(name)}
                        </div>  
                        <div id="${comment.id}commentEditDiv" class="mt-3 px-3" style="width: 100%">
                             ${commentDescription(comment)}
                         </div>
                    </div>
                  ${commentEditUpdate(comment,name)}
               </div>
                `
}

export const convertName = (name) => {
    return name.match(/\b(\w)/g).join('').toUpperCase();
}

const postEditUpdate = (post, name) => {
    let currentUser = JSON.parse(localStorage.getItem("currentUser")).user.name
    if (currentUser === name) {
        return `
         <div class="px-1 cursor">
            <i id="${post.id}postEditBtn" class="h1 btn btn-secondary fa fa-edit" style="font-size: 1.2rem"></i>
            <i id="${post.id}postDeleteBtn" class="h1 btn btn-danger fa fa-trash" style="font-size: 1.2rem"></i>
       </div>`
    } else {
        return "";
    }
}

export const postBodyHtml = (name, post, likes, comments) => {
    let currentUser = JSON.parse(localStorage.getItem("currentUser")).user.name
    return `
    <div id="${post.id}postCard" >
    <div class="card">
    <div class="d-flex row">
      <div class="col-md-12">
        <div class="d-flex flex-column comment-section">
          <div class="bg-white px-3 pt-3">
            <div class="d-flex flex-row user-info m-2">
              <div class="PosterName">
                 ${convertName(name)}
               </div> 
              
                <div class="d-flex flex-row justify-content-center mx-4">
                  <div class="d-flex flex-column justify-content-center mx-4">
                        <span class="d-block font-weight-bold name"><h5>${name}</h5></span>
                        <span class="date text-black-50">Shared publicly - ${showDate(post.updated_at)} </span>
                    </div>
                  <div class="d-flex flex-row justify-content-end mx-4" style="width: 40vw;">
                    ${postEditUpdate(post, name)}
                </div>
              </div>
            </div>
           <div id="${post.id}postEditDiv" class="mt-3 px-4 mx-5">
             ${postDescription(post)}
           </div>
          </div>
          <div class="bg-white px-4 mx-5">
            <div class="d-flex flex-row fs-12 px-5 pt-4">
              <div class="like px-1 cursor">
                <span class="mx-1">
                    <i id="Post/${post.id}" data-id-value="${post.id}" data-name="like" style="font-size: 20px;" class="fa fa-thumbs-o-up btn green_btn btn-sm"> Like</i>
                </span>
               </div>
              <div class="like px-1 cursor">
              <span>
                <a id="comment_count${post.id}" class="btn btn-sm green_btn" data-toggle="collapse" data-target=".collapse">
                    <i style="font-size: 20px;" class="fa fa-commenting-o"></i> 
                    ${comments.length} Comments
                </a>
              </span>
              </div>
              
            </div>
            <div class="ms-5 ps-2 pt-2"><i id="${post.id}likesCount" >${likes.length} people likes this post</i></div>
            <div id="post_comment_div${post.id}" class="collapse">
              ${commentView(comments)}
            </div>
            <br>
          </div>
          <div class="bg-light p-3">
            <div class="d-flex flex-row align-items-center">
            <div class="CommenterName">
                ${convertName(currentUser)}
            </div> 
              <textarea class="form-control mx-2 shadow-none textarea" id="post${post.id}"></textarea>
            </div>
            <div class="mt-2 text-right float-end">
              <button id="${post.id}postComment" data-post_id="${post.id}" class="btn btn-success shadow-none" type="button">Post a Comment</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    <br>
</div>
  `
}

export const postDescription = (post) => {
    return `
    <p id="${post.id}" class="comment-text px-5">${post.description}</p>
    <div id="${post.id}editForm" class="alert alert-primary mx-5" hidden>
        <div class="form-group">
            <textarea class="form-control" id="${post.id}edit" rows="3"  spellcheck="false" > ${post.description}</textarea>
         </div>
         <div class="pt-2">
        <button type="submit" id="${post.id}update" class="btn btn-success">Update</button>
        </div>
    </div>
    `
}
export const commentDescription = (comment) => {
    return `
    <p id="${comment.id}comment" class="alert alert-success mx-2" style="width: 100%;">${comment.description} </p>
    <div id="${comment.id}commentEditForm" class="alert alert-primary" hidden>
         <input id="${comment.id}commentEdit" class="alert alert-light" style="width: 100%;" value="${comment.description}">
         <div class="pt-2">
            <button type="submit" id="${comment.id}commentUpdate" class="btn btn-success btn-sm">Update</button>
            <button type="submit" id="${comment.id}commentCancel" class="btn btn-danger btn-sm">Cancel</button>
        </div>
    </div>
    `
}
export const dashboard = (postArray) =>
    `
  <div class="container-fluid mt-2">
      <div class="row">
        <div class="col-md-3" id="leftProfileView">${profileView(JSON.parse(localStorage.getItem("currentUser")).user)}</div>
        <div class="col-md-9 ">
            <div id="rightPostView"></div>
            <div class="" id="postDiv">${postView(postArray)}</div>
        </div>    
      </div>
  </div>
  `

const showDate = (date) => {
    let data = new Date(date)
    let options = {
        year: "numeric",
        month: "long",
        weekday: "long",
        hour: "numeric",
        minute: "numeric",
    }
    return Intl.DateTimeFormat("en-US", options).format(data)
}
