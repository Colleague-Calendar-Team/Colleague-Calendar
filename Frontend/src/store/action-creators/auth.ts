import { Dispatch } from 'redux';
import { AuthAction, AuthActionTypes} from '../../types/auth/auth';
import { RegistrationInfoState } from '../../types/auth/registration';
import urls from '../../ajax/urls';
import ajax from '../../ajax/ajax';
import { DEBUG_REQUESTS, DEBUG_REQUESTS_ERRORS } from '../../utils/debug';
import { RequestHeadersState, RequestParamsState } from '../../types/ajax';

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
      if (DEBUG_REQUESTS_ERRORS) {
        console.error('ERROR in Registration:', e);
      }
      
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
      if (DEBUG_REQUESTS_ERRORS) {
        console.error('ERROR in Login: ', login, ' password:', password);
      }
      
      dispatch({type: AuthActionTypes.AUTH_ERROR, payload: `Ошибка входа: ${e}`});
    });
  }
}

export const logout = (token: string) => {
  return (dispatch: Dispatch<AuthAction>) => {
    if (DEBUG_REQUESTS) {
      console.log('REQUEST LOGOUT');
    }

    const requestParams: RequestParamsState = {
      headers: new Headers ({
        'Authorization': 'Bearer ' + token,
        'Content-type': 'text/plain',
      }) as RequestHeadersState,
    }
    const data = ajax.post(urls.logout(), requestParams);
    data?.then((response) => {
      if (DEBUG_REQUESTS) {
        console.log("RESPONSE logout:");
        console.log(response.data);
      }

      if (response.status === 200) {
        dispatch({type: AuthActionTypes.LOGOUT_SUCCESS});
      } else {
        throw response.data;
      }
    }).catch((e) => {
      if (DEBUG_REQUESTS_ERRORS) {
        console.error('ERROR in Logout: ', token);
      }
      
      dispatch({type: AuthActionTypes.AUTH_ERROR, payload: `Ошибка входа: ${e}`});
    });
  }
}

export const getToken = () => {
  return (dispatch: Dispatch<AuthAction>) => {
    if (DEBUG_REQUESTS) {
      console.log('REQUEST get token');
    }

    const data = ajax.get(urls.getToken());
    data?.then((response) => {
      if (DEBUG_REQUESTS) {
        console.log("RESPONSE token:");
        console.log(response.data);
      }

      if (response.status === 200) {
        dispatch({type: AuthActionTypes.LOGIN_SUCCESS, payload: response.data});
      } else {
        throw response.data;
      }
    }).catch((e) => {
      if (DEBUG_REQUESTS_ERRORS) {
        console.error('ERROR in get token:', e);
      }
    });
  }
}