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