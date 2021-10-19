import React, { useState } from "react";
import { Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addUser } from "../../actions/userAction";
import Alert from "../layout/Alert";
import axios from "axios";

const AddUser = ({ authReducer: { user, isAuthenticated }, addUser }) => {
  const [usr, setUser] = useState({
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

  const handleChange = (e) => {
    setUser({
      ...usr,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await addUser(usr);

    if (res.success && res.secret) {
      setAlert({ msg: `User added`, type: "success" });
      await axios.post("/send-secret", res, {
        "Content-Type": "application/json",
      });
    } else {
      setAlert({ msg: `User Exist`, type: "danger" });
    }
  };

  if (user === null && isAuthenticated === false)
    return <Redirect to="/login" />;
  return (
    user && (
      <div className="container-fluid add-user py-3">
        <div className="row ">
          <div className="col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-sm-8 offset-sm-2">
            <div className="card cardStyling">
              <div className="card-body">
                <form onSubmit={(e) => handleSubmit(e)}>
                  <h2 className="h2 text-center">Add User</h2>

                  {alert.type && (
                    <Alert alert={alert} clearAlert={clearAlert} />
                  )}

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
                    <label htmlFor="role" className="my-3">
                      User Role
                    </label>
                    <select
                      className="form-control d-block w-100"
                      id="role"
                      name="role"
                      value={usr.role}
                      onChange={(e) => handleChange(e)}
                    >
                      <option value="regular">Regular</option>
                      <option value="treasurer">Treasurer</option>
                      <option value="executive">Executive</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-dark my-3 d-block w-100 add-user-btn"
                  >
                    Add User
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
});

export default withRouter(connect(mapStateToProps, { addUser })(AddUser));
