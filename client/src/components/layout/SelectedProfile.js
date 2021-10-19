import React, { Fragment } from "react";
import { connect } from "react-redux";
import {
  Redirect,
  withRouter,
  Link,
  useParams,
  useHistory,
} from "react-router-dom";
import defaultImg from "../../assets/default-picture.jpg";
import Treasury from "../treasury/Treasury";

import { useEffect } from "react";
import { getSelectedUser } from "../../actions/userAction";
const SelectedProfile = ({
  authReducer: { user, loading, isAuthenticated, selectedUser },
  treasuryReducer: { currentTreasury },
  getSelectedUser,
}) => {
  const { id } = useParams();
  useEffect(() => {
    getSelectedUser(id);
    // eslint-disable-next-line
  }, []);

  const history = useHistory();
  if (loading) return <h2 className="text-center h2">Loading ...</h2>;
  if (user === null && isAuthenticated === false) {
    return <Redirect to="/login" />;
  }
  return (
    <div className="container-fluid profile-bg">
      {selectedUser && (
        <Fragment>
          <div className="row">
            <div className="p-2" onClick={() => history.push("/all-users")}>
              <i className="fas fa-arrow-left back change-to-cursor "></i>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 bg-dark card text-light">
              <div className="card-body">
                <div className="text-center">
                  <img
                    src={defaultImg}
                    className="mx-auto d-block my-2 profile"
                    alt={`${selectedUser.user.firstName} ${selectedUser.user.lastName}`}
                  />
                </div>
                <button className="btn btn-dark d-block mx-auto profile-btn text-center mb-3">
                  Change
                </button>
                <div className="p-1 text-left">
                  {/* Secret */}
                  <div className="row">
                    <p className=" monospace border-btm w-100">
                      <b>Secret:</b> {" " + selectedUser.user.secret}
                    </p>
                  </div>

                  {/* Name */}
                  <div className="row">
                    <p className=" monospace border-btm w-100">
                      <b>Name:</b>{" "}
                      {" " +
                        selectedUser.user.firstName +
                        " " +
                        selectedUser.user.lastName}
                    </p>
                  </div>

                  {/* Programme */}
                  <div className="row">
                    <p className=" monospace border-btm w-100">
                      <b>Programme:</b> {" " + selectedUser.user.programme}
                    </p>
                  </div>

                  {/* Admitted */}
                  <div className="row">
                    <p className=" monospace border-btm w-100">
                      <b>Admission Year:</b> {" " + selectedUser.user.admitted}
                    </p>
                  </div>

                  {/* Graduation */}
                  <div className="row">
                    <p className=" monospace border-btm w-100">
                      <b>
                        {new Date().getFullYear() <
                        Number(selectedUser.user.graduation)
                          ? "Expected Graduation"
                          : "Graduation"}{" "}
                        Year:
                      </b>{" "}
                      {" " + selectedUser.user.graduation}
                    </p>
                  </div>

                  {/* WhatsApp */}
                  <div className="row">
                    <p className=" monospace border-btm w-100">
                      <b>WhatsApp:</b> {" " + selectedUser.user.whatsapp}
                    </p>
                  </div>

                  {/* Emergency */}
                  <div className="row">
                    <p className=" monospace border-btm w-100">
                      <b>Emergency:</b> {" " + selectedUser.user.emergency}
                    </p>
                  </div>

                  {/* Facebook */}
                  <div className="row">
                    <p className=" monospace border-btm w-100 align-items-center">
                      <b>Facebook</b>{" "}
                      {" " +
                        String(selectedUser.user.facebook).split("/")[
                          String(selectedUser.user.facebook).split("/").length -
                            1 ===
                          ""
                            ? String(selectedUser.user.facebook).split("/")
                                .length - 2
                            : String(selectedUser.user.facebook).split("/")
                                .length - 1
                        ]}
                    </p>
                  </div>

                  {/* Linkedin */}
                  <div className="row">
                    <p className=" monospace border-btm w-100 align-items-center">
                      <b>Linkedin</b>{" "}
                      {" " +
                        String(selectedUser.user.linkedin).split("/")[
                          String(selectedUser.user.linkedin).split("/").length -
                            1 ===
                          ""
                            ? String(selectedUser.user.linkedin).split("/")
                                .length - 1
                            : String(selectedUser.user.linkedin).split("/")
                                .length - 2
                        ]}
                    </p>
                  </div>
                  <Link
                    to="/update-selected-user"
                    className="btn btn-dark d-block mx-auto profile-btn text-center"
                  >
                    Update
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-7">
              {selectedUser && (
                <Treasury personTreasury={selectedUser.treasury} />
              )}
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

export default withRouter(
  connect(mapStateToProps, { getSelectedUser })(SelectedProfile)
);
