import React, { Fragment, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import Alert from "../layout/Alert";
const MonthlyPayment = ({ authReducer: { user, isAuthenticated } }) => {
  const [pay, setPay] = useState(null);

  const [confirm, setConfirm] = useState({
    next: false,
    secret: "",
  });

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

  const handleConfirm = (e) => {
    setConfirm({
      ...confirm,
      [e.target.name]: e.target.value,
    });
  };

  const handlePay = (e) => {
    setPay({
      ...pay,
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
      const res = await axios.get("/secret-keys");
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

  const changeStatus = (current) => {
    const changeTreasury = pay.months.map((treasury) => {
      if (current.month === treasury.month) {
        return {
          month: current.month,
          amount: 100,

          amount_status: !treasury.amount_status,
        };
      } else return treasury;
    });

    setPay({
      ...pay,
      months: changeTreasury,
    });
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
    if (confirm.secret !== pay.secret) {
      window.scroll({ top: 0, left: 0 });
      setAlert({
        type: "danger",
        msg: "Wrong Secret",
      });
    } else {
      await axios.put(`/treasury/${pay.id}`, pay, {
        "Content-Type": "application/json",
      });
      window.scroll({ top: 0, left: 0 });
      setAlert({
        type: "success",
        msg: "Conyribution Sucessfully Updated",
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
        <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1">
          {confirm.next ? (
            <form onSubmit={(e) => handleSubmit(e)}>
              <h3 className="text-center h3 my-2">Monthly Contribution</h3>
              {alert.type && <Alert alert={alert} clearAlert={clearAlert} />}
              {pay && (
                <Fragment>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Months</th>
                        <th scope="col">Amount (TK)</th>
                        <th scope="col">Change</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pay.months.map((treasury, index) => (
                        <tr key={index}>
                          <td>{treasury.month}</td>
                          <td
                            className={
                              treasury.amount_status
                                ? "paid text-light"
                                : "unpaid text-light"
                            }
                          >
                            {treasury.amount}
                          </td>
                          <td className="d-flex justify-content-center">
                            {treasury.amount_status ? (
                              <i
                                className="fas fa-times m-2 text-danger change-to-cursor"
                                onClick={() => changeStatus(treasury)}
                              ></i>
                            ) : (
                              <i
                                className="fas fa-check m-2 text-success change-to-cursor"
                                onClick={() => changeStatus(treasury)}
                              ></i>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="row my-2">
                    <div className="col">
                      <label className="mr-sm-2" htmlFor="secret">
                        Confirmation Secret
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        name="secret"
                        id="secret"
                        placeholder="Personal Secret"
                        autoComplete="off"
                        value={pay.secret}
                        onChange={(e) => handlePay(e)}
                      />
                    </div>
                  </div>

                  <div className="row my-2">
                    <div className="col">
                      <button
                        className="btn w-100 d-block text-light btn-addPayment"
                        onChange={(e) => handleSubmit(e)}
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                </Fragment>
              )}
            </form>
          ) : (
            <form onSubmit={(e) => checkSecret(e)}>
              <h1 className="h1 text-center mb-3">Personal Secret</h1>
              {alert.type && <Alert alert={alert} clearAlert={clearAlert} />}

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
          )}
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
});

export default withRouter(connect(mapStateToProps, {})(MonthlyPayment));
