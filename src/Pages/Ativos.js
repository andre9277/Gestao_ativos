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
import React from "react";
import { Link } from "react-router-dom";

const Ativos = () => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Ativos</h1>
        <Link className="btn-add" to="/users/new">
          Adicionar Ativo
        </Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>NºInventário</th>
              <th>NºSérie</th>
              <th>Localização</th>
              <th>Piso</th>
              <th>Ala</th>
              <th>CI</th>
              <th>Data de aquisição</th>
              <th>Estado</th>
              <th>Condição</th>
            </tr>
          </thead>

          {true && (
            <tbody>
              <tr>
                <td>1</td>
                <td>Hp</td>
                <td>HN70-N</td>
                <td>1540</td>
                <td>S/N:812L102L10</td>
                <td>Hospital de Braga</td>
                <td>2º</td>
                <td>C</td>
                <td>CI92381</td>
                <td>10-01-2018</td>
                <th>Ativo</th>
                <th>Usado</th>
                <td>
                  <Link className="btn-edit">Editar</Link>
                  &nbsp;
                  <button className="btn-delete">Eliminar</button>
                </td>
              </tr>

              <tr>
                <td>2</td>
                <td>Brother</td>
                <td>LK1N-2</td>
                <td>1600</td>
                <td>S/N:126K743I3N</td>
                <td>Hospital de Braga</td>
                <td>3º</td>
                <td>A</td>
                <td>CI38451</td>
                <td>08-03-2023</td>
                <th>Ativo</th>
                <th>Usado</th>
                <td>
                  <Link className="btn-edit">Editar</Link>
                  &nbsp;
                  <button className="btn-delete">Eliminar</button>
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default Ativos;
