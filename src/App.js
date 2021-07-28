import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Navbar from "./components/layout/Navbar";
import AddUser from "./components/forms/AddUser";
import RegisterCheck from "./components/forms/RegisterCheck";
import Register from "./components/forms/Register";
import Login from "./components/forms/Login";
import Profile from "./components/layout/Profile";
import HomePrivate from "./components/private/HomePrivate";
import ChangePass from "./components/forms/ChangePass";
import UpdateDetails from "./components/forms/UpdateDetails";
import AddPayment from "./components/forms/AddPayment";
import MonthlyPayment from "./components/treasury/MonthlyPayment";
import LoanPayment from "./components/treasury/LoanPayment";
const App = () => {
  return (
    <div className="bg-light text-dark">
      <Provider store={store}>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <HomePrivate />
            </Route>

            {/* Payment */}
            <Route exact path="/payment">
              <AddPayment />
            </Route>

            <Route exact path="/monthly">
              <MonthlyPayment />
            </Route>

            <Route exact path="/loan">
              <LoanPayment />
            </Route>

            {/* User */}
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/add-user">
              <AddUser />
            </Route>
            <Route exact path="/register-check">
              <RegisterCheck />
            </Route>
            <Route exact path="/register/:id">
              <Register />
            </Route>
            <Route exact path="/change-password">
              <ChangePass />
            </Route>
            <Route exact path="/update">
              <UpdateDetails />
            </Route>
          </Switch>
        </Router>
      </Provider>
    </div>
  );
};

export default App;
