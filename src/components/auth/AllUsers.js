import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, Redirect, withRouter } from "react-router-dom";
import { getAllUser, filterUsers, deleteUser } from "../../actions/userAction";
import Alert from "../layout/Alert";
const AllUsers = ({
  authReducer: { user, loading, isAuthenticated, allUsers, filtered },
  getAllUser,
  filterUsers,
  deleteUser,
}) => {
  useEffect(() => {
    user && getAllUser();
    // eslint-disable-next-line
  }, []);
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

  const handleChange = (e) => {
    filterUsers(e.target.value);
  };

  const removeUser = () => {
    if (remove) {
      deleteUser(remove);
      setAlert({
        type: "success",
        msg: "User deleted",
      });
      document.getElementById("filterField").value = "";
    }
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
            <h2 className="h2 text-center">All User</h2>
            <input
              required
              id="filterField"
              type="text"
              className="form-control d-block w-100 my-2"
              onChange={(e) => handleChange(e)}
              placeholder="Filter by name, programme or role"
            />
            {alert.type && <Alert alert={alert} clearAlert={clearAlert} />}
            <table className="table table-hover">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Role</th>
                  <th scope="col">Programme</th>
                  <th scope="col">Profile</th>
                  {user.role.toLowerCase() === "executive" && (
                    <th scope="col">Remove</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {allUsers &&
                  (filtered &&
                  document.getElementById("filterField").value !== "" ? (
                    filtered.length > 0 ? (
                      filtered.map((u) => (
                        <tr key={u.id}>
                          <td>{u.firstName + " " + u.lastName}</td>
                          <td>
                            {String(u.role).charAt(0).toUpperCase() +
                              String(u.role).slice(1)}
                          </td>
                          <td>{u.programme}</td>
                          <td>
                            <Link
                              to={`/profile/${u.id}`}
                              className="btn btn-dark"
                            >
                              View
                            </Link>
                          </td>

                          {user.role.toLowerCase() === "executive" && (
                            <td>
                              <button
                                className="btn btn-danger"
                                data-toggle="modal"
                                data-target="#deleteConfirm"
                                onClick={(e) => setRemove(u)}
                              >
                                Delete
                              </button>
                            </td>
                          )}
                        </tr>
                      ))
                    ) : (
                      <tr className="h3 text-center">
                        <td colSpan="5">No Match</td>
                      </tr>
                    )
                  ) : (
                    allUsers.map((u) => (
                      <tr key={u.id}>
                        <td>{u.firstName + " " + u.lastName}</td>
                        <td>
                          {String(u.role).charAt(0).toUpperCase() +
                            String(u.role).slice(1)}
                        </td>
                        <td>{u.programme}</td>
                        <td>
                          <Link
                            to={`/selecteduser/${u.id}`}
                            className="btn btn-dark"
                          >
                            View
                          </Link>
                        </td>

                        {user.role.toLowerCase() === "executive" && (
                          <td>
                            <button
                              className="btn btn-danger"
                              data-toggle="modal"
                              data-target="#deleteConfirm"
                              onClick={(e) => setRemove(u)}
                            >
                              Delete
                            </button>
                          </td>
                        )}
                      </tr>
                    ))
                  ))}
              </tbody>
            </table>
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
  treasuryReducer: state.treasuryReducer,
});

export default withRouter(
  connect(mapStateToProps, { getAllUser, filterUsers, deleteUser })(AllUsers)
);
