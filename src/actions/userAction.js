import axios from "axios";

import {
  CHANGE_PASS,
  GET_USER,
  LOGIN_USER,
  LOGOUT,
  SET_LOADING,
  UPDATE_USER,
  GET_ALL_USERS,
  FILTER_USERS,
  DELETE_USER,
  GET_SELECTED_USER,
} from "../reducers/types";
import { getSelectedUserTreasury } from "./treasuryAction";

const monthlyFields = {
  months: [
    {
      month: "Jan",
      amount: 100,
      amount_status: false,
      loan: 0,
      loan_status: true,
    },
    {
      month: "Feb",
      amount: 100,
      amount_status: false,
      loan: 0,
      loan_status: true,
    },
    {
      month: "Mar",
      amount: 100,
      amount_status: false,
      loan: 0,
      loan_status: true,
    },
    {
      month: "Apr",
      amount: 100,
      amount_status: false,
      loan: 0,
      loan_status: true,
    },
    {
      month: "May",
      amount: 100,
      amount_status: false,
      loan: 0,
      loan_status: true,
    },
    {
      month: "June",
      amount: 100,
      amount_status: false,
      loan: 0,
      loan_status: true,
    },
    {
      month: "July",
      amount: 100,
      amount_status: false,
      loan: 0,
      loan_status: true,
    },
    {
      month: "Aug",
      amount: 100,
      amount_status: false,
      loan: 0,
      loan_status: true,
    },
    {
      month: "Sept",
      amount: 100,
      amount_status: false,
      loan: 0,
      loan_status: true,
    },
    {
      month: "Oct",
      amount: 100,
      amount_status: false,
      loan: 0,
      loan_status: true,
    },
    {
      month: "Nov",
      amount: 100,
      amount_status: false,
      loan: 0,
      loan_status: true,
    },
    {
      month: "Dec",
      amount: 100,
      amount_status: false,
      loan: 0,
      loan_status: true,
    },
  ],
  secret: "",
};

const generateRandom = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

export const addUser = (user) => async (dispatch) => {
  setLoading();

  let secret = null;

  const getSecrets = await axios.get("/secret-keys");

  const secret_keys = getSecrets.data;
  let userExist = false,
    keyExist = false;

  if (secret_keys.length > 0) {
    while (true) {
      secret = generateRandom();
      for (const key in secret_keys) {
        if (secret_keys[key].email === user.email) {
          userExist = true;
          break;
        } else if (secret_keys[key].secret === secret) {
          keyExist = true;
          break;
        }
      }

      if (keyExist && userExist === false) continue;
      else break;
    }

    if (userExist) {
      return {
        success: false,
        secret: null,
      };
    } else {
      const data = {
        email: user.email,
        role: user.role,
        secret,
      };

      await axios.post("/secret-keys", data, {
        "Content-Type": "application/json",
      });

      return {
        secret,
        success: true,
      };
    }
  } else {
    secret = generateRandom();
    const data = {
      email: user.email,
      role: user.role,
      secret,
    };

    await axios.post("/secret-keys", data, {
      "Content-Type": "application/json",
    });

    return {
      secret,
      success: true,
    };
  }
};

export const getAllUser = () => async (dispatch) => {
  setLoading();
  const res = await axios.get("/users");
  dispatch({
    type: GET_ALL_USERS,
    value: res.data,
  });
};

export const filterUsers = (text) => async (dispatch) => {
  setLoading();
  const usersResponse = await axios.get("/users");
  const usersData = usersResponse.data;
  if (text === "") {
    dispatch({
      type: FILTER_USERS,
      value: null,
    });
  } else {
    const filtered = usersData.filter((user) => {
      if (
        String(user.firstName + " " + user.lastName)
          .toLowerCase()
          .includes(text.toLowerCase()) ||
        String(user.role).toLowerCase().includes(text.toLowerCase()) ||
        String(user.programme).toLowerCase().includes(text.toLowerCase())
      ) {
        return user;
      }
      return null;
    });
    dispatch({
      type: FILTER_USERS,
      value: filtered,
    });
  }
};

export const deleteUser = (u) => async (dispatch) => {
  setLoading();
  await axios.delete(`/users/${u.id}`);
  const usersResponse = await axios.get("/users");
  const usersData = usersResponse.data;

  dispatch({
    type: DELETE_USER,
    value: {
      deleted: u,
      allUsers: usersData,
    },
  });
};

export const checkRegister = (user) => async (dispatch) => {
  const res = await axios.get("/secret-keys");
  const secret_keys = res.data;
  let found = false,
    id = null;
  if (secret_keys.length > 0) {
    for (const key in secret_keys) {
      if (
        secret_keys[key].email === user.email &&
        secret_keys[key].secret === Number(user.secret)
      ) {
        found = true;
        id = secret_keys[key].id;
        break;
      }
    }

    if (found) {
      return { found, id };
    } else {
      return { found, id };
    }
  } else {
    return { found, id: null };
  }
};

export const registerUser = (user, id) => async (dispatch) => {
  setLoading();
  const getUserSecrets = await axios.get(`/secret-keys/${id}`);

  const userSecret = getUserSecrets.data;
  const data = {
    ...user,
    email: userSecret.email,
    secret: userSecret.secret,
    role: userSecret.role,
  };
  await axios.post("/users", data, { "Content-Type": "application/json" });
  monthlyFields.secret = userSecret.secret;
  await axios.post("/treasury", monthlyFields, {
    "Content-Type": "application/json",
  });
  return true;
};

export const updateProfile = (user) => async (dispatch) => {
  setLoading();
  await axios.put(`/users/${user.id}`, user, {
    "Content-Type": "application/json",
  });

  const loggedInUser = JSON.parse(sessionStorage.getItem("user"));

  if (user.id === loggedInUser.id) {
    dispatch({
      type: UPDATE_USER,
      value: user,
    });

    sessionStorage.setItem("user", JSON.stringify(user));
  }

  return true;
};

export const getUser = () => async (dispatch) => {
  setLoading();
  const user = JSON.parse(sessionStorage.getItem("user"));

  if (user) {
    dispatch({
      type: GET_USER,
      value: user,
    });
  }
};

export const getSelectedUser = (id) => async (dispatch) => {
  setLoading();
  const user = await axios.get(`/users/${id}`);
  const res = await axios.get(`/treasury`);
  let treasury = res.data;
  treasury = treasury.filter((data) => {
    if (Number(data.secret) === user.data.secret) {
      return data.months;
    }
    return null;
  });

  dispatch({
    type: GET_SELECTED_USER,
    value: {
      user: user.data,
      treasury: treasury[0].months,
    },
  });
};

export const loginUser = (user) => async (dispatch) => {
  setLoading();
  sessionStorage.setItem("user", JSON.stringify(user));

  dispatch({
    type: LOGIN_USER,
    value: user,
  });
};

export const logoutUser = () => (dispatch) => {
  setLoading();
  sessionStorage.removeItem("user");
  dispatch({
    type: LOGOUT,
  });
  return true;
};

export const changePassword = (pass, user) => async (dispatch) => {
  const data = {
    ...user,
    password: pass.newPassword,
    confirm_password: pass.confirmPassword,
  };
  dispatch({
    type: CHANGE_PASS,
    value: data,
  });

  await axios.put(`/users/${data.id}`, data, {
    "Content-Type": "application/json",
  });
  return true;
};

export const setLoading = () => (dispatch) => {
  dispatch({
    type: SET_LOADING,
  });
};
