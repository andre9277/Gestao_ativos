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

export default function Allocations() {
  //retorna todos os utilizadores (mount hook é chamado 2x)
  useEffect(() => {
    getUsers();
  }, []);

  //retorna todos os assets (mount hook é chamado 2x)
  useEffect(() => {
    getAllocations();
  }, []);

  const [allocations, setAllocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState({});
  const [users, setUsers] = useState([]);

  const onPageClick = (link) => {
    getAllocations(link.url);
  };

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
        setAllocations(data.data);
        setMeta(data.meta);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const getUsers = (url, page = 1, allUsers = []) => {
    url = url || "/users";

    //enquanto não acaba o request, aplicamos o loading = true
    setLoading(true);
    axiosClient
      .get(url, { params: { page } })
      .then(({ data }) => {
        //quando obtemos um request, loading=false
        setLoading(false);
        const newUsers = data.data;
        const updatedUsers = [...allUsers, ...newUsers];
        // check if there are more pages to fetch
        if (data.meta.current_page < data.meta.last_page) {
          getUsers(url, page + 1, updatedUsers); // recursively fetch next page
        } else {
          // all pages have been fetched, update state with all users
          setUsers(updatedUsers);
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };

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
              <th>Data de Alteração</th>
            </tr>
          </thead>

          {loading && (
            <tbody>
              <tr>
                <td colSpan="5" className="text-center">
                  Carregando...
                </td>
              </tr>
            </tbody>
          )}

          {!loading && (
            <tbody>
              {allocations.map((allocation, index) => {
                const user = users.find(
                  (user) => user.id === allocation.user_id
                );
                return (
                  <tr key={`${allocation.user_id}-${index}`}>
                    <td>{user ? user.name : ""}</td>
                    <td>{allocation.asset_id}</td>
                    <td>{allocation.allocation_date}</td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
        <PaginationLinks meta={meta} onPageClick={onPageClick} />
      </div>
    </div>
  );
}
