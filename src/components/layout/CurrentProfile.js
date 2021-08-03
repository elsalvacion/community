import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter, Link, useParams } from "react-router-dom";
import defaultImg from "../../assets/default-picture.jpg";
import Treasury from "../treasury/Treasury";
import axios from "axios";
const CurrentProfile = ({
  authReducer: { user, loading, isAuthenticated },
}) => {
  const { id } = useParams();
  const [usr, setUsr] = useState(null);
  const [treasury, setTreasury] = useState(null);
  useEffect(() => {
    getSingleUser();

    // eslint-disable-next-line
  }, []);

  const getSingleUser = async () => {
    const userResponse = await axios.get(`/users/${id}`);

    setUsr(userResponse.data);
  };

  const getTreasury = async () => {
    const treasuryResponse = await axios.get(`/treasury`);

    const tr = treasuryResponse.data.filter((data) => {
      if (Number(data.secret) === usr.secret) {
        return data.months;
      }
      return null;
    });
  };

  if (loading) return <h2 className="text-center h2">Loading ...</h2>;
  if (user === null && isAuthenticated === false) {
    return <Redirect to="/login" />;
  }
  return (
    <div className="container-fluid profile-bg">
      {usr && (
        <Fragment>
          <div className="row">
            <div className="col-md-3 bg-dark card text-light">
              <div className="card-body">
                <div className="text-center">
                  <img
                    src={defaultImg}
                    className="mx-auto d-block my-2 profile"
                    alt={`${usr.firstName} ${usr.lastName}`}
                  />
                </div>
                <button className="btn btn-dark d-block mx-auto profile-btn text-center mb-3">
                  Change
                </button>
                <div className="p-1 text-left">
                  {/* Secret */}
                  <div className="row">
                    <p className=" monospace border-btm w-100">
                      <b>Secret:</b> {" " + usr.secret}
                    </p>
                  </div>

                  {/* Name */}
                  <div className="row">
                    <p className=" monospace border-btm w-100">
                      <b>Name:</b> {" " + usr.firstName + " " + usr.lastName}
                    </p>
                  </div>

                  {/* Programme */}
                  <div className="row">
                    <p className=" monospace border-btm w-100">
                      <b>Programme:</b> {" " + usr.programme}
                    </p>
                  </div>

                  {/* Admitted */}
                  <div className="row">
                    <p className=" monospace border-btm w-100">
                      <b>Admission Year:</b> {" " + usr.admitted}
                    </p>
                  </div>

                  {/* Graduation */}
                  <div className="row">
                    <p className=" monospace border-btm w-100">
                      <b>
                        {new Date().getFullYear() < Number(usr.graduation)
                          ? "Expected Graduation"
                          : "Graduation"}{" "}
                        Year:
                      </b>{" "}
                      {" " + usr.graduation}
                    </p>
                  </div>

                  {/* WhatsApp */}
                  <div className="row">
                    <p className=" monospace border-btm w-100">
                      <b>WhatsApp:</b> {" " + usr.whatsapp}
                    </p>
                  </div>

                  {/* Emergency */}
                  <div className="row">
                    <p className=" monospace border-btm w-100">
                      <b>Emergency:</b> {" " + usr.emergency}
                    </p>
                  </div>

                  {/* Facebook */}
                  <div className="row">
                    <p className=" monospace border-btm w-100 align-items-center">
                      <b>Facebook</b>{" "}
                      {" " +
                        String(usr.facebook).split("/")[
                          String(usr.facebook).split("/").length - 1 === ""
                            ? String(usr.facebook).split("/").length - 2
                            : String(usr.facebook).split("/").length - 1
                        ]}
                    </p>
                  </div>

                  {/* Linkedin */}
                  <div className="row">
                    <p className=" monospace border-btm w-100 align-items-center">
                      <b>Linkedin</b>{" "}
                      {" " +
                        String(usr.linkedin).split("/")[
                          String(usr.linkedin).split("/").length - 1 === ""
                            ? String(usr.linkedin).split("/").length - 1
                            : String(usr.linkedin).split("/").length - 2
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
            <div className="col-md-6">
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

export default withRouter(connect(mapStateToProps, {})(CurrentProfile));
