import { User } from "./user.model.js";
import { vars } from "./vars.js";

export function createUser(event) {
  event.preventDefault(); //do not refresh the page

  let email = document.querySelector("#email").value;
  let fname = document.querySelector("#fname").value;
  let lname = document.querySelector("#lname").value;
  let password = document.querySelector("#password").value;

  let user = new User(email, fname, lname, password);

  vars.registeredUsers[vars.userCount++] = user;
  console.log(vars.registeredUsers);

  vars.registeredUsers.forEach((user) => {
    if (localStorage.getItem(`user${vars.userCount}`) != user)
      localStorage.setItem(`user${vars.userCount}`, JSON.stringify(user));
  });
}


export function checkCredentialsAndLogin() {
    
}