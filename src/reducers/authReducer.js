import {
  SET_LOADING,
  LOGIN_USER,
  LOGOUT,
  CHANGE_PASS,
  GET_USER,
  UPDATE_USER,
  GET_ALL_USERS,
  FILTER_USERS,
  DELETE_USER,
  GET_SELECTED_USER,
} from "./types";

const initialState = {
  loading: false,
  user: null,
  isAuthenticated: false,
  allUsers: null,
  filtered: null,
  selectedUser: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
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
    case GET_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.value,
        loading: false,
      };
    case GET_ALL_USERS:
      return {
        ...state,
        allUsers: action.value,
        loading: false,
      };
    case GET_SELECTED_USER:
      return {
        ...state,
        selectedUser: action.value,
        loading: false,
      };
    case FILTER_USERS:
      return {
        ...state,
        filtered: action.value,
        loading: false,
      };
    case DELETE_USER:
      return {
        ...state,
        filtered: state.filtered
          ? state.filtered.filter((u) =>
              u.id !== action.value.deleted.id ? u : null
            )
          : null,
        allUsers: action.value.allUsers,
        loading: false,
      };
    case UPDATE_USER:
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
