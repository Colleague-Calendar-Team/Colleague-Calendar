import * as EventActionCreators from './event';
import * as EventsActionCreators from './events';
import * as UserActionCreators from './user';
import * as SelectElementsActionCreators from './selectElements';

const ActionCreators = {
  ...EventActionCreators,
  ...EventsActionCreators,
  ...UserActionCreators,
  ...SelectElementsActionCreators,
}

export default ActionCreators;