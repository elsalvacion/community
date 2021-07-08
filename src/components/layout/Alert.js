import React from "react";

const Alert = ({ alert, clearAlert }) => {
  return (
    <div
      className={`alert alert-${alert.type} alert-dismissible fade show col-lg-6 offset-lg-3`}
      role="alert"
    >
      {alert.msg}
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        onClick={(e) => clearAlert()}
      ></button>
    </div>
  );
};

export default Alert;
