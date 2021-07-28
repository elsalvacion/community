import axios from "axios";
import { SET_LOADING, GET_TREASURY } from "../reducers/types";

export const getTreasury = (secret) => async (dispatch) => {
  setLoading();
  const res = await axios.get(`/treasury`);
  let treasury = res.data;
  console.log(treasury, secret);
  treasury = treasury.filter((data) => {
    if (Number(data.secret) === secret) {
      return data.months;
    }
    return null;
  });
  dispatch({
    type: GET_TREASURY,
    payload: treasury[0].months,
  });
};

export const setLoading = () => (dispatch) =>
  dispatch({
    type: SET_LOADING,
  });
