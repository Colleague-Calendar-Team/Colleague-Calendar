import { RequestHeadersState, RequestParamsState } from '../types/ajax';
import { DEBUG_REQUESTS } from '../utils/debug';
import urls from './urls';

export enum AjaxMethods {
  get = 'GET',
  post = 'POST',
  patch = 'PATCH',
  delete = 'DELETE',
}

const RequestParamsInit = {
  body: '',
  mode: 'cors' as RequestMode,
  credentials: "include" as RequestCredentials,
  headers: new Headers({
    'Content-Type': 'application/json',
  }) as RequestHeadersState,
}

async function ajaxCall(url: string = urls.url, method: AjaxMethods = AjaxMethods.get, requestParams: RequestParamsState = RequestParamsInit) {
  const fetchParams = {
    method: method,
    body: JSON.stringify(requestParams.body),
    mode: requestParams.mode,
    credentials: requestParams.credentials,
    headers: requestParams.headers,
  };

  if (DEBUG_REQUESTS) {
    console.log('AJAX request: \nurl:', {url}, '\nbody: ', fetchParams.body, '\nmethod: ', fetchParams.method, '\nheaders: ');
    fetchParams.headers?.forEach((value, key) => {
      console.log(key, ": ", value);
    });
  }

  const response = await fetch(url, fetchParams);
  if (requestParams.headers?.get('Content-Type') === 'application/json') {
    if (DEBUG_REQUESTS) {
      console.log("JSON");
    }
    return {
      data: await response.json(),
      status: await response.status,
    };
  } else {
    if (DEBUG_REQUESTS) {
      console.log("NOT JSON");
    }
    return {
      data: await response.text(),
      status: await response.status,
    };
  }
}

const ajax = {
  get: (url: string, requestParams: RequestParamsState = RequestParamsInit) => ajaxCall(url, AjaxMethods.get, requestParams),
  post: (url: string, requestParams: RequestParamsState = RequestParamsInit) => ajaxCall(url, AjaxMethods.post, requestParams),
  patch: (url: string, requestParams: RequestParamsState = RequestParamsInit) => ajaxCall(url, AjaxMethods.patch, requestParams),
  delete: (url: string, requestParams: RequestParamsState = RequestParamsInit) => ajaxCall(url, AjaxMethods.delete, requestParams),
};

export default ajax;
