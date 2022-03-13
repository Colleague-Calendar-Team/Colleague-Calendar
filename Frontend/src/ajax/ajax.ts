import urls from './urls';

export enum AjaxMethods {
  get = 'GET',
  post = 'POST',
}

async function ajaxCall(url: string = urls.url, method: AjaxMethods = AjaxMethods.get, requestParams: RequestInit = {}) {
  const fetchParams: RequestInit = {
    method: method,
    body: JSON.stringify(requestParams.body),
    mode: requestParams.mode || 'cors',
    credentials: requestParams.credentials || 'include',
    headers: requestParams.headers || {
      'Content-Type': 'application/json',
    },
  };

  console.log('ajax request: \nurl:', {url}, '\nparams: ' + fetchParams, '\nbody: ', fetchParams.body);

  const response = await fetch(url, fetchParams);
  return await response.json();
}

const ajax = {
  get: (url: string, requestParams: RequestInit = {}) => ajaxCall(url, AjaxMethods.get, requestParams),
  post: (url: string, requestParams: RequestInit = {}) => ajaxCall(url, AjaxMethods.post, requestParams),
};

export default ajax;
