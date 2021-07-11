import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { changePassword } from "../../actions/userAction";
import Alert from "../layout/Alert";
const ChangePass = ({ authReducer: { user }, changePassword }) => {
  const [pass, setUser] = useState({
    newPassword: "",
    confirmPassword: "",
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
      ...pass,
      [e.target.name]: e.target.value,
    });
  };

  const checkFirst = () => {
    if (pass.newPassword !== pass.confirmPassword) {
      setAlert({ type: "danger", msg: "Passwords do not match " });
      return false;
    } else return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    if (checkFirst()) {
      const returned = changePassword(pass, user);
      returned.then((res) => {
        if (res) {
          setAlert({ type: "success", msg: "Password Changed" });
        }
        console.log(res);
      });
    }
  };

  if (user === null) return <Redirect to="/" />;
  return (
    <div className="container-fluid change-pass py-3">
      <div className="row ">
        <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1">
          <form onSubmit={(e) => handleSubmit(e)}>
            <h1 className="h1 text-center mb-2">Change Password</h1>
            {alert.type && <Alert alert={alert} clearAlert={clearAlert} />}

            <div className="form-group">
              <label htmlFor="password" className="my-3">
                New Password
              </label>
              <input
                type="password"
                className="form-control d-block w-100"
                id="newPassword"
                placeholder="Enter New Password"
                value={pass.newPassword}
                name="newPassword"
                onChange={(e) => handleChange(e)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="my-3">
                Confirm New Password
              </label>
              <input
                type="password"
                className="form-control d-block w-100"
                id="confirmPassword"
                placeholder="Confirm New Password"
                value={pass.confirmPassword}
                name="confirmPassword"
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-dark my-3 d-block w-100 change-pass-btn"
            >
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

export default withRouter(
  connect(mapStateToProps, { changePassword })(ChangePass)
);
