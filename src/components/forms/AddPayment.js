import React, { Fragment, useState } from "react";
import { Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
// import { addUser } from "../../actions/userAction";
import Alert from "../layout/Alert";
import Treasury from "../treasury/Treasury";
import MonthlyPayment from "../treasury/MonthlyPayment";

const AddPayment = ({ authReducer: { user, isAuthenticated } }) => {
  const [pay, setPay] = useState({
    type: "monthly",
    amount: "",
    months: [
      {
        month: "Jan",
        amount: 100,
        loan: 0,
        amount_status: false,
        loan_status: true,
      },
      {
        month: "Feb",
        amount: 100,
        loan: 0,
        amount_status: false,
        loan_status: true,
      },
      {
        month: "Mar",
        amount: 100,
        loan: 0,
        amount_status: false,
        loan_status: true,
      },
      {
        month: "Apr",
        amount: 100,
        loan: 0,
        amount_status: false,
        loan_status: true,
      },
      {
        month: "May",
        amount: 100,
        loan: 0,
        amount_status: false,
        loan_status: true,
      },
      {
        month: "June",
        amount: 100,
        loan: 0,
        amount_status: false,
        loan_status: true,
      },
      {
        month: "July",
        amount: 100,
        loan: 0,
        amount_status: false,
        loan_status: true,
      },
      {
        month: "Aug",
        amount: 100,
        loan: 0,
        amount_status: false,
        loan_status: true,
      },
      {
        month: "Sept",
        amount: 100,
        loan: 0,
        amount_status: false,
        loan_status: true,
      },
      {
        month: "Oct",
        amount: 100,
        loan: 150,
        amount_status: false,
        loan_status: false,
      },
      {
        month: "Nov",
        amount: 100,
        loan: 0,
        amount_status: false,
        loan_status: true,
      },
      {
        month: "Dec",
        amount: 100,
        loan: 0,
        amount_status: false,
        loan_status: true,
      },
    ],
    secret: "",
  });

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

  const handleChange = (e) => {
    setPay({
      ...pay,
      [e.target.name]: e.target.value,
    });
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
        } else {
          setAlert({
            type: "danger",
            msg: "Secret doesn't exist",
          });
        }
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  if (user === null && isAuthenticated === false)
    return <Redirect to="/login" />;
  return (
    <div className="container-fluid login py-3">
      <div className="row ">
        <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1">
          {confirm.next ? (
            <form
              className="p-2"
              onSubmit={(e) => handleSubmit(e)}
              autoComplete="off"
            >
              <h1 className="h1 text-center mb-3">Add Payment</h1>
              {alert.type && <Alert alert={alert} clearAlert={clearAlert} />}

              <div className="row my-2">
                <div className="col">
                  <label htmlFor="type">Months</label>
                  {/* {pay.months.map((treasury, i) => (
                    <PaymentMonths key={i} treasury={treasury} />
                  ))} */}
                  <MonthlyPayment personTreasury={pay.months} />
                </div>
              </div>

              <div className="row my-2">
                <div className="col">
                  <label className="mr-sm-2" htmlFor="amount">
                    Amount
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="amount"
                    id="amount"
                    placeholder="Enter Amount"
                    value={pay.amount}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>

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
                    autoComplete="false"
                    value={pay.secret}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>

              <div className="row my-2">
                <div className="col">
                  <button
                    type="submit"
                    className="btn w-100 d-block text-light btn-addPayment"
                  >
                    Add
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <form onSubmit={(e) => checkSecret(e)} autoComplete="off">
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
                    onChange={(e) => handleChange(e)}
                    autoComplete="false"
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

export default withRouter(connect(mapStateToProps, {})(AddPayment));
