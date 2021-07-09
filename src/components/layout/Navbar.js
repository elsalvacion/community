import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/userAction";
const Navbar = ({ authReducer: { user }, logoutUser }) => {
  return (
    <nav
      className="navbar navbar-expand-sm navbar-dark bg-dark p-2"
      id="navbar"
    >
      <Link className="navbar-brand" to="/">
        CMS
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mx-auto">
          {user !== null ? (
            <Fragment>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="drop-down"
                  role="button"
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="material-icons">person</i>
                </Link>
                <ul
                  className="dropdown-menu dropdown-menu-dark"
                  aria-labelledby="drop-down"
                >
                  <li className="nav-item">
                    <Link className="dropdown-item" to="/profile">
                      Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="dropdown-item" to="/add-user">
                      Add User
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="dropdown-item" to="/change-password">
                      Change Password
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="dropdown-item"
                      to="/"
                      onClick={() => logoutUser()}
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Drop down */}
            </Fragment>
          ) : (
            <Fragment>
              <li className="nav-item">
                <Link className="nav-link" to="/register-check">
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            </Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
};
const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
});

export default withRouter(connect(mapStateToProps, { logoutUser })(Navbar));
