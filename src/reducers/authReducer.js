import { SET_LOADING, LOGIN_USER, LOGOUT, CHANGE_PASS } from "./types";

const initialState = {
  loading: false,
  user: null,
  isAuthenticated: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // case SET_ALERT:
    //   return {
    //     ...state,
    //     loading: false,
    //     alert: action.value,
    //   };
    // case CLEAR_ALERT:
    //   return {
    //     ...state,
    //     alert: null,
    //   };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };

    case LOGIN_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.value,
        loading: false,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
      };
    case CHANGE_PASS:
      return {
        ...state,
        user: action.value,
        loading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
