import React from "react";
import { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { loginUser } from "../../actions/userAction";
import Alert from "../layout/Alert";
const AddUser = ({ loginUser }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
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

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const history = useHistory();

  const checkFirst = async () => {
    const getUsers = await axios.get("/users");
    const users = getUsers.data;
    let found = false,
      current_user = false;
    if (users.length > 0) {
      for (const key in users) {
        if (
          user.password === users[key].password &&
          user.email === users[key].email
        ) {
          found = true;
          current_user = users[key];
        }
      }

      if (found) {
        return { found, current_user };
      } else {
        setAlert({ type: "danger", msg: "Wrong Credentails" });
        return { found, current_user };
      }
    } else {
      setAlert({ type: "danger", msg: "Sorry you are not a user" });
      return { found, current_user };
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const returned = checkFirst();
    returned.then((res) => {
      if (res.found) {
        loginUser(res.current_user);
        clearAlert();
        history.replace(`/profile`);
      }
    });
  };
  return (
    <div className="container add-user py-3">
      <div className="row ">
        <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1">
          <form onSubmit={(e) => handleSubmit(e)}>
            <h1 className="h1 text-center mb-2">Login</h1>
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
              <label htmlFor="password" className="my-3">
                Password
              </label>
              <input
                type="password"
                className="form-control d-block w-100"
                id="password"
                placeholder="Enter Password"
                value={user.password}
                name="password"
                onChange={(e) => handleChange(e)}
                required
              />
            </div>

            <p className="monospace my-2">
              New here? <Link to="/register-check">Register</Link>
            </p>

            <button type="submit" className="btn btn-dark my-3 d-block w-100">
              Login
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

export default connect(mapStateToProps, { loginUser })(AddUser);
