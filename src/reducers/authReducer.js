import {
  SET_ALERT,
  REGISTER,
  SET_LOADING,
  CLEAR_ALERT,
  LOGIN_USER,
} from "./types";

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
    default:
      return state;
  }
};

export default authReducer;
