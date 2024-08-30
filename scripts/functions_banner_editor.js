import { Banner } from "../models/banner.model.js";

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
    let heading = document.querySelector('#banner-heading').value;
    let subHeading = document.querySelector('#banner-subheading').value;
    let ctaText = document.querySelector('#cta-btn-text').value;
    let color = document.querySelector('#background-color').value;
    console.log("heading: " + heading + " subheading: " + subHeading + " ctaText: " + ctaText + " color: " + color);

    banner = new Banner(heading, subHeading, ctaText, imgUrl, color);
    console.log(banner);
}

export function processBannerImage(event) {
  
    const fileElement = event.target;
    const fileReader = new FileReader();
  
    fileReader.readAsDataURL(fileElement.files[0]);
    
    fileReader.addEventListener('load', () => {
        imgUrl = fileReader.result;
        const resImg = new Image(250, 250);
        resImg.src = imgUrl;
        let imgDiv = document.querySelector('#imgPreview');
        imgDiv.appendChild(resImg);
    });
    
  }

  //להציג תצוגה מקדימה של הבאנר עם התמונת רקע ועליה הכיתוב שהמשתמש הקליד בזמן אמת