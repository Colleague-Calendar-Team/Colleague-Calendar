import { DEBUG_REQUESTS, DEBUG_REQUESTS_ERRORS } from "../../utils/debug";
import ajax from "../ajax";
import urls from "../urls";

export const getToken = () => {
  try {
    if (DEBUG_REQUESTS) {
      console.log('REQUEST get token');
    }

    return ajax.get(urls.getToken());
  }
  catch {
    if (DEBUG_REQUESTS_ERRORS) {
      console.error('ERROR in get token');
    }
  }
}