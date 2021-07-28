import axios from "axios";
import {
  SET_LOADING,
  SET_CURRENT_LOAN,
  CHANGE_CURRENT_LOAN,
  GET_TREASURY,
} from "../reducers/types";

export const getTreasury = (secret) => async (dispatch) => {
  setLoading();
  const res = await axios.get(`/treasury`);
  let treasury = res.data;
  treasury = treasury.filter((data) => {
    if (data.secret === secret) {
      return data.months;
    }
  });
  console.log(secret, treasury);
  dispatch({
    type: GET_TREASURY,
    payload: treasury[0].months,
  });
};

export const setLoading = () => (dispatch) =>
  dispatch({
    type: SET_LOADING,
  });
