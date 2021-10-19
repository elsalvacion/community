import { SET_LOADING, GET_TREASURY, GET_SELECTED_USER_TREASURY } from "./types";

const initialState = {
  treasury: null,
  currentTreasury: null,
  loading: false,
};

const treasuryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TREASURY:
      return {
        ...state,
        treasury: action.value,
        loading: false,
      };
    case GET_SELECTED_USER_TREASURY:
      return {
        ...state,
        currentTreasury: action.value,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default treasuryReducer;
