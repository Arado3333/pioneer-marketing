import { User } from "../models/user.model.js";
import { Campaign } from "../models/campaign.model.js";
import { vars } from "./vars.js";

export function makeEditable(event) {
  const element = event.target;

  if (element.tagName.toLowerCase() == 'a' || element.tagName.toLowerCase() == 'p' || element.tagName.toLowerCase() == 'h1' || element.tagName.toLowerCase() == 'h2' || element.tagName.toLowerCase() == 'h3' || element.tagName.toLowerCase() == 'span') {
    element.contentEditable = 'true';
  }

  else if (element.tagName.toLowerCase() == 'img' || element.tagName.toLowerCase() == 'video') {
    makeImageUpload(element);
  }

  element.addEventListener('input', saveUserEdits);
}

function makeImageUpload(element) {
  let changePic = prompt("Enter image address");
  
  if (changePic == "");
  else if (changePic == null);
  else {
    element.src = changePic;
  }
}

function saveUserEdits() {
  const updatedHTML = document.querySelector('#landing-page-container').innerHTML;
  localStorage.setItem('userEdits', JSON.stringify(updatedHTML));
}

export function checkEdits() {
  
  const prevEdits = JSON.parse(localStorage.getItem('userEdits'));

  if (prevEdits != null) {
    document.querySelector('#landing-page-container').innerHTML = prevEdits;
  }
}

//for *register* page
export function createUser(event) {
  event.preventDefault(); //do not refresh the page

  let user;
  let email = document.querySelector("#email").value;
  let fname = document.querySelector("#fname").value;
  let lname = document.querySelector("#lname").value;
  let password = document.querySelector("#password").value;
  let localStorageUserArr;

  if (email == "" || fname == "" || lname == "" || password == "") 
  {
    alert("Please fill all the fields");
    let inputs = document.querySelectorAll('input');

    for (let i = 0; i < inputs.length; i++) 
    {
      if (inputs[i].value == "")
        inputs[i].classList.add('missingField');
      else 
        inputs[i].classList.remove('missingField');
    }
  } 

  else if (!(email == "" || fname == "" || lname == "" || password == "")) 
  {
    //check for existing users in localStorage
    if (localStorage.getItem('users')) 
    {
      localStorageUserArr = JSON.parse(localStorage.getItem('users'));
      vars.registeredUsers = localStorageUserArr; //if data exists in localStorage => update the global array accordingly.
      vars.userCount = localStorageUserArr.length; //same for the array length => according to localStorage.
    }
    
    user = new User(vars.userCount, email, fname, lname, password); //יצירת משתמש חדש

    
    if (localStorageUserArr && localStorageUserArr.length > 0) 
    {
      for (let i = 0; i < localStorageUserArr.length; i++)
      {
        if ((localStorageUserArr[i].email != email && i == localStorageUserArr.length-1)) { //localStorageבדיקה האם האימייל שהוזן לא קיים עדיין ב
          vars.registeredUsers[vars.userCount++] = user;
          localStorage.setItem(`users`, JSON.stringify(vars.registeredUsers));
          document.querySelector('#reg-message').innerHTML = `User for ${user.fname} ${user.lname} has been created successfully! redirecting to Login page`;
          setTimeout(redirectToLoginPage, 2000);
          break;
        }
        else if (localStorageUserArr[i].email == email){ //localStorageהצג הודעת למשתמש אם כבר קיים על ה
          alert(`User: ${localStorageUserArr[i].email} is already registerd.`);
          break;
        }
      }
    }

    else if (!localStorageUserArr) //localStorageאם לא קיים מערך משתמשים ב
    {
      vars.registeredUsers[vars.userCount++] = user; //השמת משתמש חדש לתוך מערך המשתמשים
  
      localStorage.setItem(`users`, JSON.stringify(vars.registeredUsers)); //הכנסת *מערך* המשתמשים לתוך האחסון של הדפדפן
  
      console.log(`stringified user array: ${JSON.stringify(vars.registeredUsers)}`);
  
      document.querySelector('#reg-message').innerHTML = `User for ${user.fname} ${user.lname} has been created successfully!`; //משתמש נוצר בהצלחה
    }
  }
  
}

export function redirectToDashboard() {
  location.pathname = "/dashboard.html";
}

export function redirectToLoginPage() {
  location.pathname = "/login.html";
}

export function redirectToRegisterPage() {
  location.pathname = "/index.html";
}

