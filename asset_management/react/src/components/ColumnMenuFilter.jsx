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

//Component that allows the filter by column
const ColumnMenuFilter = ({
  titulo,
  tituloF,
  sorting,
  sortingFilter,
  order,
  orderFilter,
  filtered,
}) => {
  //handleSort by the title withput filter
  const handleSort = () => {
    sorting(titulo);
  };

  //Sorting of the filter via the title of each column with filter On
  const handleSortFilter = () => {
    sortingFilter(tituloF);
  };

  return (
    <div>
      {/* if the filter is true handle the sortfilter function */}
      {filtered === true ? (
        <span onClick={handleSortFilter} className="simb-tb">
          {tituloF}
          {orderFilter === "ASC" ? " ▲" : " ▼"}{" "}
        </span>
      ) : (
        /* if there is no filter, use the handleSort*/
        <span onClick={handleSort} className="simb-tb">
          {titulo}
          {order === "ASC" ? " ▲" : " ▼"}{" "}
        </span>
      )}
    </div>
  );
};

export default ColumnMenuFilter;
