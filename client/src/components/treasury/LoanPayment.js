import React, { Fragment, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import Alert from "../layout/Alert";
const LoanPayment = ({ authReducer: { user, isAuthenticated } }) => {
  const [pay, setPay] = useState(null);

  const [confirm, setConfirm] = useState({
    next: false,
    secret: "",
  });

  const [alert, setAlert] = useState({
    type: null,
    msg: null,
  });

  const [current, setCurrent] = useState(null);

  const clearAlert = () => {
    setAlert({
      type: null,
      msg: null,
    });
  };

  const handleConfirm = (e) => {
    setConfirm({
      ...confirm,
      [e.target.name]: e.target.value,
    });
  };

  const checkSecret = async (e) => {
    e.preventDefault();
    let found = false;
    if (confirm.secret === "") {
      setAlert({
        type: "danger",
        msg: "Secret field is required",
      });
    } else {
      const res = await axios.get("/secrets");
      if (res.data.length === 0) {
        setAlert({
          type: "danger",
          msg: "Secret doesn't exist",
        });
      } else {
        res.data.forEach((secret) => {
          if (Number(confirm.secret) === secret.secret) found = true;
        });

        if (found) {
          setConfirm({
            ...confirm,
            next: true,
          });

          getMonthlyContribution();
        } else {
          setAlert({
            type: "danger",
            msg: "Secret doesn't exist",
          });
        }
      }
    }
  };

  const getMonthlyContribution = async () => {
    const res = await axios.get("/treasury");
    res.data.forEach((treasury) => {
      if (treasury.secret === confirm.secret) {
        setPay(treasury);
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loanField = document.querySelector("#loan");
    if (loanField.value === "") {
      window.scroll({ top: 0, left: 0 });
      setAlert({
        type: "danger",
        msg: "Change Loan field is empty",
      });
    } else {
      setCurrent({
        ...current,
        loan: Number(current.loan) + Number(loanField.value),
      });
      // console.log(pay);
      pay.months.forEach((month) => {
        if (month.month === current.month) {
          month.loan = Number(current.loan) + Number(loanField.value);
        }
        return month;
      });

      loanField.value = "";
      await axios.put(`/treasury/${pay._id}`, pay, {
        "Content-Type": "application/json",
      });
      window.scroll({ top: 0, left: 0 });
      setAlert({
        type: "success",
        msg: " Sucessfully Updated",
      });
    }
  };

  const goBack = () => {
    clearAlert();
    setPay(null);
    setConfirm({
      next: false,
      secret: "",
    });
  };

  if (user === null && isAuthenticated === false)
    return <Redirect to="/login" />;
  return (
    <div className="container-fluid login py-1">
      {confirm.next && (
        <div className="p-2" onClick={() => goBack()}>
          <i className="fas fa-arrow-left back change-to-cursor "></i>
        </div>
      )}
      <div className="row ">
        <div className="col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-sm-8 offset-sm-2">
          {confirm.next ? (
            <Fragment>
              <h3 className="text-center h3 my-2">Loan</h3>
              {pay && (
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Months</th>
                      <th scope="col">Amount (TK)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pay.months.map((treasury, index) => (
                      <tr key={index}>
                        <td>{treasury.month}</td>
                        <td
                          className={
                            treasury.loan <= 0
                              ? "paid text-light change-to-cursor"
                              : "unpaid text-light change-to-cursor"
                          }
                          data-toggle="modal"
                          data-target="#changeLoan"
                          onClick={(e) => setCurrent(treasury)}
                        >
                          {treasury.loan}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </Fragment>
          ) : (
            <div className="card cardStyling">
              <div className="card-body">
                <form onSubmit={(e) => checkSecret(e)}>
                  <h1 className="h1 text-center mb-3">Personal Secret</h1>
                  {alert.type && (
                    <Alert alert={alert} clearAlert={clearAlert} />
                  )}

                  <div className="row my-2">
                    <div className="col">
                      <input
                        type="password"
                        className="form-control my-2"
                        name="secret"
                        value={confirm.secret}
                        placeholder="Enter Personal Secret"
                        onChange={(e) => handleConfirm(e)}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="row my-2">
                    <div className="col">
                      <button
                        className="btn w-100 d-block text-light btn-addPayment"
                        onChange={(e) => checkSecret(e)}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Modal */}

          {current && (
            <div
              className="modal fade"
              id="changeLoan"
              tabIndex="-1"
              role="dialog"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                      onClick={() => clearAlert()}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <form action="">
                      {alert.type && (
                        <Alert alert={alert} clearAlert={clearAlert} />
                      )}

                      <h3>{current.month}</h3>
                      <label className="my-2" htmlFor="current-loan">
                        Current Loan
                      </label>
                      <input
                        type="number"
                        name="current-loan"
                        id="current-loan"
                        className="form-control my-2"
                        disabled
                        value={current.loan}
                      />
                      <label className="my-2" htmlFor="loan">
                        Change Loan
                      </label>
                      <input
                        type="number"
                        name="loan"
                        id="loan"
                        className="form-control my-2"
                      />
                      <button
                        type="submit"
                        className="btn w-100 d-block btn-addPayment text-light my-2"
                        onClick={(e) => handleSubmit(e)}
                      >
                        Change
                      </button>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-addPayment text-light"
                      data-dismiss="modal"
                      onClick={() => clearAlert()}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
});

export default withRouter(connect(mapStateToProps, {})(LoanPayment));
