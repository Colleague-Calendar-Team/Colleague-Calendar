class Urls {
  url:string = 'http://127.0.0.1:5000/';

  eventAdd() {
    return this.url + 'event-processing/event/add';
  }
}

const urls = new Urls();

export default urls; 
