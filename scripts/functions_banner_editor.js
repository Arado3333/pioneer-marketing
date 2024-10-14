import { Banner } from "../models/banner.model.js";
import { redirectToDashboard } from "./functions.js";
import { vars, useVars } from "./vars.js";

export function greetUserEditor() {
    const activeUser = JSON.parse(sessionStorage.getItem('activeUser'));
    document.querySelector('#editor-title').innerHTML += `${activeUser.fname} ${activeUser.lname}!`;
}

export function blockColorField() {
    let colorPicker = document.querySelector('#background-color');
    colorPicker.disabled = true;
}

let imgUrl = ``;

export function createBanner(event) {
    event.preventDefault();

    let banner; 
    const heading = document.querySelector('#banner-heading').value;
    const subHeading = document.querySelector('#banner-subheading').value;
    const ctaText = document.querySelector('#cta-btn-text').value;
    const color = document.querySelector('#background-color').value;
    const width = document.querySelector('#banner-width').value;
    const height = document.querySelector('#banner-height').value;
    const font = document.querySelector('#text-font').value;
    
    // console.log("heading: " + heading + " subheading: " + subHeading + " ctaText: " + ctaText + " color: " + color + " width: " + width + " height: " + height);

    let bannerArr = JSON.parse(localStorage.getItem(`banners_${vars.loggedUser.userId}`)) || [];

    banner = new Banner(heading, subHeading, ctaText, imgUrl, color, width, height, font);
    console.log(banner);

    bannerArr.push(banner);
    console.log(bannerArr);
    
    localStorage.setItem(`banners_${vars.loggedUser.userId}`, JSON.stringify(bannerArr));
    document.querySelector('#banner-creation-stat').innerHTML = `Your banner has been created! Redirecting to Dashboard`;
    
    setTimeout(() => {
        redirectToDashboard();
    }, 2000);
    
}

export function processBannerImage(event) {
  
    const fileElement = event.target;
    const fileReader = new FileReader();
  
    fileReader.readAsDataURL(fileElement.files[0]);
    
    fileReader.addEventListener('load', () => {
        imgUrl = fileReader.result;
        const resImg = new Image();
        resImg.src = imgUrl;
        let imgDiv = document.querySelector('#banner-preview');
        imgDiv.append(resImg);
    });
    
  }

  //להציג תצוגה מקדימה של הבאנר עם רקע ועליה הכיתוב שהמשתמש הקליד בזמן אמת
  export function processBannerBackground(event) {
    const color = event.target.value;
    document.getElementById('banner-preview').style.backgroundColor = color;
  }

  export function resizeBanner(event) {
    const value = event.target.value;
    if (event.target.name == "banner-width") 
    {
        document.getElementById('banner-preview').style.width = `${value}px`;
    }
    else if (event.target.name == "banner-height") 
    {
        document.getElementById('banner-preview').style.height = `${value}px`;
    }
  }

  export function addTextToBanner(event) {
    console.log(event.target.name);
    if (event.target.name == "heading") {
        document.querySelector('#bHeading').innerHTML = event.target.value;
    }
    else if (event.target.name == "subHeading") {
        document.querySelector('#bSubheading').innerHTML = event.target.value;
    }
    else if (event.target.name == "cta") {
        document.querySelector('#bCta').innerHTML = event.target.value;
    }
  }

  export function paintText(event) {
    if (event.target.name == "heading")
        document.querySelector('#bHeading').style.color = event.target.value;
    else if (event.target.name == "subHeading")
        document.querySelector('#bSubheading').style.color = event.target.value;
    else if (event.target.name == "cta")
        document.querySelector('#bCta').style.color = event.target.value;
  }


  export function changeFont(event) {
    const heading = document.querySelector('#bHeading');
    const subHeading = document.querySelector('#bSubheading');
    const ctaText = document.querySelector('#bCta');
    const fontClasses = ['alef', 'anta', 'open', 'roboto', 'poppins'];

    for (let i = 0; i < fontClasses.length; i++)
    {
        if (!heading.classList[0] && !subHeading.classList[0] && !ctaText.classList[0])
        {
            break;
        }
        heading.classList.remove(fontClasses[i]);
        subHeading.classList.remove(fontClasses[i]);
        ctaText.classList.remove(fontClasses[i]);
    }

    switch (event.target.value) 
    {
        case 'Alef':
            heading.classList.add('alef');
            subHeading.classList.add('alef');
            ctaText.classList.add('alef');
            break;

        case 'Anta':
            heading.classList.add('anta');
            subHeading.classList.add('anta');
            ctaText.classList.add('anta');
            break;
        
        case 'Open Sans':
            heading.classList.add('open');
            subHeading.classList.add('open');
            ctaText.classList.add('open');
            break;
        
        case 'Roboto':
            heading.classList.add('roboto');
            subHeading.classList.add('roboto');
            ctaText.classList.add('roboto');
            break;
        
        case 'Poppins':
            heading.classList.add('poppins');
            subHeading.classList.add('poppins');
            ctaText.classList.add('poppins');
            break;
    }

  }
  

  