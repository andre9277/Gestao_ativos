/* The MIT License (MIT)

Copyright (c) 2013-2023 Start Bootstrap LLC

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. 

You may obtain a copy of the license at:

      https://github.com/StartBootstrap/startbootstrap-sb-admin-2


Project developed under the EstágiAP XXI Program.
Advisor: Emanuel Gonçalves
Autor: André Ferreira
Local: Hospital de Braga, EPE
Department: Serviço de Sistema de Informação

All the changes made to enable the implementation of the desired development tools were made by André Ferreira.
*/
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

    // Define the number of pagination buttons to display
    const maxButtons = 5; // Adjust this value according to your needs

    // Calculate the start and end page numbers
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);

    // Adjust start and end page numbers if they exceed the valid range
    if (endPage - startPage + 1 < maxButtons) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

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
          <u>&nbsp;{i}&nbsp;</u>
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

    // Display page numbers within the defined range
    for (let i = startPage; i <= endPage; i++) {
      if (i > 2 && i < totalPages - 1) {
        const isActive = i === currentPage;
        const classNames = `pageNumber ${isActive ? "acctive" : "inacctive"}`;

        pageNumbers.push(
          <button
            key={`pageButton-${i}`}
            onClick={() => setCurrentPage(i)}
            className={classNames}
          >
            <u>&nbsp;{i}&nbsp;</u>
          </button>
        );
      }
    }

    // Display ellipsis if currentPage is less than totalPages - 3
    if (currentPage < totalPages - 3) {
      pageNumbers.push(
        <span key="ellipsis2" className="pageNumber ellipsis">
          <u>&nbsp;...&nbsp;</u>
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
            <u>&nbsp;{i}&nbsp;</u>
          </button>
        );
      }
    }

    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 shadow-md mt-4">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
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
        <div className="filternopag">
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
      </div>
    </div>
  );
};

export default Pagination;
