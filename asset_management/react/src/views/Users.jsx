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
import { Navigate, useNavigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider.jsx";
import PaginationLinks from "../components/PaginationLinks.jsx";
import { Modal, Button } from "react-bootstrap";

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
  const [show, setShow] = useState(false);

  const [deleteConfirmed, setDeleteConfirmed] = useState(false);

  const onDeleteClick = () => {
    setShow(true); // Show the modal
  };

  const handleDeleteConfirm = () => {
    setDeleteConfirmed(true);
    setShow(false); // Close the modal
  };

  const handleClose = () => {
    setShow(false);
  };

  const onPageClick = (link) => {
    getUsers(link.url);
  };

  // Execute the delete operation when deleteConfirmed is true
  useEffect(() => {
    if (deleteConfirmed) {
      // Get the IDs of all the checked assets
      const checkedUserIds = users.filter((u) => u.checked).map((u) => u.id);

      // If no assets are checked, return
      if (checkedUserIds.length === 0) {
        return;
      }

      // Create the URL with the asset IDs
      const url = `/users/${checkedUserIds.join(",")}`;

      // Send the DELETE request
      axiosClient
        .delete(url)
        .then(() => {
          setNotification("Utilizador apagado com sucesso");
          // Fetch assets again to update the UI
          getUsers();
        })
        .catch((error) => {
          console.error("Erro ao apagar utilizador:", error);

          // Handle error if necessary...
        });

      // Reset deleteConfirmed to false
      setDeleteConfirmed(false);
    }
  }, [deleteConfirmed]);

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

  const onAddClick = () => {
    const url = "/users/new";
    navigate(url);
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmação</Modal.Title>
        </Modal.Header>
        <Modal.Body>Deseja apagar o utilizador selecionado!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteConfirm}>
            Apagar
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="tb-user">
        <h1 className="title-page-all">Utilizadores</h1>
        <div className="tb-btn-user">
          {user.role_id === 1 ? (
            <button
              className="btn-add text-link"
              onClick={(ev) => onAddClick()}
            >
              <i
                className="fa fa-plus fa-lg"
                aria-hidden="true"
                title={"Adicionar"}
              ></i>
            </button>
          ) : null}
          <>
            <button
              className=" btn-edit text-link"
              onClick={(ev) => onEditClick()}
            >
              <i
                className="fa fa-pencil-alt fa-lg"
                aria-hidden="true"
                title={"Editar"}
              ></i>
            </button>
            &nbsp;
            <button
              className="btn-delete text-link"
              onClick={(ev) => onDeleteClick()}
            >
              <i
                className="fa fa-trash fa-lg"
                aria-hidden="true"
                title={"Apagar"}
              ></i>
            </button>
          </>
        </div>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th className="header-tb">Nº Mecanográfico</th>
              <th className="header-tb">Nome</th>
              <th className="header-tb">Email</th>
              <th className="header-tb">Função</th>
              <th className="header-tb">Criado em</th>
              <th></th>
            </tr>
          </thead>
          {loading && (
            <tbody>
              <tr>
                <td colSpan="5" className="caprr-re">
                  A carregar...
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
        {!loading ? (
          <PaginationLinks meta={meta} onPageClick={onPageClick} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
