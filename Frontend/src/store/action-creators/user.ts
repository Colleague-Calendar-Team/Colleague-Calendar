import { Dispatch } from 'redux';
import { UserState, UserAction, UserActionTypes } from '../../types/user';
import urls from '../../ajax/urls';
import ajax from '../../ajax/ajax';

export const loadUser = () => {
  return (dispatch: Dispatch<UserAction>) => {
    try {
      ajax.get(urls.getUser()).then((response) => {
        console.log("USER response:");
        console.log(response);
        dispatch({type: UserActionTypes.LOAD_USER, payload: response});
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
      console.log('Saving avatar:', avatarUrl)
      dispatch({type: UserActionTypes.SAVE_AVATAR, payload: avatarUrl});
    }
    catch {
      console.error('ERROR in Save avatar:', avatarUrl)
    }
  }
}

export const authUser = (auth: boolean) => {
  return (dispatch: Dispatch<UserAction>) => {
      dispatch({type: UserActionTypes.AUTH_USER, payload: auth});
  }
}