import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter, Link } from "react-router-dom";
import defaultImg from "../../assets/default-picture.jpg";
import Treasury from "../treasury/Treasury";
import { getTreasury } from "../../actions/treasuryAction";
import { useEffect } from "react";
const Profile = ({
  authReducer: { user, loading, isAuthenticated },
  treasuryReducer: { treasury },
  getTreasury,
}) => {
  useEffect(() => {
    user && getTreasury(user.secret);
    // eslint-disable-next-line
  }, []);

  if (loading) return <h2 className="text-center h2">Loading ...</h2>;

  if (user === null && isAuthenticated === false) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container-fluid profile-bg">
      {user && (
        <Fragment>
          <div className="row">
            <div className="col-md-4 bg-dark card text-light">
              <div className="card-body">
                <div className="text-center">
                  <img
                    src={defaultImg}
                    className="mx-auto d-block my-2 profile"
                    alt={`${user.firstName} ${user.lastName}`}
                  />
                </div>
                <button className="btn btn-dark d-block mx-auto profile-btn text-center mb-3">
                  Change
                </button>
                <div className="p-1 text-left">
                  {/* Secret */}
                  <div className="row">
                    <p className=" monospace border-btm w-100">
                      <b>Secret:</b> {" " + user.secret}
                    </p>
                  </div>

                  {/* Name */}
                  <div className="row">
                    <p className=" monospace border-btm w-100">
                      <b>Name:</b> {" " + user.firstName + " " + user.lastName}
                    </p>
                  </div>

                  {/* Programme */}
                  <div className="row">
                    <p className=" monospace border-btm w-100">
                      <b>Programme:</b> {" " + user.programme}
                    </p>
                  </div>

                  {/* Admitted */}
                  <div className="row">
                    <p className=" monospace border-btm w-100">
                      <b>Admission Year:</b> {" " + user.admitted}
                    </p>
                  </div>

                  {/* Graduation */}
                  <div className="row">
                    <p className=" monospace border-btm w-100">
                      <b>
                        {new Date().getFullYear() < Number(user.graduation)
                          ? "Expected Graduation"
                          : "Graduation"}{" "}
                        Year:
                      </b>{" "}
                      {" " + user.graduation}
                    </p>
                  </div>

                  {/* WhatsApp */}
                  <div className="row">
                    <p className=" monospace border-btm w-100">
                      <b>WhatsApp:</b> {" " + user.whatsapp}
                    </p>
                  </div>

                  {/* Emergency */}
                  <div className="row">
                    <p className=" monospace border-btm w-100">
                      <b>Emergency:</b> {" " + user.emergency}
                    </p>
                  </div>

                  {/* Facebook */}
                  <div className="row">
                    <p className=" monospace border-btm w-100 align-items-center">
                      <b>Facebook</b>{" "}
                      {" " +
                        String(user.facebook).split("/")[
                          String(user.facebook).split("/").length - 1 === ""
                            ? String(user.facebook).split("/").length - 2
                            : String(user.facebook).split("/").length - 1
                        ]}
                    </p>
                  </div>

                  {/* Linkedin */}
                  <div className="row">
                    <p className=" monospace border-btm w-100 align-items-center">
                      <b>Linkedin</b>{" "}
                      {" " +
                        String(user.linkedin).split("/")[
                          String(user.linkedin).split("/").length - 1 === ""
                            ? String(user.linkedin).split("/").length - 1
                            : String(user.linkedin).split("/").length - 2
                        ]}
                    </p>
                  </div>
                  <Link
                    to="/update"
                    className="btn btn-dark d-block mx-auto profile-btn text-center"
                  >
                    Update
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-7">
              {treasury && <Treasury personTreasury={treasury} />}
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
  treasuryReducer: state.treasuryReducer,
});

export default withRouter(connect(mapStateToProps, { getTreasury })(Profile));
