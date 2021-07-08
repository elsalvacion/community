import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { setLoading } from "../../actions/userAction";
import Alert from "../layout/Alert";

const AddUser = ({ setLoading, authReducer }) => {
  const [user, setUser] = useState({
    email: "",
    role: "regular",
  });

  const [alert, setAlert] = useState({
    type: null,
    msg: null,
  });

  const clearAlert = () => {
    setAlert({
      type: null,
      msg: null,
    });
  };

  const generateRandom = () => {
    return Math.floor(1000 + Math.random() * 9000);
  };

  const addUser = async () => {
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
        setAlert({ type: "danger", msg: "User Exist" });
      } else {
        const data = {
          email: user.email,
          role: user.role,
          secret,
        };

        await axios.post("/secret-keys", data, {
          "Content-Type": "application/json",
        });

        setAlert({
          type: "success",
          msg: `User Added, Secret: ${secret}`,
        });
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

      setAlert({
        type: "success",
        msg: `User Added, Secret: ${secret}`,
      });
    }
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser(user);
  };
  return (
    <div className="container add-user py-3">
      <div className="row ">
        <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1">
          <form onSubmit={(e) => handleSubmit(e)}>
            {alert.type && <Alert alert={alert} clearAlert={clearAlert} />}

            <div className="form-group">
              <label htmlFor="add-user-email" className="my-3">
                Email address
              </label>
              <input
                type="email"
                className="form-control d-block w-100"
                id="add-user-email"
                placeholder="Enter email"
                value={user.email}
                name="email"
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="role" className="my-3">
                User Role
              </label>
              <select
                className="form-select d-block w-100"
                id="role"
                name="role"
                value={user.role}
                onChange={(e) => handleChange(e)}
              >
                <option value="regular">Regular</option>
                <option value="treasurer">Treasurer</option>
                <option value="executive">Executive</option>
              </select>
            </div>
            <button type="submit" className="btn btn-dark my-3 d-block w-100">
              Add User
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
});

export default connect(mapStateToProps, { setLoading })(AddUser);
