import { Dispatch } from 'redux';
import { UserState, UserAction, UserActionTypes, UserInfoState, PasswordInfoState } from '../../types/user';
import urls from '../../ajax/urls';
import ajax from '../../ajax/ajax';
import { DEBUG_REQUESTS, DEBUG_REQUESTS_ERRORS } from '../../utils/debug';
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
      if (DEBUG_REQUESTS_ERRORS) {
        console.error('ERROR in get user account:', err);
      }
    }
  }
}

export const saveAvatar = (avatarUrl: string) => {
  return (dispatch: Dispatch<UserAction>) => {
    try {
      if (DEBUG_REQUESTS) {
        console.log('REQUEST Saving avatar:', avatarUrl)
      }
      
      dispatch({type: UserActionTypes.UPDATE_AVATAR, payload: avatarUrl});
    }
    catch {
      if (DEBUG_REQUESTS_ERRORS) {
        console.error('ERROR in Save avatar:', avatarUrl);
      }
    }
  }
}

export const updateUserProfile = (token: string, userInfo: UserInfoState) => {
  return (dispatch: Dispatch<UserAction>) => {
    if (DEBUG_REQUESTS) {
      console.log('REQUEST update user profile:');
      console.log(userInfo);
    }

    const requestParams: RequestParamsState = {
      headers: new Headers({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      }) as RequestHeadersState,
    }
    const data = ajax.patch(urls.updateCurrentUserProfile(), requestParams);
    data?.then((response) => {
      if (DEBUG_REQUESTS) {
        console.log("RESPONSE update user profile: ");
        console.log(response.data);
      }

      if (response.status === 200) {
        dispatch({type: UserActionTypes.UPDATE_PROFILE, payload: userInfo});
      } else {
        throw response.data;
      }
    }).catch((e) => {
      if (DEBUG_REQUESTS_ERRORS) {
        console.error('ERROR in update user profile: ', e);
      }
    });
  }
}

export const updateUserPassword = (token: string, passwordInfo: PasswordInfoState) => {
  return (dispatch: Dispatch<UserAction>) => {
    if (DEBUG_REQUESTS) {
      console.log('REQUEST update user profile:');
      console.log(passwordInfo);
    }

    const requestParams: RequestParamsState = {
      headers: new Headers({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      }) as RequestHeadersState,
    }
    const data = ajax.patch(urls.updateCurrentUserPassword(), requestParams);
    data?.then((response) => {
      if (DEBUG_REQUESTS) {
        console.log("RESPONSE update user password: ");
        console.log(response.data);
      }

      if (response.status === 200) {
        dispatch({type: UserActionTypes.UPDATE_PASSWORD, payload: passwordInfo});
      } else {
        throw response.data;
      }
    }).catch((e) => {
      if (DEBUG_REQUESTS_ERRORS) {
        console.error('ERROR in update user password: ', e);
      }
    });
  }
}