class Urls {
  url:string = 'http://127.0.0.1:5000/';

  eventAdd() {
    return this.url + 'event-processing/event/add';
  }
  getUser() {
    return this.url + 'user';
  }
}

const urls = new Urls();

export default urls; 
