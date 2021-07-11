import React from "react";

const Treasury = () => {
  const personTreasury = [
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
      loan: 0,
      amount_status: false,
      loan_status: true,
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
  ];

  return (
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
  );
};

export default Treasury;