export function openLandingPage() {
  location.pathname = `/landing_page.html`;
}

export function logOut() {
  let answer = confirm("Are you sure you want to exit?");

  if (answer == true && !sessionStorage.getItem('activeUser')) {
    redirectToLoginPage();
  }
  else if(answer == true && sessionStorage.getItem('activeUser')) {
    sessionStorage.removeItem('activeUser');
    redirectToLoginPage();
  }
}

//for *login* page
export function checkCredentialsAndLogin(event) {
  event.preventDefault();

  let loginEmail = document.querySelector('#email').value;
  let loginPassword = document.querySelector('#password').value;
  let userInputCreds = new User("", loginEmail, "", "", loginPassword);
  let usersFromDB = JSON.parse(localStorage.getItem('users'));
  let loginInputs;

  if (!loginEmail || !loginPassword) {
    alert("Please enter email and password"); 
    console.warn("Please enter valid email and password");
    loginInputs = document.querySelectorAll('input');
    loginInputs.forEach((input) => {
      input.classList.add('missingField');
    })
  }

  if (loginEmail && loginPassword) 
  {
    if (usersFromDB != undefined) {
      for (let i = 0; i < usersFromDB.length; i++)
      {   
        console.log(usersFromDB[i]);
        console.log(userInputCreds.email == usersFromDB[i].email);
  
        if (usersFromDB[i].email == userInputCreds.email)
        {
          if (usersFromDB[i].password == userInputCreds.password) {
            document.querySelector('#email').classList.remove('missingField');
            document.querySelector('#password').classList.remove('missingField');
            alert("Login successful. redirecting to dashboard");
            sessionStorage.setItem('activeUser', JSON.stringify(usersFromDB[i]));
            location.pathname = "/dashboard.html";
            break;
          }
          else {
            alert(`User: ${usersFromDB[i].email}: wrong password.`);
            document.querySelector('#email').classList.remove('missingField');
            break;
          }
        }
        else 
        {
          if (i == usersFromDB.length-1) 
          {
            alert(`User: ${userInputCreds.email}: is not registered yet.`);
            event.target.reset();
            break;
          }
        }
      }
    }
    else {
      alert(`User: ${userInputCreds.email}: is not registered yet.`);
      event.target.reset();
    }
   
  }
}

//for *dashboard* page
export function greetUser() {
  let activeUser = JSON.parse(sessionStorage.getItem('activeUser'));

  if (!activeUser) {
    redirectToLoginPage();
  }

  document.querySelector('#heading').innerHTML += ` ${activeUser.fname} ${activeUser.lname}!`;
}

export function deleteBanner(event) {
  const answer = confirm("Delete this banner?");
  console.log(event.target.id);

  if (answer == true) {
    let bannerArr = JSON.parse(localStorage.getItem(`banners_${vars.loggedUser.userId}`));
    bannerArr.splice(event.target.id, 1);
    localStorage.setItem(`banners_${vars.loggedUser.userId}`, JSON.stringify(bannerArr));
    document.querySelector(`#banner-del-stat`).innerHTML = `Banner deleted successfully. Refreshing the page`;
  }
  setTimeout(redirectToDashboard, 2000);
}

export function checkForBanners() {
  let html = ``;
  const userId = vars.loggedUser.userId;
  const bannersArr = JSON.parse(localStorage.getItem(`banners_${userId}`));
  const bannersPreviewElement = document.querySelector('#banners-wrapper');

  console.log(bannersArr);

  if (bannersArr) {
  
  for (let i = 0; i < bannersArr.length; i++)
  {
    html += 
    `<div class="banner-card" style="background-color: ${bannersArr[i].bgColor}; height: ${bannersArr[i].height}px; width: ${bannersArr[i].width}px; font-family: ${bannersArr[i].font}">
      <img width="100%" src="${bannersArr[i].bgPicture}">
      <h2>${bannersArr[i].heading}</h2>
      <h3>${bannersArr[i].subHeading}</h3>
      <strong>${bannersArr[i].ctaText}</strong>
    </div>`;
  }
  }
  console.log(html);
  bannersPreviewElement.innerHTML = html;
}

