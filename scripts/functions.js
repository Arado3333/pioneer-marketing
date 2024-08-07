import { User } from "../models/user.model.js";
import { Campaign } from "../models/campaign.model.js";
import { vars } from "./vars.js";

//for *register* page
export function createUser(event) {
  event.preventDefault(); //do not refresh the page

  let user;
  let email = document.querySelector("#email").value;
  let fname = document.querySelector("#fname").value;
  let lname = document.querySelector("#lname").value;
  let password = document.querySelector("#password").value;
  let localStorageUserArr;

  if (email == "" || fname == "" || lname == "" || password == "") {
    alert("Please fill all the fields");
    let inputs = document.querySelectorAll('input');
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].value == "")
        inputs[i].classList.add('missingField');
      else 
        inputs[i].classList.remove('missingField');
    }
  } 
  else if (!(email == "" || fname == "" || lname == "" || password == "")) {
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
          document.querySelector('#reg-message').innerHTML = `User for ${user.fname} ${user.lname} has been created successfully!`;
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

export function redirectToLoginPage() {
  location.pathname = "/login.html";
}

export function redirectToRegisterPage() {
  location.pathname = "/index.html";
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

  document.querySelector('#heading').innerHTML += ` ${activeUser.fname} ${activeUser.lname}!`;
}

export function checkForCampaigns() {
  let html = ``;
  if (vars.activeCampaigns == 0) {
    html += `<h3>looks like it's empty here.. Start your new campaign!</h3>`;
  }
  else {
    html += `<h3>Your active campaigns</h3>`
  }

  document.querySelector('#active-campaigns').innerHTML = html;
    
}

export function showForm(event) {
  document.querySelector('#form-wrapper').style = "display: flex";
  let button = event.target;
}

export function saveData(event) {
  event.preventDefault();

  let name = document.querySelector('#campaign-name').value;
  let title = document.querySelector('#title').value;
  let textContent = document.querySelector('#content').value;

  let imgUrl = String(processImage(event));

  let campaign = new Campaign(vars.activeCampaigns, name, title, textContent, imgUrl);
  console.log(campaign);
  vars.activeCampaigns++;
  
}

export function processImage(event) {
  
  const fileElement = document.querySelector('#pic-upload');
  const fileReader = new FileReader();
  let url;

  fileReader.readAsDataURL(fileElement.files[0]);
  
  fileReader.addEventListener('load', () => {
    url = fileReader.result;
    const resImg = new Image(250, 250);
    resImg.src = url;
    let imgDiv = document.querySelector('#imgPreview');
    imgDiv.appendChild(resImg);

    if (event.type != "change") {
      console.log("not change event!");
      console.log(url);
    }
  });
  
}
