import axios from "axios";

const BACKEND_API_HOST = "http://localhost:3000"

export class Comment {
    constructor(auth_token) {
        this.headers = {
            'Authorization': auth_token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
    }

    create(postId) {
        let comment = {
            description: document.getElementById(`post${postId}`).value,
            post_id: postId
        }
        return axios
            .post(`${BACKEND_API_HOST}/posts/${postId}/comments`,{comment: comment}, {headers:this.headers})
            .then((response) => response)
            .catch((error) => {
                console.log("error in comment create")
            })
    }

    update(commentId, description) {
        let comment = {
            description: description
        }
        return axios
            .patch(`${BACKEND_API_HOST}/comments/${commentId}`, {comment: comment}, {headers: this.headers})
            .then((response) => response)
            .catch((error) => {
                console.log("error in comment update")
            })
    }

    destroy(commentId) {
        return axios
            .delete(`${BACKEND_API_HOST}/comments/${commentId}`,{headers: this.headers})
            .then((response) => response)
            .catch((error) => {
                console.log("error in comment delete")
            })
    }
}