import { createUser, checkCredentialsAndLogin, redirectToLoginPage, redirectToRegisterPage, greetUser, checkForCampaigns, showForm, saveData, processImage, toggleCamp, logOut, loadBannerEditor, redirectToDashboard, wantToDelete, loadLandingEditor, checkForBanners, openLandingPage, logEvent, checkEdits, deleteBanner} from "./functions.js";
import { greetUserEditor, blockColorField, createBanner, processBannerImage, processBannerBackground, addTextToBanner, paintText, resizeBanner, changeFont} from "./functions_banner_editor.js";


if (location.pathname == '/index.html' || location.href.includes('/index')) {
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
    checkForBanners();
    toggleCamp();
    
    document.querySelectorAll('.banner-card').forEach((card, bannerCounter = 0) => {
        card.id = bannerCounter++;
        card.addEventListener('dblclick', deleteBanner);
    });
    document.querySelector('#landing-page').addEventListener('click', openLandingPage);
    document.querySelector('#log-out').addEventListener('click', logOut);
    document.querySelector('#start-new-camp').addEventListener('click', showForm);
    document.querySelector('#new-camp').addEventListener('submit', saveData);
    document.querySelector('#pic-upload').addEventListener('change', processImage);
    document.querySelector('#banner-edit').addEventListener('click', loadBannerEditor);
    // document.querySelector('#landing-edit').addEventListener('click', loadLandingEditor);
    const delButtons = document.querySelectorAll('.del-button');
    delButtons.forEach((button) => {    
        button.addEventListener('click', wantToDelete);
    });
}

if (location.pathname == '/banner_editor.html' || location.href.includes('/banner_editor')) {
    greetUserEditor();

    document.querySelector('#landing-page').addEventListener('click', openLandingPage);
    document.querySelector('#back-dashboard').addEventListener('click', redirectToDashboard);
    document.querySelector('#pic-upload').addEventListener('change', () => {
        processBannerImage(event);
    });

    document.querySelectorAll('.text').forEach((text) => {
        text.addEventListener('input', addTextToBanner);
    })
    document.querySelectorAll('div>input+input').forEach((text) => {
        text.addEventListener('input', paintText);
    });
    document.querySelector('#banner-width').addEventListener('input', resizeBanner);
    document.querySelector('#banner-height').addEventListener('input', resizeBanner);
    document.querySelector('#text-font').addEventListener('input', changeFont);

    document.querySelector('#background-color').addEventListener('input', processBannerBackground);
    document.querySelector('#banner-create').addEventListener('submit', createBanner);
    document.querySelector('#log-out').addEventListener('click', logOut);

}

if (location.pathname == '/landing_editor.html' || location.href.includes('/landing_editor')) {
    greetUser();

    document.querySelector('#back-dashboard').addEventListener('click', redirectToDashboard);
    document.querySelector('#banner-edit').addEventListener('click', loadBannerEditor);
    document.querySelector('#landing-page').addEventListener('click', openLandingPage);
    document.querySelector('#log-out').addEventListener('click', logOut);
}

if (location.pathname == '/landing_page.html' || location.href.includes('/landing_page')) {
    checkEdits();
    document.addEventListener('dblclick', logEvent);

    document.querySelector('#back').addEventListener('click', redirectToDashboard);

    const hamMenu = document.querySelector(".ham-menu");

    const offScreenMenu = document.querySelector(".off-screen-menu");

    hamMenu.addEventListener("click", () => {
    hamMenu.classList.toggle("active");
    offScreenMenu.classList.toggle("active");

    if (offScreenMenu.classList[1] == 'active')
    {
        hamMenu.addEventListener('click', () => {
            offScreenMenu.classList.toggle("inactive");
        });
    }

    });


    
}