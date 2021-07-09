import React from "react";

const Alert = ({ alert, clearAlert }) => {
  return (
    <div
      className={`alert alert-${alert.type} alert-dismissible fade show w-100 `}
      role="alert"
    >
      {alert.msg}
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close"
        onClick={(e) => clearAlert()}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

export default Alert;
