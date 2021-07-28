import React from "react";

const Treasury = ({ personTreasury }) => {
  return personTreasury ? (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Months</th>
          <th scope="col">Monthly (TK)</th>
          <th scope="col">Loan (TK)</th>
        </tr>
      </thead>
      <tbody>
        {personTreasury.map((treasury, index) => (
          <tr key={index}>
            <td>{treasury.month}</td>
            <td
              className={
                treasury.amount_status ? "paid text-light" : "unpaid text-light"
              }
            >
              {treasury.amount}
            </td>
            <td
              className={
                treasury.loan_status ? "paid text-light" : "unpaid text-light"
              }
            >
              {treasury.loan}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <h3 className="text-center h3 mt-3">
      {" "}
      Treasury <br />
      Loading...
    </h3>
  );
};

export default Treasury;
