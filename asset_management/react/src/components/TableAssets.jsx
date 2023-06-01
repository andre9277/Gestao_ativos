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


All the changes made to enable the implementation of the desired development tools were made by André Ferreira.
*/

import React, { useState } from "react";
import { useStateContext } from "../context/ContextProvider.jsx";

const TableAssets = ({ toggleCheck, filteredAssets, startIndex, endIndex }) => {
  const { user } = useStateContext();

  const [loading, setLoading] = useState(false);

  return (
    <tbody>
      {/* Iteration between all assets */}
      {loading && (
        <tr>
          <td colSpan="5" className="lgText">
            A Carregar...
          </td>
        </tr>
      )}

      {!loading && filteredAssets.length === 0 ? (
        <tr>
          <td colSpan="5" className="lgTextF">
            Não existe(m) resultado(s) para o(s) filtro(s) selecionado(s)!
          </td>
        </tr>
      ) : !loading && filteredAssets.length > 20 ? (
        filteredAssets.slice(startIndex, endIndex).map((asset) => (
          <tr key={asset.id}>
            <td>{asset.category.name}</td>
            <td>{asset.brand.sig}</td>
            <td>{asset.modelo.name}</td>
            <td>{asset.numb_inv}</td>
            <td>{asset.numb_ser}</td>
            <td>{asset.entity.ent_name}</td>
            <td>{asset.units === null ? "" : asset.units.name}</td>
            <td>{asset.floor}</td>
            <td>{asset.ala}</td>
            <td>{asset.ci}</td>
            <td>
              {asset.state === "Ativo" ? (
                <div className="circle active"></div>
              ) : (
                <div className="circle inactive"></div>
              )}
            </td>
            <td>{asset.created_at}</td>

            {user.role_id === 3 ? null : (
              <td>
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={() => toggleCheck(asset.id)}
                  value={asset.checked}
                />
              </td>
            )}
          </tr>
        ))
      ) : (
        filteredAssets.map((a) => (
          <tr key={a.id}>
            <td>{a.category.name}</td>
            <td>{a.brand.sig}</td>
            <td>{a.modelo.name}</td>
            <td>{a.numb_inv}</td>
            <td>{a.numb_ser}</td>
            <td>{a.entity.ent_name}</td>
            <td>{a.units === null ? "" : a.units.name}</td>
            <td>{a.floor}</td>
            <td>{a.ala}</td>
            <td>{a.ci}</td>
            <td>
              {a.state === "Ativo" ? (
                <div className="circle active"></div>
              ) : (
                <div className="circle inactive"></div>
              )}
            </td>
            <td>{a.created_at}</td>

            {user.role_id === 3 ? null : (
              <td>
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={() => toggleCheck(a.id)}
                  value={a.checked}
                />
              </td>
            )}
          </tr>
        ))
      )}
    </tbody>
  );
};

export default TableAssets;
