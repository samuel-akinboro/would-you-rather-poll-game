import { SET_AUTH_USER } from '../actions/authUser';

const defaultState = null;

const authUser = (state = defaultState, action) => {
  if (action.type === SET_AUTH_USER) {
    return action.id;
  }
  return state;
}

export default authUser
