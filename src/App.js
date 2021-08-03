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
import MonthlyPayment from "./components/treasury/MonthlyPayment";
import LoanPayment from "./components/treasury/LoanPayment";
import SideNav from "./components/layout/SideNav";
import { useEffect } from "react";
import AllUsers from "./components/auth/AllUsers";
import CurrentProfile from "./components/layout/CurrentProfile";
const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="mb-3">
          <Navbar />
        </div>
        <SideNav />

        <Switch>
          <Route exact path="/">
            <HomePrivate />
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
          <Route exact path="/profile/:id">
            <CurrentProfile />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/add-user">
            <AddUser />
          </Route>
          <Route exact path="/all-users">
            <AllUsers />
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
  );
};

export default App;
