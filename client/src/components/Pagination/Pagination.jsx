import React from "react";
import "./Pagination.css";

const Pagination = ({
  totalData,
  dataPerPage,
  setCurrentPage,
  currentPage,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
    pageNumbers.push(i);
  }
  const paginate = (number) => {
    setCurrentPage(number);
  };

  const prevHandler = () => {
    const prev = currentPage - 1;
    if (prev < 1) return;
    setCurrentPage(prev);
  };

  const nextHandler = () => {
    const next = currentPage + 1;
    if (next > pageNumbers.length) return;
    setCurrentPage(next);
  };

  return (
    <nav className="container">
      <ul className="page">
        <li>
          <a className="prev" onClick={() => prevHandler()}>
            Prev
          </a>
        </li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={
              number === currentPage ? "pageNumber active" : "pageNumber"
            }
            onClick={() => paginate(number)}
          >
            <a>{number}</a>
          </li>
        ))}
        <li>
          <a className="next" onClick={() => nextHandler()}>
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
