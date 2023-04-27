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
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider.jsx";
import PaginationLinks from "../components/PaginationLinks.jsx";
import "../styles/Dashboard.css";

export default function Assets() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState({});
  const { setNotification, user } = useStateContext();

  //returns all assets (mount hook is called 2x)
  useEffect(() => {
    getAssets();
  }, []);

  const navigate = useNavigate();

  //Handle click para apagar um asset
  const onDeleteClick = () => {
    // Get the IDs of all the checked users
    const checkedAssetIds = assets.filter((a) => a.checked).map((as) => as.id);

    // If no users are checked, return
    if (checkedAssetIds.length === 0) {
      return;
    }

    //Confirmation of deletion of an asset
    if (!window.confirm("Tem a certeza que pretende apagar o ativo?")) {
      return;
    }

    //Requests to delete the asset
    axiosClient.delete(`/assets/${checkedAssetIds.join(",")}`).then(() => {
      setNotification("Ativo apagado com sucesso!");

      //after asset being deleted, fetch of all assets, so it displays with success all the assets
      getAssets();
    });
  };

  const onEditClick = () => {
    // Get the IDs of all the checked assets
    const checkedAssetIds = assets.filter((a) => a.checked).map((as) => as.id);
    const url = `/assets/${checkedAssetIds}`;

    if (checkedAssetIds.length === 0) {
      return;
    } else {
      navigate(url);
    }

    //console.log(checkedAssetIds);
  };

  const onPageClick = (link) => {
    getAssets(link.url);
  };

  //Performs a client access request
  const getAssets = (url) => {
    url = url || "/assets";

    //when there is still a request, we aply loading = true
    setLoading(true);
    axiosClient
      .get(url)
      .then(({ data }) => {
        //when the request is successfull, loading=false
        setLoading(false);
        //console.log(data);
        setAssets(data.data);
        setMeta(data.meta);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const toggleCheck = (id) => {
    const checkedIdx = assets.findIndex((a) => a.id === id);
    if (checkedIdx === -1) return;
    const updatedAssets = [...assets];
    updatedAssets[checkedIdx].checked = !updatedAssets[checkedIdx].checked;
    setAssets(updatedAssets);
  };

  return (
    <div id="content">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        className="container-fluid"
      >
        <h1>Listagem de Ativos</h1>
        <div>
          {user.role_id === 3 ? null : (
            <Link
              className="btn-add text-link"
              to="/assets/new"
              style={{ textDecoration: "none", color: "white" }}
            >
              + Adicionar Ativo
            </Link>
          )}
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
      <div
        className="card animated fadeInDown"
        style={{
          alignItems: "center",
        }}
      >
        <table>
          <thead>
            <tr>
              <th>Categoria</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>NºInventário</th>
              <th>Nº Série</th>
              <th>Localização</th>
              <th>Unidade</th>
              <th>Piso</th>
              <th>Ala</th>
              <th>CI</th>
              <th>Estado</th>
              <th>Adicionado em </th>
              <th></th>
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
              {/* Iteration between all assets */}
              {assets.map((a) => (
                <tr key={a.id}>
                  <td>{a.category.name}</td>
                  <td>{a.brand.sig}</td>
                  <td>{a.modelo.model_name}</td>
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
              ))}
            </tbody>
          )}
        </table>
        <PaginationLinks meta={meta} onPageClick={onPageClick} />
      </div>
    </div>
  );
}
