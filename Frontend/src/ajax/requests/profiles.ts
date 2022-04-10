import { DEBUG_REQUESTS, DEBUG_REQUESTS_ERRORS } from "../../utils/debug";
import ajax from "../ajax";
import urls from "../urls";

export const getProfilesByUsername = (username: string) => {
  try {
    if (DEBUG_REQUESTS) {
      console.log('REQUEST get profiles by username: ', username);
    }

    return ajax.get(urls.getUsersProfiles(username));
  }
  catch {
    if (DEBUG_REQUESTS_ERRORS) {
      console.error('ERROR in get profiles by username:', username);
    }
  }
}