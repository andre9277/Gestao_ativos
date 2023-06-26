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
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider.jsx";

export default function UserForm() {
  //Allows the navigation of users to other page
  const navigate = useNavigate();

  //We stay with the ID
  let { id } = useParams();

  //Lists of users
  const [user, setUser] = useState({
    id: null,
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role_id: "",
    mec: "",
  });
  const [errors, setErrors] = useState(null);

  //Loading para informar aos users de quando a tabela acaba de dar load
  //Loading to inform the users when the table has finished loading
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();

  //If the user ID exists
  if (id) {
    useEffect(() => {
      setLoading(true);
      axiosClient
        .get(`/users/${id}`)
        .then(({ data }) => {
          setLoading(false);
          setUser(data);
        })
        .catch(() => {
          setLoading(false);
        });
    }, []);
  }

  //When submiting the update
  const onSubmit = (ev) => {
    ev.preventDefault();

    //if the user id exists: it makes an update
    if (user.id) {
      axiosClient
        .put(`/users/${user.id}`, user)
        .then(() => {
          //message updated made succesfully
          setNotification("Utilizador atualizado com sucesso!");

          //Redirection to the users pages
          navigate("/users");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    }
    //else creates a user
    else {
      axiosClient
        .post("/users", user)
        .then(() => {
          setNotification("Utilizador Criado com sucesso!");
          navigate("/users");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    }
  };

  const resetFilter = () => {
    // Reset all the values to empty or default
    setUser({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      role_id: "",
      mec: "",
    });
  };

  return (
    <>
      {user.id && (
        <h1 className="title-page-all">Atualizar Utilizador: {user.name}</h1>
      )}
      {!user.id && <h1 className="title-page-all">Novo Utilizador</h1>}
      <div className="card animated fadeInDown">
        {loading && <div className="caprr-re">A carregar...</div>}
        {errors && (
          <div className="alert">
            {Object.keys(errors).map((key) => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}
        {!loading && (
          <form onSubmit={onSubmit} className="assetForm-assett">
            <label className="lb-info">
              {" "}
              <label className="labelofLabel"> Nome*: </label>
              <input
                value={user.name}
                onChange={(ev) => setUser({ ...user, name: ev.target.value })}
                className="infoInp"
              />
            </label>
            <label className="lb-info">
              <label className="labelofLabel">Email*: </label>
              <input
                type="email"
                value={user.email}
                onChange={(ev) => setUser({ ...user, email: ev.target.value })}
                className="infoInp"
              />
            </label>

            <label className="lb-info">
              <label className="labelofLabel">Número Mecanográfico*: </label>
              <input
                value={user.mec}
                onChange={(ev) => setUser({ ...user, mec: ev.target.value })}
                className="infoInp"
              />
            </label>

            <label className="lb-info">
              <label className="labelofLabel"> Password*: </label>
              <input
                value={user.password}
                type="password"
                onChange={(ev) =>
                  setUser({ ...user, password: ev.target.value })
                }
                className="infoInp"
              />
            </label>
            {/* <label className="lb-info">
              Confirmação da Password:
              <input
                value={user.password_confirmation}
                type="password"
                onChange={(ev) =>
                  setUser({ ...user, password_confirmation: ev.target.value })
                }
                className="infoInp"
              />
            </label> */}

            <label htmlFor="role" className="lb-info">
              <label className="labelofLabel"> Função*: </label>
              <select
                className="infoInp"
                name="role"
                id="role"
                value={user.role_id}
                onChange={(ev) =>
                  setUser({ ...user, role_id: ev.target.value })
                }
              >
                <option value=""></option>
                <option value="1">Administrador</option>
                <option value="2">Sistemas de Informação</option>
                <option value="3">Manutenção</option>
              </select>
            </label>
            <label onClick={resetFilter} className="btn-cleanfilter-asset">
              Limpar
            </label>
            <button className="btn-adicionar-userForm"> Guardar</button>
            <p className="camp-obs">*Campo Obrigatório</p>
          </form>
        )}
      </div>
    </>
  );
}
