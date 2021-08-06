import axios from "axios";
import {
  SET_LOADING,
  GET_TREASURY,
  GET_SELECTED_USER_TREASURY,
} from "../reducers/types";

export const getTreasury = (secret) => async (dispatch) => {
  setLoading();
  const res = await axios.get(`/treasury`);
  let treasury = res.data;
  treasury = treasury.filter((data) => {
    if (Number(data.secret) === secret) {
      return data.months;
    }
    return null;
  });
  dispatch({
    type: GET_TREASURY,
    value: treasury[0].months,
  });
};

export const setLoading = () => (dispatch) =>
  dispatch({
    type: SET_LOADING,
  });
