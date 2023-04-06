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
import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { Link, Navigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider.jsx";
import PaginationLinks from "../components/PaginationLinks.jsx";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState({});
  const { setNotification, user } = useStateContext();

  if (user.role_id === 3) {
    return <Navigate to="/notfound" />;
  }

  //retorna todos os utilizadores (mount hook é chamado 2x)
  useEffect(() => {
    getUsers();
  }, []);

  //Handel click para apagar um utilizador
  const onDeleteClick = (user) => {
    //Confirmação da eliminação de um utilizador
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    //Requests para apagar o utilizador
    axiosClient.delete(`/users/${user.id}`).then(() => {
      setNotification("User was successfully deleted");

      //após utilizador ser eliminado, faz fetch de todos os utilziadores para mostrar a eliminação realizada com sucesso
      getUsers();
    });
  };

  const onPageClick = (link) => {
    getUsers(link.url);
  };

  //Realiza um request access client
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

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Utilizadores</h1>
        {user.role_id === 1 ? (
          <Link className="btn-add" to="/users/new">
            Add new
          </Link>
        ) : null}
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Criado em</th>

              <th>Função</th>
              {user.role_id === 1 ? <th>Ações</th> : null}
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
              {/* Iteração pelos utilizadores todos */}
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.created_at}</td>
                  <td>
                    {u.role_id === 1
                      ? "Admin"
                      : u.role_id === 2
                      ? "SI"
                      : "Manutenção"}
                  </td>
                  <td>
                    {user.role_id === 1 ? (
                      <>
                        <Link className="btn-edit" to={"/users/" + u.id}>
                          Editar
                        </Link>
                        &nbsp;
                        <button
                          className="btn-delete"
                          onClick={(ev) => onDeleteClick(u)}
                        >
                          Apagar
                        </button>{" "}
                      </>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
        <PaginationLinks meta={meta} onPageClick={onPageClick} />
      </div>
    </div>
  );
}
