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

const Filter = ({
  assets,
  users,
  filterSer,
  resetFilter,
  selectedSer,
  filterOp,
  selectedOp,
  filterUser,
  selectedUser,
  handleDwl,
}) => {
  return (
    <div className="filter">
      <h2 className="subTit-filter">Filtro:</h2>
      <p></p>
      <div className="filter-user">
        {/* Filter by the user */}
        <label className="lb-info-allocation">Utilizador:</label>
        <select value={selectedUser} onChange={filterUser} className="infoInp">
          <option value=""></option>
          {users.map((user) => (
            <option key={user.id} value={user.name}>
              {" "}
              {user.name}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-user">
        {/* Filter by the operation */}
        <label className="lb-info-allocation">Operação:</label>
        <select value={selectedOp} onChange={filterOp} className="infoInp">
          {" "}
          <option value=""></option>
          <option value="Pesquisa">Pesquisa</option>
          <option value="Atualiza">Atualiza</option>
          <option value="Apaga">Apaga</option>
          <option value="Adiciona">Adiciona</option>
        </select>
      </div>
      <div className="filter-user">
        {/* Filter by the inventory number */}
        <label className="lb-info-allocation">Nº inventário:</label>

        <select value={selectedSer} onChange={filterSer} className="infoInp">
          <option value=""></option>
          {/* Iterates in between all assets */}
          {assets.map((asset) => (
            <option key={asset.id} value={asset.numb_inv}>
              {" "}
              {asset.numb_inv}
            </option>
          ))}
        </select>
      </div>
      <p></p>
      <p></p>
      <div className="alloca-icons">
        {/* Download Button */}
        <button onClick={handleDwl} className="btn-dwl">
          Download
        </button>
        {/*  Clear Button */}
        <button onClick={resetFilter} className="btn-filter">
          Limpar
        </button>
      </div>
    </div>
  );
};

export default Filter;
