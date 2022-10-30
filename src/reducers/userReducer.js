import {
  AUTH_ERROR,
  AUTH_LOADING,
  LOAD_GUEST_USER,
  LOAD_USER,
  SET_USER_CHAIN,
} from "../actions/types";

const initalState = {
  jwtToken: null,
  account: null,
  id: null,
  authenticated: false,
  authLoading: false, // authentication process is in progress
  authError: null, // error messgae while authenticating user
  chainId: null, // default chain id when user visit the app
};

export default function (state = initalState, action) {
  // todo design and write action types and state updates
  switch (action.type) {
    case LOAD_USER:
      return {
        ...state,
        jwtToken: action?.payload?.jwtToken,
        account: action?.payload?.account,
        id: action?.payload?.id,
        authenticated: !action?.payload?.authenticated ? false : true,
        authLoading: false,
        authError: null,
      };
    case LOAD_GUEST_USER:
      return {
        ...state,
        jwtToken: action?.payload?.jwtToken,
        account: action?.payload?.account,
        id: action?.payload?.id,
        authenticated: !action?.payload?.authenticated ? false : true,
        authLoading: false,
      };
    case AUTH_LOADING:
      return {
        ...state,
        authLoading: true,
      };
    case AUTH_ERROR:
      return {
        ...state,
        authError: action.payload,
        authLoading: false,
      };
    case SET_USER_CHAIN:
      return {
        ...state,
        chainId: action.payload,
      };

    default:
      return state;
  }
}
