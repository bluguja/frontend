import axios from "axios";

const BACKEND_API_HOST = "http://localhost:3000"

export class Authentication {

  signup() {
    let user = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      gender: document.getElementById("gender").value,
      occupation: document.getElementById("occupation").value,
      address: document.getElementById("address").value
    }
    return axios
      .post(`${BACKEND_API_HOST}/users`, {user: user})
      .then((response) => response)
      .catch((error) => {
        document.getElementById("error").innerText = "Email has already been taken!"
      })
  }

  login() {
    let user = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value
    }
    return axios
      .post(`${BACKEND_API_HOST}/authenticate`, user)
      .then((response) => response)
      .catch((error) => {
        document.getElementById("error").innerText = "Email or password is invalid!"
      })
  }

  logout(auth_token) {
    let headers = {
      'Authorization': auth_token,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    return axios
      .delete(`${BACKEND_API_HOST}/sign_out`, {headers})
      .then((response) => response)
      .catch((error) => {
        console.log(error)
      })
  }
}