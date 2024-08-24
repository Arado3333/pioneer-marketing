export const vars = {
  registeredUsers: new Array(),
  loggedUser: JSON.parse(sessionStorage.getItem('activeUser')),
  campaigns: JSON.parse(localStorage.getItem(`campaigns`)) || [],
  userCount: 0,
  campCount: 0
};
