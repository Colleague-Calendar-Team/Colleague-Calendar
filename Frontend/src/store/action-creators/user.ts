import { Dispatch } from 'redux';
import { UserState, UserAction, UserActionTypes } from '../../types/user';
import urls from '../../ajax/urls';
import ajax from '../../ajax/ajax';
import { DEBUG_REQUESTS } from '../../utils/debug';
import dayjs from 'dayjs';
import { RequestHeadersState, RequestParamsState } from '../../types/ajax';
import { useTypedSelector } from '../../hooks/useTypedSelector';

export const getCurrentUserAccount = (token: string) => {
  return (dispatch: Dispatch<UserAction>) => {
    if (DEBUG_REQUESTS) {
      console.log("REQUEST get current user account: " + token);
    }
    try {
      const requestParams: RequestParamsState = {
        headers: new Headers ({
          'Authorization': 'Bearer ' + token,
        }) as RequestHeadersState,
      }
      ajax.get(urls.getCurrentUserAccount(), requestParams).then((response) => {
        if (DEBUG_REQUESTS) {
          console.log("RESPONSE user account:");
          console.log(response.data);
        }

        dispatch({type: UserActionTypes.LOAD_USER, payload: response.data});
      });
    }
    catch(err) {
      console.error('ERROR in get user account:', err);
    }
  }
}

export const saveAvatar = (avatarUrl: string) => {
  return (dispatch: Dispatch<UserAction>) => {
    try {
      if (DEBUG_REQUESTS) {
        console.log('REQUEST Saving avatar:', avatarUrl)
      }
      
      dispatch({type: UserActionTypes.SAVE_AVATAR, payload: avatarUrl});
    }
    catch {
      console.error('ERROR in Save avatar:', avatarUrl)
    }
  }
}