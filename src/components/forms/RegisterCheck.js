import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { useHistory, Link } from "react-router-dom";
// import axios from "axios";
import { checkRegister } from "../../actions/userAction";
import Alert from "../layout/Alert";

const RegisterCheck = ({ checkRegister, authReducer }) => {
  const [user, setUser] = useState({
    email: "",
    secret: "",
  });
  const history = useHistory();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const returned = checkRegister(user);
    returned.then((res) => {
      if (res.found === false) {
        setAlert({ type: "danger", msg: "Wrong Secret or Email" });
      }
      if (res.found) {
        clearAlert();
        history.replace(`/register/${res.id}`);
      }
    });
  };
  return (
    <div className="container-fluid register py-3">
      <div className="row ">
        <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1">
          <form onSubmit={(e) => handleSubmit(e)}>
            <h1 className="h1 text-center mb-2">Register</h1>
            <p className="monospace my-1">
              Already got an account? <Link to="/login">Login</Link>
            </p>
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
              <label htmlFor="secret" className="my-3">
                Your Secret
              </label>
              <input
                type="text"
                className="form-control d-block w-100"
                id="secret"
                placeholder="Enter Secret"
                value={user.secret}
                name="secret"
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-dark my-3 d-block w-100 register-btn"
            >
              Next
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
export default connect(mapStateToProps, { checkRegister })(RegisterCheck);
