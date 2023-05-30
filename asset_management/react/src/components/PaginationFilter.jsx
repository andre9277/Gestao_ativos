import React from "react";

const Pagination = ({
  currentPage,
  setCurrentPage,
  resultsPerPage,
  totalResults,
}) => {
  const totalPages = Math.ceil(totalResults / resultsPerPage);
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = Math.min(startIndex + resultsPerPage, totalResults);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (endIndex < totalResults) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    // Display first two pages
    for (let i = 1; i <= 2 && i <= totalPages; i++) {
      const isActive = i === currentPage;
      const classNames = `pageNumber ${isActive ? "acctive" : "inacctive"}`;

      pageNumbers.push(
        <button
          key={`pageButton-${i}`}
          onClick={() => setCurrentPage(i)}
          className={classNames}
        >
          &nbsp; {i} &nbsp;
        </button>
      );
    }

    // Display ellipsis if currentPage is more than 4
    if (currentPage > 4) {
      pageNumbers.push(
        <span key="ellipsis1" className="pageNumber ellipsis">
          &nbsp;...&nbsp;
        </span>
      );
    }

    // Display page numbers from currentPage - 2 to currentPage + 2
    for (let i = currentPage - 2; i <= currentPage + 2; i++) {
      if (i > 2 && i < totalPages - 1) {
        const isActive = i === currentPage;
        const classNames = `pageNumber ${isActive ? "acctive" : "inacctive"}`;

        pageNumbers.push(
          <button
            key={`pageButton-${i}`}
            onClick={() => setCurrentPage(i)}
            className={classNames}
          >
            &nbsp;{i}&nbsp;
          </button>
        );
      }
    }

    // Display ellipsis if currentPage is less than totalPages - 3
    if (currentPage < totalPages - 3) {
      pageNumbers.push(
        <span key="ellipsis2" className="pageNumber ellipsis">
          &nbsp;...&nbsp;
        </span>
      );
    }

    // Display last two pages
    for (let i = totalPages - 1; i <= totalPages; i++) {
      if (i > currentPage + 2) {
        const isActive = i === currentPage;
        const classNames = `pageNumber ${isActive ? "acctive" : "inacctive"}`;

        pageNumbers.push(
          <button
            key={`pageButton-${i}`}
            onClick={() => setCurrentPage(i)}
            className={classNames}
          >
            &nbsp;{i}&nbsp;
          </button>
        );
      }
    }
    //i dont want to replace anything from style1, i want to get adapt the style1 from the first page to the style2
    return pageNumbers;
  };

  return (
    <div className="PagFilterCont">
      <div className="results-pag">
        <p className="filternopag">
          Exibindo{" "}
          <span className="font-medium">
            <b>{startIndex + 1}</b>
          </span>{" "}
          a{" "}
          <span className="font-medium">
            {" "}
            <b>{endIndex} </b>
          </span>{" "}
          de &nbsp;
          <span className="font-medium">
            <b>{totalResults}</b>
          </span>{" "}
          resultados
        </p>
      </div>

      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className="pagFilter"
      >
        « Anterior&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </button>
      {renderPageNumbers()}
      <button
        onClick={handleNextPage}
        disabled={endIndex >= totalResults}
        className="pagFilter"
      >
        Seguinte »
      </button>
    </div>
  );
};

export default Pagination;
