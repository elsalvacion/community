import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/userAction";
const Navbar = ({ authReducer: { user }, logoutUser }) => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark my-nav p-2" id="navbar">
      <NavLink className="navbar-brand" to="/">
        CMS
      </NavLink>
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
                <NavLink
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="drop-down"
                  role="button"
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="material-icons">person</i>
                </NavLink>
                <ul className="dropdown-menu drp" aria-labelledby="drop-down">
                  <li className="nav-item">
                    <NavLink
                      activeClassName="selected"
                      className="dropdown-item"
                      exact
                      to="/profile"
                    >
                      Profile
                    </NavLink>
                  </li>
                  {user.role === "executive" && (
                    <li className="nav-item">
                      <NavLink
                        activeClassName="selected"
                        className="dropdown-item"
                        exact
                        to="/add-user"
                      >
                        Add User
                      </NavLink>
                    </li>
                  )}
                  <li className="nav-item">
                    <NavLink
                      activeClassName="selected"
                      className="dropdown-item"
                      exact
                      to="/change-password"
                    >
                      Change Password
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      activeClassName="selected"
                      className="dropdown-item"
                      exact
                      to="/"
                      onClick={() => logoutUser()}
                    >
                      Logout
                    </NavLink>
                  </li>
                </ul>
              </li>

              {/* Drop down */}
            </Fragment>
          ) : (
            <Fragment>
              <li className="nav-item">
                <NavLink
                  activeClassName="selected"
                  className="nav-link"
                  exact
                  to="/register-check"
                >
                  Register
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  activeClassName="selected"
                  className="nav-link"
                  exact
                  to="/login"
                >
                  Login
                </NavLink>
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

export default connect(mapStateToProps, { logoutUser })(Navbar);
