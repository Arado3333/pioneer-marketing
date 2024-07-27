export class User 
{
    email;
    fname;
    lname;
    password;

    constructor(email, fname, lname, password) {
        this.email = email;
        this.fname = fname;
        this.lname = lname;
        this.password = password;
    } 
}