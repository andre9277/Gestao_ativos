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
  //permite a navegação de users para outra página
  const navigate = useNavigate();

  //Ficamos com o ID
  let { id } = useParams();

  //Lista de utilizadores:
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
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();

  //Sempre que o ID do utilizador existir:
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

  //Ao submeter o update:
  const onSubmit = (ev) => {
    ev.preventDefault();

    //se existir um user id: faz a atualização
    if (user.id) {
      axiosClient
        .put(`/users/${user.id}`, user)
        .then(() => {
          //mensagem de update realizado com sucesso
          setNotification("Utilizador atualizado com sucesso!");
          //Redireciona para a página dos utilizadores
          navigate("/users");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    }
    //senão vai criar um utilizador
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

  return (
    <>
      {user.id && <h1>Atualizar Utilziador: {user.name}</h1>}
      {!user.id && <h1>Novo Utilizador</h1>}
      <div className="card animated fadeInDown">
        {loading && <div className="text-center">Carregando...</div>}
        {errors && (
          <div className="alert">
            {Object.keys(errors).map((key) => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}
        {!loading && (
          <form onSubmit={onSubmit}>
            <label>
              {" "}
              Nome:
              <input
                value={user.name}
                onChange={(ev) => setUser({ ...user, name: ev.target.value })}
                placeholder="Nome"
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                value={user.email}
                onChange={(ev) => setUser({ ...user, email: ev.target.value })}
                placeholder="Email"
              />
            </label>

            <label>
              Número Mecanográfico:
              <input
                onChange={(ev) => setUser({ ...user, mec: ev.target.value })}
                placeholder="Número Mecanográfico"
              />
            </label>

            <label>
              Password:
              <input
                type="password"
                onChange={(ev) =>
                  setUser({ ...user, password: ev.target.value })
                }
                placeholder="Password"
              />
            </label>
            <label>
              Confirmação da Password:
              <input
                type="password"
                onChange={(ev) =>
                  setUser({ ...user, password_confirmation: ev.target.value })
                }
                placeholder="Confirmação da Password"
              />
            </label>
            <label>
              Função:
              <input
                value={user.role_id}
                onChange={(ev) =>
                  setUser({ ...user, role_id: ev.target.value })
                }
                placeholder="Função"
              />
            </label>
            <button className="btn">Guardar</button>
          </form>
        )}
      </div>
    </>
  );
}