export function checkForCampaigns() {
  let html = ``;
  let loggedUser = JSON.parse(sessionStorage.getItem('activeUser'));
  let campaigns = JSON.parse(localStorage.getItem(`campaigns_${loggedUser.userId}`));
  vars.campCount = campaigns ? JSON.parse(localStorage.getItem(`campaigns_${loggedUser.userId}`)).length : 0;

  if (vars.campCount == 0 || !localStorage.getItem(`campaigns_${loggedUser.userId}`)) {
    html += `<h3>looks like it's empty here.. Start your new campaign!</h3>`;
  }
  else {
    html += `<h3>Your active campaigns</h3>`;

    let listElem = document.querySelector('#camp-list');
    // console.log("ol => " + listElem.innerHTML);

    let buttonElem = listElem.querySelector('.collapsible');

    let content = listElem.querySelector('.content');
    // console.log("content p inside ol => " + content.innerHTML);

    
    
    for (let i = 0; i < campaigns.length; i++) 
    {
      html += `<div class="coll-wrapper">`;
      //listElem השמה של ערכים בתוך האלמנטים של 
      buttonElem.innerHTML = `<span class="title">${campaigns[i].name}</span>`;
      let image = makeImage(campaigns[i].image);
      console.log(image);
      content.innerHTML = `<p style="line-height: 1.8;">
      Campaign Start Date: ${campaigns[i].startDate}<br>
      Campaign End Date: ${campaigns[i].endDate}<br>
      Title: ${campaigns[i].title}<br>
      Content: ${campaigns[i].textContent}<br><br>
      Image:
      </p>`;
      content.appendChild(image);

      content.innerHTML += `<div class="del-button"><button class='${campaigns[i].name}'>Delete Campaign</button></div>`;
      //listElem הוספה של 
      html += listElem.innerHTML;

      html += `</div>`;
    }
    
    
  }

  console.log(html); //הדפסה של הרשימה של הקמפיינים
  document.querySelector('#active-campaigns').innerHTML = html; //הוספה של התוצר לדף עצמו
    
}

export function toggleCamp() {
  let coll = document.querySelectorAll(".collapsible");
  let i;

  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
      this.classList.toggle("active");
      let content = this.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
      if (content.style.maxHeight){
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  }
}

export function showForm(event) {
  document.querySelector('#form-wrapper').style = `display: flex; justify-content: center; `;
  let button = event.target;
}

let imgUrl = ``;

export function saveData(event) {
  event.preventDefault();

  let userId = JSON.parse(sessionStorage.getItem('activeUser')).userId;
  let startDate = document.querySelector('#campaign-date-start').value;
  let endDate = document.querySelector('#campaign-date-end').value;
  let name = document.querySelector('#campaign-name').value;
  let title = document.querySelector('#title').value;
  let textContent = document.querySelector('#content').value;

  let campaign = new Campaign(vars.campCount, name, title, textContent, imgUrl, startDate, endDate); //משתנה מקומי לאובייקט הקמפיין
  let campArr = JSON.parse(localStorage.getItem(`campaigns_${userId}`)) || new Array(); //משתנה מקומי למערך הקמפיינים
  
  console.log(vars.campCount);

  if (campArr.length > 0)
  {
    vars.campCount = campArr.length;
  }

  campArr[vars.campCount] = campaign;
  vars.campCount++;

  vars.campaigns = campArr;
  console.log(campaign);
  console.log("userId: " + userId);

  localStorage.setItem(`campaigns_${userId}`, JSON.stringify(vars.campaigns));
  document.querySelector('#camp-upload-stat').innerHTML = "Campaign created successfully";
  setTimeout(() => {
    location.reload(true);
  }, 2000);
}

function makeImage(url) {
  let image = new Image(250);
  image.src = url;
  return image;
}

export function processImage(event) {
  
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

export function loadBannerEditor() 
{
  location.pathname =  "/banner_editor.html";
}

export function wantToDelete(event) 
{
  const eventClassName = event.target.classList[0];
  let delConfirm = confirm(`Delete campaign: ${eventClassName}`);
  let campaigns = JSON.parse(localStorage.getItem(`campaigns_${vars.loggedUser.userId}`));

  if (delConfirm == true) {
    for (let i = 0; i < campaigns.length; i++)
    {
      if (campaigns[i].name == eventClassName) {
        campaigns.splice(i, 1);
        localStorage.setItem(`campaigns_${vars.loggedUser.userId}`, JSON.stringify(campaigns));
      }
    }
    document.querySelector('#camp-delete-stat').innerHTML = `Campaign has been deleted successfully`;
    setTimeout(() => {
      location.reload(true);
    }, 2000);
  }
}


