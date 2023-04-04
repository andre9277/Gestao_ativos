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
import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import PaginationLinks from "../components/PaginationLinks.jsx";
import { useStateContext } from "../context/ContextProvider.jsx";

export default function Allocations() {
  const [allocations, setAllocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState({});
  const [users, setUsers] = useState([]);

  //retorna todos os assets (mount hook é chamado 2x)
  useEffect(() => {
    getAllocations();
  }, []);

  /*   const onPageClick = (link) => {
    getAllocations(link.url);
  }; */

  //Realiza um request access client
  const getAllocations = (url) => {
    url = url || "/allocations";

    //enquanto não acaba o request, aplicamos o loading = true
    setLoading(true);
    axiosClient
      .get(url)
      .then(({ data }) => {
        //quando obtemos um request, loading=false
        setLoading(false);
        //console.log(data);
        setAllocations(data);
        //setMeta(data.meta);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const getUsers = (url) => {
    url = url || "/users";

    //enquanto não acaba o request, aplicamos o loading = true
    setLoading(true);
    axiosClient
      .get(url)
      .then(({ data }) => {
        //quando obtemos um request, loading=false
        setLoading(false);
        setUsers(data.data);
        //console.log(data);
        setMeta(data.meta);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  //retorna todos os utilizadores (mount hook é chamado 2x)
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Movimentação de Ativos</h1>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>Utilizador</th>
              <th>Ativo</th>
              <th>Data de Movimentação</th>
            </tr>
          </thead>
          {loading && (
            <tbody>
              <tr>
                <td colSpan="5" className="text-center">
                  Loading...
                </td>
              </tr>
            </tbody>
          )}
          {!loading && (
            <tbody>
              {/* Iteração pelos assets todos */}
              {allocations.map((a) => {
                <React.Fragment>
                  {users.map((u) => (
                    <tr key={a.id}>
                      <td>{a.user_id === u.id ? u.name : "NotFound"}</td>
                      <td>{a.asset_id}</td>
                      <td>{a.allocation_date}</td>
                    </tr>
                  ))}
                </React.Fragment>;
              })}
            </tbody>
          )}
        </table>
        {/* <PaginationLinks meta={meta} onPageClick={onPageClick} /> */}
        {/* <td>{a.user_id === u.id ? u.name : "NotFound"}</td> */}
      </div>
    </div>
  );
}
