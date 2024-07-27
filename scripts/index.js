import { createUser, checkCredentialsAndLogin } from "./functions.js";

if (location.href.includes('/') || location.pathname == '/') {
    document.querySelector("#reg-form").addEventListener("submit", createUser);
}


if (location.href.includes('/login') || location.pathname == '/login') {
    document.querySelector('#login').addEventListener('submit', checkCredentialsAndLogin);
    
}