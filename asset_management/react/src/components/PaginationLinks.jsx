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

const PaginationLinks = ({ meta, onPageClick }) => {
  function onClick(ev, link) {
    ev.preventDefault();

    //if url doesnt exist
    if (!link.url) {
      return;
    }
    onPageClick(link);
  }

  return (
    <div className="paginator-btn">
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 shadow-md mt-4">
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div className="results-pag">
            <p className="filternopag">
              Exibindo <span className="font-medium">{meta.from}</span> a{" "}
              <span className="font-medium">{meta.to}</span> de &nbsp;
              <span className="font-medium">{meta.total}</span> resultados
            </p>
          </div>
          <div className="filternopag">
            {meta.total > meta.per_page && (
              <nav aria-label="Pagination">
                {meta.links &&
                  meta.links.map((link, ind) => (
                    <a
                      href="#"
                      onClick={(ev) => onClick(ev, link)}
                      key={ind}
                      aria-current="page"
                      className={
                        "relative z-10 inline-flex items-center border   px-4 py-2 text-sm font-medium focus:z-20 hover:bg-gray-50 " +
                        (ind === 0 ? "rounded-l-md " : "") +
                        (ind === meta.links.length - 1 ? "rounded-r-md " : "") +
                        (link.active ? "border-indigo-500 bg-indigo-50 " : "")
                      }
                      dangerouslySetInnerHTML={{ __html: link.label }}
                    ></a>
                  ))}
              </nav>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaginationLinks;
