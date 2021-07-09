import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import defaultImg from "../../assets/default-picture.jpg";
import Treasury from "../treasury/Treasury";
const Profile = ({ authReducer: { user, loading } }) => {
  if (loading) return <h2 className="text-center h2">Loading ...</h2>;
  if (user === null) {
    return <Redirect to="/login" />;
  }
  return (
    user && (
      <Fragment>
        <div className="row p-3 mb-3">
          <div className="col-md-6  text-center">
            <div className="text-center">
              <img
                src={defaultImg}
                className="img-thumbnail mx-auto d-block my-2 profile"
                alt={`${user.firstName} ${user.lastName}`}
              />
            </div>
            <button className="btn btn-dark d-block mx-auto profile-btn text-center">
              Change
            </button>
            <div className="p-3 text-center">
              {/* Secret */}
              <div className="row">
                <h3 className="lead monospace my-2 border-secondary border-bottom p-2 w-100">
                  <b>Secret:</b> {" " + user.secret}
                </h3>
              </div>

              {/* Name */}
              <div className="row">
                <h3 className="lead monospace my-2 border-secondary border-bottom p-2 w-100">
                  <b>Name:</b> {" " + user.firstName + " " + user.lastName}
                </h3>
              </div>

              {/* Programme */}
              <div className="row">
                <h3 className="lead monospace my-2 border-secondary border-bottom p-2 w-100">
                  <b>Programme:</b> {" " + user.programme}
                </h3>
              </div>

              {/* Admitted */}
              <div className="row">
                <h3 className="lead monospace my-2 border-secondary border-bottom p-2 w-100">
                  <b>Admission Year:</b> {" " + user.admitted}
                </h3>
              </div>

              {/* Graduation */}
              <div className="row">
                <h3 className="lead monospace my-2 border-secondary border-bottom p-2 w-100">
                  <b>
                    {new Date().getFullYear() < Number(user.graduation)
                      ? "Expected Graduation"
                      : "Graduation"}{" "}
                    Year:
                  </b>{" "}
                  {" " + user.graduation}
                </h3>
              </div>
            </div>
          </div>
          <div className="col-md-6 ">
            <Treasury />
          </div>
        </div>

        {/* <div className="row p-3">
         
        </div> */}
      </Fragment>
    )
  );
};

const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
});

export default withRouter(connect(mapStateToProps, {})(Profile));
