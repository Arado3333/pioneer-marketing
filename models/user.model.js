export class User {
  userId;
  email;
  fname;
  lname;
  password;

  constructor(userId, email, fname, lname, password) {
    this.userId = userId;
    this.email = email;
    this.fname = fname;
    this.lname = lname;
    this.password = password;
  }
}
