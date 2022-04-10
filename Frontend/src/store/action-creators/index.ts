import * as EventActionCreators from './event';
import * as EventsActionCreators from './events';
import * as UserActionCreators from './user';
import * as SelectElementsActionCreators from './selectElements';
import * as AuthActionCreators from './auth';

const ActionCreators = {
  ...EventActionCreators,
  ...EventsActionCreators,
  ...UserActionCreators,
  ...SelectElementsActionCreators,
  ...AuthActionCreators,
}

export default ActionCreators;