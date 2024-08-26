import { createUser, checkCredentialsAndLogin, redirectToLoginPage, redirectToRegisterPage, greetUser, checkForCampaigns, showForm, saveData, processImage, toggleCamp, logOut, loadBannerEditor} from "./functions.js";
import { greetUserEditor, blockColorField, createBanner} from "./functions_banner_editor.js";


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
    toggleCamp();
    document.querySelector('#log-out').addEventListener('click', logOut);
    document.querySelector('#start-new-camp').addEventListener('click', showForm);
    document.querySelector('#new-camp').addEventListener('submit', saveData);
    document.querySelector('#pic-upload').addEventListener('change', processImage);
    document.querySelector('#banner-edit').addEventListener('click', loadBannerEditor);
}

if (location.pathname == '/banner_editor.html' || location.href.includes('/banner_editor')) {
    greetUserEditor();
    document.querySelector('#pic-upload').addEventListener('change', blockColorField);
    document.querySelector('#banner-create').addEventListener('submit', createBanner);
}