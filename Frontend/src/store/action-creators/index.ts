import * as EventActionCreators from './event';
import * as EventsActionCreators from './events';
import * as UserActionCreators from './user';
import * as SelectElementsActionCreators from './selectElements';
import * as RegistrationActionCreators from './registration';

const ActionCreators = {
  ...EventActionCreators,
  ...EventsActionCreators,
  ...UserActionCreators,
  ...SelectElementsActionCreators,
  ...RegistrationActionCreators,
}

export default ActionCreators;