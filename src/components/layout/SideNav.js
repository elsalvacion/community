import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/userAction";
const SideNav = ({ authReducer: { user }, logoutUser }) => {
  const closeOnClick = (e) => {
    const sidenav = document.getElementById("sidenav");
    sidenav.classList.remove("show");
  };
  return (
    <div className="d-md-none sidenav" id="sidenav">
      <button
        className="closeSidenav"
        onClick={(e) => e.target.parentElement.classList.toggle("show")}
      >
        X
      </button>
      <ul className="navbar-nav">
        {user !== null ? (
          <Fragment>
            <li className="nav-item">
              <NavLink
                onClick={(e) => closeOnClick(e)}
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
                    onClick={(e) => closeOnClick(e)}
                    activeClassName="selected"
                    className="nav-link"
                    exact
                    to="/add-user"
                  >
                    Add User
                  </NavLink>
                </li>
              </Fragment>
            )}
            {user.role === "treasurer" && (
              <Fragment>
                <li className="nav-item">
                  <NavLink
                    onClick={(e) => closeOnClick(e)}
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
                    onClick={(e) => closeOnClick(e)}
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
                  onClick={(e) => closeOnClick(e)}
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
                onClick={(e) => closeOnClick(e)}
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
                onClick={(e) => {
                  closeOnClick(e);
                  logoutUser();
                }}
              >
                Logout
              </NavLink>
            </li>
          </Fragment>
        ) : (
          <Fragment>
            <li className="nav-item">
              <NavLink
                onClick={(e) => closeOnClick(e)}
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
                onClick={(e) => closeOnClick(e)}
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
  );
};

const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
});

export default connect(mapStateToProps, { logoutUser })(SideNav);
