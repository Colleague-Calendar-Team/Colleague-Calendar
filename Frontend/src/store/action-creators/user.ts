import { Dispatch } from 'redux';
import { UserState, UserAction, UserActionTypes } from '../../types/user';
import urls from '../../ajax/urls';
import ajax from '../../ajax/ajax';
import { DEBUG_REQUESTS } from '../../utils/debug';
import dayjs from 'dayjs';
import { RequestParamsState } from '../../types/ajax';

export const loadUser = () => {
  return (dispatch: Dispatch<UserAction>) => {
    try {
      ajax.get(urls.getUser()).then((response) => {
        if (DEBUG_REQUESTS) {
          console.log("RESPONSE user:");
          console.log(response.data);
        }

        dispatch({type: UserActionTypes.LOAD_USER, payload: response.data});
      });
    }
    catch {
      console.error('ERROR in Load User');
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

export const loginUser = (login: string, password: string) => {
  return (dispatch: Dispatch<UserAction>) => {
    try {
      if (DEBUG_REQUESTS) {
        console.log('REQUEST USER login:', login, ' password:', password);
      }

      const requestParams: RequestParamsState = {
        headers: new Headers({
          'Content-type': 'text/plain',
        })
      }

      const data = ajax.post(urls.login(login, password), requestParams);
      data?.then((response) => {
        if (DEBUG_REQUESTS) {
          console.log("RESPONSE user token:");
          console.log(response.data);
        }

        dispatch({type: UserActionTypes.AUTH_USER, payload: response.data});
      });
    }
    catch {
      console.error('ERROR in Login: ', login, ' password:', password);
    }
  }
}