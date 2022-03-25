import * as EventActionCreators from './event';
import * as EventsActionCreators from './events';
import * as UserActionCreators from './user';

const ActionCreators = {
  ...EventActionCreators,
  ...EventsActionCreators,
  ...UserActionCreators,
}

export default ActionCreators;