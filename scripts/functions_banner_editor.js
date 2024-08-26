

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

    let heading = document.querySelector('#banner-heading').value;
    let subHeading = document.querySelector('#banner-subheading').value;
    let ctaText = document.querySelector('#cta-btn-text').value;
    let color = document.querySelector('#background-color').value;
    console.log("heading: " + heading + " subheading: " + subHeading + " ctaText: " + ctaText + " color: " + color);

    let banner = new Banner(heading, subHeading, ctaText, color, imgUrl);
}
