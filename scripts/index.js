import { createUser, checkCredentialsAndLogin, redirectToLoginPage, redirectToRegisterPage, greetUser, checkForCampaigns, showForm, saveData, processImage} from "./functions.js";

if (location.pathname == '/' || location.href.includes('/index')) {
    document.querySelector("#reg-form").addEventListener("submit", createUser);
    document.querySelector("#login-page").addEventListener('click', redirectToLoginPage);
}


if (location.pathname == '/login.html' || location.href.includes('/login')) {
    document.querySelector('#login-form').addEventListener('submit', checkCredentialsAndLogin);
    document.querySelector('#register-page').addEventListener('click', redirectToRegisterPage);
}

else if (location.pathname == '/dashboard.html' || location.href.includes('/dashboard')) {
    greetUser();
    checkForCampaigns();
    document.querySelector('#start-new-camp').addEventListener('click', showForm);
    document.querySelector('#new-camp').addEventListener('submit', saveData);
    document.querySelector('#pic-upload').addEventListener('change', processImage);

}