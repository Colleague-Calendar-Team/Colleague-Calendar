import { Dispatch } from 'redux';
import { RegistrationAction, RegistrationActionTypes, RegistrationInfoState } from '../../types/auth/registration';
import urls from '../../ajax/urls';
import ajax from '../../ajax/ajax';
import { DEBUG_REQUESTS } from '../../utils/debug';
import { RequestParamsState } from '../../types/ajax';

export const register = (registerData: RegistrationInfoState) => {
  return (dispatch: Dispatch<RegistrationAction>) => {
    if (DEBUG_REQUESTS) {
      console.log("REQUEST registration:");
      console.log(registerData);
    }

    dispatch({type: RegistrationActionTypes.REGISTER_END});

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
        dispatch({type: RegistrationActionTypes.REGISTER_SUCCESS});
      } else {
        throw response.data;
      }
    }).catch((e) => {
      console.error('ERROR in Registration:', e);
      dispatch({type: RegistrationActionTypes.REGISTER_ERROR, payload: `Ошибка регистрации: ${e}`});
    });
  }
}

export const registerEnd = () => {
  return (dispatch: Dispatch<RegistrationAction>) => {
    dispatch({type: RegistrationActionTypes.REGISTER_END});
  }
}