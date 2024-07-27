import { User } from "./user.model.js";

export function createUser(event) {
    event.preventDefault(); //do not refresh the page
    
    let userCount = 0;
    let email = document.querySelector('#email').value;
    let fname = document.querySelector('#fname').value;
    let lname = document.querySelector('#lname').value;
    let password = document.querySelector('#password').value;

    let user = new User(email, fname, lname, password);
    localStorage.setItem(`user${++userCount}`, JSON.stringify(user));
}