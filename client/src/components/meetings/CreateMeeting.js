import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, Redirect, withRouter } from "react-router-dom";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import Stack from "@mui/material/Stack";
import axios from "axios";

const CreateMeeting = ({ authReducer: { user, isAuthenticated } }) => {
  const [value, setValue] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [done, setDone] = useState(false);

  const [meeting, setMeeting] = useState({
    subject: "",
    date: "",
    link: "",
    time: "",
  });

  if (user === null && isAuthenticated === false) {
    return <Redirect to="/login" />;
  }

  const sendEmail = async () => {
    if (meeting.date !== "" && meeting.subject !== "") {
      setLoading(true);
      const res = await axios.post("/meetings", meeting, {
        "Content-Type": "application/json",
      });

      if (res.status !== 200) {
        setSendError(true);
      } else {
        setLoading(false);
      }
    }
  };

  return (
    <div className="col-sm-12 col-md-6 container">
      <div className=" card card-body">
        <h2 className="h2 text-center">Create Meeting</h2>
        {loading ? (
          <h2 className="text-center">Sending....</h2>
        ) : (
          <Fragment>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                className="form-control"
                type="text"
                id="subject"
                placeholder="Subject"
                value={meeting.subject}
                onChange={(e) =>
                  setMeeting({ ...meeting, subject: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label htmlFor="time">Time</label>
              <input
                className="form-control"
                type="text"
                id="time"
                placeholder="Time (18:30)"
                value={meeting.time}
                onChange={(e) =>
                  setMeeting({ ...meeting, time: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label htmlFor="link">Meeting Link</label>
              <input
                className="form-control"
                type="text"
                id="link"
                placeholder="Link"
                value={meeting.link}
                onChange={(e) =>
                  setMeeting({ ...meeting, link: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>Meeting Date</label>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                  <DatePicker
                    disableFuture
                    views={["year", "month", "day"]}
                    value={meeting.date}
                    onChange={(newValue) => {
                      setMeeting({
                        ...meeting,
                        date: newValue,
                      });
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
            </div>

            <button
              onClick={sendEmail}
              className="btn btn-dark my-3 d-block w-100 register-btn"
            >
              Send
            </button>
          </Fragment>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
});

export default withRouter(connect(mapStateToProps, {})(CreateMeeting));
