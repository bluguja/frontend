import axios from "axios";

const BACKEND_API_HOST = "http://localhost:3000"

export class Post {
    constructor(auth_token) {
        this.headers = {
            'Authorization': auth_token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
    }

    index() {
        return axios
            .get(`${BACKEND_API_HOST}/posts`, {headers: this.headers})
            .then((response) => response)
            .catch((error) => {
                console.log(error)
            })
    }

    create() {
        let post = {
            description: document.getElementById("post_description").value
        }
        return axios
            .post(`${BACKEND_API_HOST}/posts`, {post: post}, {headers: this.headers})
            .then((response) => response)
            .catch((error) => {
                console.log("error in create post")
            })
    }

    update(postId, description) {
        let post = {
            description: description
        }
        return axios
            .patch(`${BACKEND_API_HOST}/posts/${postId}`, {post: post}, {headers: this.headers})
            .then((response) => response)
            .catch((error) => {
                console.log("error in post update")
            })
    }

    destroy(postId) {
        return axios
            .delete(`${BACKEND_API_HOST}/posts/${postId}`,{headers: this.headers})
            .then((response) => response)
            .catch((error) => {
                console.log("error in post delete")
            })
    }
}
