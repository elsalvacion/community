import React from "react";
import { connect } from "react-redux";
import defaultImg from "../../assets/default-picture.jpg";
const Profile = ({ authReducer: { user, loading } }) => {
  console.log(user);
  if (loading) return <h2 className="text-center h2">Loading ...</h2>;
  if (user === null) {
    return <h2 className="text-center h2">Sorry You are not logged in</h2>;
  }
  return (
    user && (
      <div className="row p-3">
        <div className="col-md-6 mb-3">
          <div className="text-center">
            <img
              src={defaultImg}
              className="img-thumbnail mx-auto d-block my-2 profile"
              alt={`${user.firstName} ${user.lastName}`}
            />
          </div>
          <button className="btn btn-dark d-block mx-auto profile-btn">
            Change
          </button>
        </div>
        <div className="col-md-6 p-3  mb-3">
          <div className="row border-bottom">
            <h2 className="h2 ">Details</h2>
          </div>
          {/* Row One */}
          {/* Secret */}
          <div className="row">
            <h3 className="lead my-2 border-bottom p-2">
              <b>Secret:</b> {" " + user.secret}
            </h3>
          </div>

          {/* Name */}
          <div className="row">
            <h3 className="lead my-2 border-bottom p-2">
              <b>Name:</b> {" " + user.firstName + " " + user.lastName}
            </h3>
          </div>

          {/* Programme */}
          <div className="row">
            <h3 className="lead my-2 border-bottom p-2">
              <b>Programme:</b> {" " + user.programme}
            </h3>
          </div>

          {/*Row two  */}

          {/* Admitted */}
          <div className="row">
            <h3 className="lead my-2 border-bottom p-2">
              <b>Admission Year:</b> {" " + user.admitted}
            </h3>
          </div>

          {/* Graduation */}
          <div className="row">
            <h3 className="lead my-2 border-bottom p-2">
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
    )
  );
};

const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
});

export default connect(mapStateToProps, {})(Profile);
