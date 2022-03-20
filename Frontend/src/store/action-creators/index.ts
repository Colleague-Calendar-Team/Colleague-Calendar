import * as EventActionCreators from './event';
import * as UserActionCreators from './user';

const ActionCreators = {
  ...EventActionCreators,
  ...UserActionCreators,
}

export default ActionCreators;