import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams, Redirect, withRouter } from "react-router-dom";
import axios from "axios";
import Moment from "react-moment";
const Meeting = ({ authReducer: { user, isAuthenticated } }) => {
  const { id } = useParams();
  const getMeeting = async () => {
    const res = await axios.get(`/meetings/${id}`);
    setMeetings(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    getMeeting();
  }, []);

  const [meetings, setMeetings] = useState([]);

  if (user === null && isAuthenticated === false) {
    return <Redirect to="/login" />;
  }
  return (
    <div className="container-fluid add-user py-3">
      <div className="row ">
        <div className="col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-sm-8 offset-sm-2">
          <div className="card cardStyling">
            <div className="card-body">
              {meetings && (
                <Fragment>
                  <h2>{meetings.subject}</h2>
                  <p className="text-secondary">
                    <Moment format="YYYY/MM/DD">{meetings.date}</Moment> at{" "}
                    {meetings.time}
                  </p>
                  <a href={`${meetings.link}`}>{meetings.link}</a>
                  <br />
                  <p>who is coming?</p>
                  <ul className="list-group">
                    {meetings.coming ? (
                      meetings.coming.map((user) => (
                        <li className="list-group-item">
                          {user.firstName + " " + user.lastName}
                        </li>
                      ))
                    ) : (
                      <h2 className="text-center">No one is coming</h2>
                    )}
                  </ul>
                </Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
});

export default withRouter(connect(mapStateToProps, {})(Meeting));
