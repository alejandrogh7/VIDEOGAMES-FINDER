import React from "react";

const Pagination = ({ totalData, dataPerPage, setCurrentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
    pageNumbers.push(i);
  }
  const paginate = (number) => {
    setCurrentPage(number);
  };

  return (
    <nav>
      {pageNumbers.map((number) => (
        <li key={number}>
          <ul onClick={() => paginate(number)}>{number}</ul>
        </li>
      ))}
    </nav>
  );
};

export default Pagination;
