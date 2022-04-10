import { Dispatch } from 'redux';
import { AuthAction, AuthActionTypes} from '../../types/auth/auth';
import { RegistrationInfoState } from '../../types/auth/registration';
import urls from '../../ajax/urls';
import ajax from '../../ajax/ajax';
import { DEBUG_REQUESTS } from '../../utils/debug';
import { RequestParamsState } from '../../types/ajax';

export const register = (registerData: RegistrationInfoState) => {
  return (dispatch: Dispatch<AuthAction>) => {
    if (DEBUG_REQUESTS) {
      console.log("REQUEST registration:");
      console.log(registerData);
    }

    dispatch({type: AuthActionTypes.REGISTER_END});

    const requestParams: RequestParamsState = {
      body: Object(registerData),
    }
    const res = ajax.post(urls.register(), requestParams);
    res.then((response) => {
      if (DEBUG_REQUESTS) {
        console.log("RESPONSE registration:");
        console.log(response.data);
        console.log(response.status);
      }

      if (response.status === 200) {
        dispatch({type: AuthActionTypes.REGISTER_SUCCESS});
      } else {
        throw response.data;
      }
    }).catch((e) => {
      console.error('ERROR in Registration:', e);
      dispatch({type: AuthActionTypes.REGISTER_ERROR, payload: `Ошибка регистрации: ${e}`});
    });
  }
}

export const registerEnd = () => {
  return (dispatch: Dispatch<AuthAction>) => {
    dispatch({type: AuthActionTypes.REGISTER_END});
  }
}

export const loginUser = (login: string, password: string) => {
  return (dispatch: Dispatch<AuthAction>) => {
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

      if (response.status === 200) {
        dispatch({type: AuthActionTypes.LOGIN_SUCCESS, payload: response.data});
      } else {
        throw response.data;
      }
    }).catch((e) => {
      console.error('ERROR in Login: ', login, ' password:', password);
      dispatch({type: AuthActionTypes.LOGIN_ERROR, payload: `Ошибка входа: ${e}`});
    });
  }
}