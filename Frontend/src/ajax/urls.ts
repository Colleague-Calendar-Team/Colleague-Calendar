class Urls {
  url:string = 'http://127.0.0.1:5000/';

  register() {
    return this.url + 'auth/register';
  }
  login(login: string , password: string) {
    return this.url + 'auth/login?login=' + login + '&password=' + password;
  }
  logout() {
    return this.url + 'auth/logout';
  }

  getCurrentUserAccount() {
    return this.url + 'user/account';
  }
  getCurrentUserAvatar() {
    return this.url + 'user/avatar';
  }
  getUsersProfiles(username:string) {
    return this.url + 'user/' + username + '/profiles';
  }
  getUserAvatar(userID: number) {
    return this.url + 'user/' + userID + '/avatar';
  }
  getUserWorkload(userID: number) {
    return this.url + 'user/' + userID + '/workload';
  }
  updateCurrentUserProfile() {
    return this.url + 'user/update/profile';
  }
  updateCurrentUserAvatar() {
    return this.url + 'user/update/avatar';
  }
  updateCurrentUserPassword() {
    return this.url + 'user/update/password';
  }

  addEvent() {
    return this.url + 'events/add';
  }
  updateEvent(eventID: number) {
    return this.url + 'events/' + eventID + '/update';
  }
  updateEventParticipiants(eventID: number) {
    return this.url + 'events/' + eventID + '/update/participiants';
  }
  updateEventNotifications(eventID: number) {
    return this.url + 'events/' + eventID + '/update/notifications';
  }
  getEventParticipiants(eventID: number) {
    return this.url + 'events/' + eventID + '/participiants';
  }
  deleteEvent(eventID: number) {
    return this.url + 'events/' + eventID + '/delete';
  }
  getWeeks() {
    return this.url + 'events/weeks';
  }
  getUser() {
    return this.url + 'user';
  }
}

const urls = new Urls();

export default urls; 
