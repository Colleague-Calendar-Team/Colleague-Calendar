import dayjs from "dayjs";
import { RequestHeadersState, RequestParamsState } from "../../types/ajax";
import { DEBUG_REQUESTS } from "../../utils/debug";
import ajax from "../ajax";
import urls from "../urls";

export const getUserWorkload = (date: dayjs.Dayjs, userID: number, token: string) => {
  try {
    if (DEBUG_REQUESTS) {
      console.log('REQUEST: ', urls.getUserWorkload(userID));
    }

    const requestParams: RequestParamsState = {
      headers: new Headers ({
        'Authorization': 'Bearer ' + token,
        'x-date' : date.format('YYYY-MM-DD'),
      }) as RequestHeadersState,
    }

    return ajax.get(urls.getUserWorkload(userID), requestParams);
  }
  catch {
    console.error('ERROR in Get User Workload: user:', userID, " date: ", date);
  }
}