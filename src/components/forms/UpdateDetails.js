import React, { useState, useEffect } from "react";
import { Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { updateProfile } from "../../actions/userAction";
import Alert from "../layout/Alert";

const UpdateUser = ({
  authReducer: { user, isAuthenticated },
  updateProfile,
}) => {
  useEffect(() => {
    setUser(user);
    //eslint-disable-next-line
  }, []);
  const [usr, setUser] = useState({
    firstName: "",
    lastName: "",
    gender: "male",
    programme: "",
    password: "",
    confirm_password: "",
    admitted: "",
    graduation: "",
    whatsapp: "",
    emergency: "",
    facebook: "",
    linkedin: "",
    email: null,
    secret: null,
    role: null,
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
  const handleSubmit = (e) => {
    e.preventDefault();
    const returned = updateProfile(usr);
    returned.then((res) => {
      if (res) {
        window.scroll({ top: 0, left: 0 });
        setAlert({ type: "success", msg: "Update Sucess" });
      }
    });
  };

  if (user === null && isAuthenticated === false)
    return <Redirect to="/login" />;

  return (
    usr && (
      <div className="container-fluid register py-3">
        <div className="row ">
          <div className="col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-sm-8 offset-sm-2">
            <form onSubmit={(e) => handleSubmit(e)}>
              <h2 className="h2 text-center">Update Profile Details</h2>

              {alert.type && <Alert alert={alert} clearAlert={clearAlert} />}

              {/* First Name */}
              <div className="form-group">
                <label htmlFor="firstName" className="my-3">
                  First Name
                </label>
                <input
                  required
                  type="text"
                  className="form-control d-block w-100"
                  id="firstName"
                  placeholder="Enter First Name"
                  name="firstName"
                  value={usr.firstName}
                  onChange={(e) => handleChange(e)}
                />
              </div>

              {/* Last Name */}

              <div className="form-group">
                <label htmlFor="lastName" className="my-3">
                  Last Name
                </label>
                <input
                  required
                  type="text"
                  className="form-control d-block w-100"
                  id="lastName"
                  name="lastName"
                  value={usr.lastName}
                  placeholder="Enter Last Name"
                  onChange={(e) => handleChange(e)}
                />
              </div>

              {/* Gender */}
              {}
              <div className="form-check my-3">
                <input
                  required
                  className="form-check-input
                required"
                  type="radio"
                  name="gender"
                  id="male"
                  value="male"
                  onChange={(e) => handleChange(e)}
                  checked
                />
                <label className="form-check-label" htmlFor="male">
                  Male
                </label>
              </div>
              <div className="form-check my-3">
                <input
                  required
                  className="form-check-input
                required"
                  type="radio"
                  name="gender"
                  id="female"
                  value="female"
                  onChange={(e) => handleChange(e)}
                />
                <label className="form-check-label" htmlFor="female">
                  Female
                </label>
              </div>

              {/* Programme */}
              <div className="form-group">
                <label htmlFor="programme" className="my-3">
                  Programme
                </label>
                <input
                  required
                  type="text"
                  className="form-control d-block w-100"
                  id="programme"
                  name="programme"
                  placeholder="Enter Programme"
                  value={usr.programme}
                  onChange={(e) => handleChange(e)}
                />
              </div>

              {/* Admitted Year */}
              <div className="form-group">
                <label htmlFor="admitted" className="my-3">
                  Admission Year
                </label>
                <input
                  required
                  type="number"
                  className="form-control d-block w-100"
                  id="admitted"
                  name="admitted"
                  placeholder="Enter Admission Year"
                  value={usr.admitted}
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="graduation" className="my-3">
                  Graduation year or Expected graduation year
                </label>
                <input
                  required
                  type="number"
                  className="form-control d-block w-100"
                  id="graduation"
                  name="graduation"
                  placeholder="Enter Graduation Year"
                  value={usr.graduation}
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="whatsapp" className="my-3">
                  WhatsApp Number
                </label>
                <input
                  required
                  type="tel"
                  className="form-control d-block w-100"
                  id="whatsapp"
                  name="whatsapp"
                  placeholder="Format +22065465465"
                  value={usr.whatsapp}
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="emergency" className="my-3">
                  Emergency Contact
                </label>
                <input
                  required
                  type="tel"
                  className="form-control d-block w-100"
                  id="emergency"
                  name="emergency"
                  placeholder="Format +8801858328684"
                  value={usr.emergency}
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="facebook" className="my-3">
                  Facebook Profile Link
                </label>
                <input
                  required
                  type="text"
                  className="form-control d-block w-100"
                  id="facebook"
                  name="facebook"
                  value={usr.facebook}
                  placeholder="format https://www.facebook.com/alieu.keita.58"
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="linkedin" className="my-3">
                  LinkedIn Profile Link
                </label>
                <input
                  required
                  type="text"
                  className="form-control d-block w-100"
                  id="linkedin"
                  name="linkedin"
                  value={usr.linkedin}
                  placeholder="format https://www.linkedin.com/in/alieukeita/"
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <button
                type="submit"
                className="btn btn-dark my-3 d-block w-100 register-btn"
              >
                Change
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
});

export default withRouter(
  connect(mapStateToProps, { updateProfile })(UpdateUser)
);
