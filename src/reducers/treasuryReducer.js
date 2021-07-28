import { SET_LOADING, GET_TREASURY } from "./types";

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
        treasury: action.payload,
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
