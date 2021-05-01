import axios from "axios";

const BACKEND_API_HOST = "http://localhost:3000"

export class Like {
    constructor(auth_token) {
        this.headers = {
            'Authorization': auth_token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
    }

    async updateLike(url) {
        return axios
            .get(`${BACKEND_API_HOST}/likes/${url}`, {headers:this.headers})
            .then((response) => response)
            .catch((error) => {
                console.log(error)
            })
    }
}