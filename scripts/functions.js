import { User } from "./user.model.js";
import { vars } from "./vars.js";

export function createUser(event) {
  event.preventDefault(); //do not refresh the page

  let user;
  let email = document.querySelector("#email").value;
  let fname = document.querySelector("#fname").value;
  let lname = document.querySelector("#lname").value;
  let password = document.querySelector("#password").value;

  if (email == "" || fname == "" || lname == "" || password == "") {
    alert("Please fill all the fields");
  } 
  else if (!(email == "" || fname == "" || lname == "" || password == "")) {
    user = new User(email, fname, lname, password);
    vars.registeredUsers[vars.userCount++] = user;
  }

  vars.registeredUsers.forEach((user) => {
    if (localStorage.getItem(user.email) != user.email)
      localStorage.setItem(user.email, JSON.stringify(user));
  });
}

export function redirectToLoginPage() {
  location.pathname = "/login.html";
}

export function redirectToRegisterPage() {
  location.pathname = "/index.html";
}

export function checkCredentialsAndLogin(event) {
  event.preventDefault();

  let loginEmail = document.querySelector('#email').value;
  let loginPassword = document.querySelector('#password').value;
  let userInputCreds = new User(loginEmail, "", "", loginPassword);
  let userFromDB = JSON.parse(localStorage.getItem(userInputCreds.email));

  if (!loginEmail || !loginPassword) {
    alert("Please enter email and password");
    console.warn("Please enter valid email and password");
  }

  if (loginEmail && loginPassword) 
  {
    if (userInputCreds.email == userFromDB.email) {
      if (userInputCreds.password == userFromDB.password) {
        alert("Login successful. redirecting to dashboard");
        loadDashboard(userFromDB);
      }
      else {
        alert(`User: ${userFromDB.email}: wrong password.`);
      }
    }
    else 
    {
      alert(`User: ${userInputCreds.email}: is not registered yet.`);
    }
  }

}

function loadDashboard(user) {
  location.pathname = "/dashboard.html";
  greetUser(user);
}

function greetUser(user) {
  
}
