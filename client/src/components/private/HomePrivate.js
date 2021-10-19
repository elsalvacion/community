import React from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";

const HomePrivate = ({ authReducer: { isAuthenticated, user } }) => {
  if (isAuthenticated && user) return <Redirect to="/profile" />;
  return <Redirect to="/login" />;
};

const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
});

export default withRouter(connect(mapStateToProps, {})(HomePrivate));
