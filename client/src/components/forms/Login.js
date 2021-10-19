import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { useHistory, Link, Redirect, withRouter } from "react-router-dom";
import { loginUser, getUser } from "../../actions/userAction";
import Alert from "../layout/Alert";
const AddUser = ({
  authReducer: { isAuthenticated, user },
  loginUser,
  getUser,
}) => {
  useEffect(() => {
    getUser();
    //eslint-disable-next-line
  }, []);
  const [usr, setUser] = useState({
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
      ...usr,
      [e.target.name]: e.target.value,
    });
  };

  const history = useHistory();

  const checkFirst = async () => {
    const getUsers = await axios.get("/users");
    const users = getUsers.data;
    let found = false,
      current_user = false,
      pass_error = false;
    if (users.length > 0) {
      for (const key in users) {
        if (
          usr.password === users[key].password &&
          usr.email === users[key].email
        ) {
          found = true;
          current_user = users[key];
        }

        if (
          usr.password !== users[key].password &&
          usr.email === users[key].email
        ) {
          pass_error = true;
        }
      }

      if (found) {
        return { found, current_user };
      } else {
        if (pass_error) {
          setAlert({ type: "danger", msg: "Incorrect Password" });
        } else {
          setAlert({ type: "danger", msg: "Incorrect Email" });
        }
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
  return isAuthenticated && user !== null ? (
    <Redirect to="/" />
  ) : (
    <div className="container-fluid login py-3">
      <div className="row ">
        <div className="col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-sm-8 offset-sm-2">
          <div className="card cardStyling">
            <div className="card-body">
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
                    value={usr.email}
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
                    value={usr.password}
                    name="password"
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </div>

                <p className="monospace my-2">
                  New here? <Link to="/register-check">Register</Link>
                </p>

                <button
                  type="submit"
                  className="btn btn-dark my-3 d-block w-100 login-btn"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
});

export default withRouter(
  connect(mapStateToProps, { loginUser, getUser })(AddUser)
);
