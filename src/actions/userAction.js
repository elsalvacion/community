import axios from "axios";

import {
  CHANGE_PASS,
  LOGIN_USER,
  LOGOUT,
  SET_LOADING,
} from "../reducers/types";

// const generateRandom = () => {
//   return Math.floor(1000 + Math.random() * 9000);
// };

// export const addUser = (user) => async (dispatch) => {
//   setLoading();

//   let secret = null;

//   const getSecrets = await axios.get("/secret-keys");

//   const secret_keys = getSecrets.data;
//   let userExist = false,
//     keyExist = false;

//   if (secret_keys.length > 0) {
//     while (true) {
//       secret = generateRandom();
//       for (const key in secret_keys) {
//         if (secret_keys[key].email === user.email) {
//           userExist = true;
//           break;
//         } else if (secret_keys[key].secret === secret) {
//           keyExist = true;
//           break;
//         }
//       }

//       if (keyExist && userExist === false) continue;
//       else break;
//     }

//     if (userExist) {
//       setAlert(dispatch, { type: "danger", msg: "User Exist" });
//     } else {
//       const data = {
//         email: user.email,
//         role: user.role,
//         secret,
//       };

//       await axios.post("/secret-keys", data, {
//         "Content-Type": "application/json",
//       });

//       setAlert(dispatch, {
//         type: "success",
//         msg: `User Added, Secret: ${secret}`,
//       });
//     }
//   } else {
//     secret = generateRandom();
//     const data = {
//       email: user.email,
//       role: user.role,
//       secret,
//     };

//     await axios.post("/secret-keys", data, {
//       "Content-Type": "application/json",
//     });

//     setAlert(dispatch, {
//       type: "success",
//       msg: `User Added, Secret: ${secret}`,
//     });
//   }
// };

// export const checkRegister = (user) => async (dispatch) => {
//   const res = await axios.get("secret-keys");
//   const secret_keys = res.data;
//   let found = false,
//     id = null;
//   if (secret_keys.length > 0) {
//     for (const key in secret_keys) {
//       if (
//         secret_keys[key].email === user.email &&
//         secret_keys[key].secret === Number(user.secret)
//       ) {
//         found = true;
//         id = secret_keys[key].id;
//         break;
//       }
//     }

//     if (found) {
//       return { found, id };
//     } else {
//       setAlert(dispatch, { type: "danger", msg: "Wrong Secret or Email" });
//       return { found, id };
//     }
//   } else {
//     setAlert(dispatch, { type: "danger", msg: "Sorry Only Members" });
//     return { found, id: null };
//   }
// };

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
  return true;
};

export const loginUser = (user) => async (dispatch) => {
  setLoading();
  dispatch({
    type: LOGIN_USER,
    value: user,
  });
};

export const logoutUser = () => (dispatch) => {
  setLoading();
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
// const setAlert = (dispatch, alert) => {
//   dispatch({
//     type: SET_ALERT,
//     value: {
//       type: alert.type,
//       msg: alert.msg,
//     },
//   });
// };

// export const clearAlert = () => (dispatch) => {
//   dispatch({
//     type: CLEAR_ALERT,
//   });
// };
export const setLoading = () => (dispatch) => {
  dispatch({
    type: SET_LOADING,
  });
};
