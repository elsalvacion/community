import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/userAction";
import Alert from "../layout/Alert";

const Register = ({ registerUser }) => {
  const { id } = useParams();
  const [user, setUser] = useState({
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

  const history = useHistory();

  const checkFirst = () => {
    if (user.password !== user.confirm_password) {
      setAlert({ type: "danger", msg: "Passwords do not match" });
      window.scroll({ top: 0, left: 0 });
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkFirst()) {
      const returned = registerUser(user, id);
      returned.then((res) => {
        if (res) {
          history.replace(`/login`);
        }
      });
    }
  };
  return (
    <div className="container-fluid register py-3">
      <div className="row ">
        <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1">
          <form onSubmit={(e) => handleSubmit(e)}>
            <h2 className="h2 text-center">Register</h2>

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
                placeholder="Enter Last Name"
                onChange={(e) => handleChange(e)}
              />
            </div>

            {/* Gender */}

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

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password" className="my-3">
                Password
              </label>
              <input
                type="password"
                className="form-control d-block w-100"
                id="password"
                placeholder="Enter Password"
                name="password"
                onChange={(e) => handleChange(e)}
                required
              />
            </div>

            {/* Confirm Password */}

            <div className="form-group">
              <label htmlFor="password" className="my-3">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control d-block w-100"
                id="confirm_password"
                placeholder="Confirm Password"
                name="confirm_password"
                onChange={(e) => handleChange(e)}
                required
              />
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
                placeholder="format https://www.linkedin.com/in/alieukeita/"
                onChange={(e) => handleChange(e)}
              />
            </div>

            <button
              type="submit"
              className="btn btn-dark my-3 d-block w-100 register-btn"
            >
              Register
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

export default connect(mapStateToProps, { registerUser })(Register);
