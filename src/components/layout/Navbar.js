import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/userAction";
const Navbar = ({ authReducer: { user }, logoutUser }) => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark my-nav" id="navbar">
      <NavLink className="navbar-brand" to="/">
        CMS
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        onClick={(e) =>
          document.getElementById("sidenav").classList.toggle("show")
        }
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <ul className="navbar-nav ml-auto d-none d-md-flex">
        {user !== null ? (
          <Fragment>
            <li className="nav-item">
              <NavLink
                activeClassName="selected"
                className="nav-link"
                exact
                to="/profile"
              >
                Profile
              </NavLink>
            </li>
            {user.role === "executive" && (
              <Fragment>
                <li className="nav-item">
                  <NavLink
                    activeClassName="selected"
                    className="nav-link"
                    exact
                    to="/add-user"
                  >
                    Add User
                  </NavLink>
                </li>
                {/*  All users */}
              </Fragment>
            )}
            {user.role === "treasurer" && (
              <Fragment>
                <li className="nav-item">
                  <NavLink
                    activeClassName="selected"
                    className="nav-link"
                    exact
                    to="/monthly"
                  >
                    Contributions
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    activeClassName="selected"
                    className="nav-link"
                    exact
                    to="/loan"
                  >
                    Loan
                  </NavLink>
                </li>
              </Fragment>
            )}

            {user.role === "executive" || user.role === "treasurer" ? (
              <li className="nav-item">
                <NavLink
                  activeClassName="selected"
                  className="nav-link"
                  exact
                  to="/all-users"
                >
                  All Users
                </NavLink>
              </li>
            ) : null}
            <li className="nav-item">
              <NavLink
                activeClassName="selected"
                className="nav-link"
                exact
                to="/change-password"
              >
                Change Password
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                activeClassName="selected"
                className="nav-link"
                exact
                to="/"
                onClick={() => logoutUser()}
              >
                Logout
              </NavLink>
            </li>
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
    </nav>
  );
};
const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
