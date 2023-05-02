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
import { Link, Navigate, useNavigate } from "react-router-dom";
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

  //return all users(mount hook its called 2x)
  useEffect(() => {
    getUsers();
  }, []);

  const navigate = useNavigate();
  const onEditClick = () => {
    // Get the IDs of all the checked users
    const checkedUserIds = users.filter((u) => u.checked).map((u) => u.id);
    const url = `/users/${checkedUserIds}`;

    if (checkedUserIds.length === 0) {
      return;
    } else {
      navigate(url);
    }

    //console.log(checkedUserIds);
  };

  const onDeleteClick = () => {
    // Get the IDs of all the checked users
    const checkedUserIds = users.filter((u) => u.checked).map((u) => u.id);

    // If no users are checked, return
    if (checkedUserIds.length === 0) {
      return;
    }

    // Confirm that the user wants to delete the checked users
    if (
      !window.confirm(
        `Tem a certeza que deseja eliminar ${checkedUserIds.length} utilizador(s) selecionado(s)?`
      )
    ) {
      return;
    }

    // Delete the checked users
    axiosClient.delete(`/users/${checkedUserIds.join(",")}`).then(() => {
      setNotification(
        ` ${checkedUserIds.length} utilizador(s) apagado(s) com sucesso!`
      );

      // After the users are deleted, fetch all the users again to update the table
      getUsers();
    });
  };

  const onPageClick = (link) => {
    getUsers(link.url);
  };

  //Performs a client access request
  const getUsers = (url) => {
    url = url || "/users";

    //when the request isnt finished, we aply loading=true
    setLoading(true);
    axiosClient
      .get(url)
      .then(({ data }) => {
        //When there is a request: loading=false
        setLoading(false);
        setUsers(data.data);
        //console.log(data);
        setMeta(data.meta);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const toggleCheck = (id) => {
    const checkedIdx = users.findIndex((u) => u.id === id);
    if (checkedIdx === -1) return;
    const updatedUsers = [...users];
    updatedUsers[checkedIdx].checked = !updatedUsers[checkedIdx].checked;
    setUsers(updatedUsers);
  };

  return (
    <div>
      <div className="tb-user">
        <h1>Utilizadores</h1>
        <div className="tb-btn-user">
          {user.role_id === 1 ? (
            <button className="btn-add">
              <Link
                className=" text-link"
                to="/users/new"
                style={{ textDecoration: "none", color: "white" }}
              >
                + Adicionar Novo
              </Link>
            </button>
          ) : null}
          <>
            <button
              className=" btn-edit text-link"
              onClick={(ev) => onEditClick()}
            >
              Editar
            </button>
            &nbsp;
            <button
              className="btn-delete text-link"
              onClick={(ev) => onDeleteClick()}
            >
              Apagar
            </button>
          </>
        </div>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>Nº Mecanográfico</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Função</th>
              <th>Criado em</th>
              <th></th>
            </tr>
          </thead>
          {loading && (
            <tbody>
              <tr>
                <td colSpan="5" className="caprr-re">
                  Carregando...
                </td>
              </tr>
            </tbody>
          )}

          {!loading && (
            <tbody>
              {/* Iteration through all the users */}
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.mec}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.roles.name}</td>

                  <td>{u.created_at}</td>
                  {user.role_id === 3 ? null : (
                    <td>
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        onChange={() => toggleCheck(u.id)}
                        value={u.checked}
                      />
                    </td>
                  )}
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
