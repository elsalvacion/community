import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, Redirect, withRouter } from "react-router-dom";
import Alert from "../layout/Alert";
import axios from "axios";
import Moment from "react-moment";

const AllMeetings = ({ authReducer: { user, loading, isAuthenticated } }) => {
  const getMeetings = async () => {
    const res = await axios.get("/meetings");
    setMeetings(res.data);
  };

  useEffect(() => {
    getMeetings();
  }, []);

  const [meetings, setMeetings] = useState([]);

  const [remove, setRemove] = useState(null);

  const [alert, setAlert] = useState({
    type: null,
    msg: null,
  });

  const clearAlert = () => {
    setAlert({
      type: null,
      msg: null,
    });
  };

  const removeUser = () => {
    // if (remove) {
    //   deleteUser(remove);
    //   setAlert({
    //     type: "success",
    //     msg: "User deleted",
    //   });
    //   document.getElementById("filterField").value = "";
    // }
  };

  if (loading) return <h2 className="text-center h2">Loading ...</h2>;
  if (user === null && isAuthenticated === false) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container-fluid ">
      {user && (
        <Fragment>
          <div className="container">
            {alert.type && <Alert alert={alert} clearAlert={clearAlert} />}
            {meetings.length > 0 ? (
              <Fragment>
                <h2 className="h2 text-center">Scheduled Meetings</h2>
                <table className="table table-hover table-bordered">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">Date</th>
                      <th scope="col">Subject</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {meetings.map((meeting) => (
                      <tr key={meeting._id}>
                        <td>
                          <Moment format="YYYY/MM/DD">{meeting.date}</Moment>
                        </td>
                        <td>{meeting.subject}</td>
                        <td>
                          <Link
                            to={`/meeting/${meeting._id}`}
                            className="btn btn-dark"
                          >
                            More
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Fragment>
            ) : (
              <h2 className="text-center my-1">No Scheduled Meetings</h2>
            )}
          </div>

          {/* confirmation modal */}
          <div
            className="modal fade"
            id="deleteConfirm"
            tabIndex="-1"
            role="dialog"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-body">Are you sure?</div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => removeUser()}
                    data-dismiss="modal"
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
});

export default withRouter(connect(mapStateToProps, {})(AllMeetings));
