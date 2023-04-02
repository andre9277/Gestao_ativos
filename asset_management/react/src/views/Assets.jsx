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
import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider.jsx";
import PaginationLinks from "../components/PaginationLinks.jsx";

export default function Assets() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState({});
  const { setNotification } = useStateContext();

  //retorna todos os assets (mount hook é chamado 2x)
  useEffect(() => {
    getAssets();
  }, []);

  //Handel click para apagar um asset
  const onDeleteClick = (asset) => {
    //Confirmação da eliminação de um asset
    if (!window.confirm("Are you sure you want to delete this asset?")) {
      return;
    }

    //Requests para apagar o asset
    axiosClient.delete(`/assets/${asset.id}`).then(() => {
      setNotification("Asset was successfully deleted");

      //após asset ser eliminado, faz fetch de todos os assets para mostrar a eliminação realizada com sucesso
      getAssets();
    });
  };

  /* const onPageClick = (link) => {
    getAssets(link.url);
  }; */

  //Realiza um request access client
  const getAssets = (url) => {
    url = url || "/assets";

    //enquanto não acaba o request, aplicamos o loading = true
    setLoading(true);
    axiosClient
      .get(url)
      .then(({ data }) => {
        //quando obtemos um request, loading=false
        setLoading(false);
        console.log(data);
        setAssets(data);
        //setMeta(data.meta);
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
        <h1>Ativos</h1>
        <Link className="btn-add" to="/assets/new">
          Add new
        </Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>NºInventário</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>NºSerial</th>
              <th>Condição</th>
              <th>Ala</th>
              <th>CI</th>
              <th>Estado</th>
              <th>Localização</th>
              <th>Data de Adição</th>
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
              {assets.map((a) => (
                <tr key={a.id}>
                  <td>{a.id}</td>
                  <td>{a.inv}</td>
                  <td>{a.brand}</td>
                  <td>{a.model}</td>
                  <td>{a.serial}</td>
                  <td>{a.cond}</td>
                  <td>{a.ala}</td>
                  <td>{a.ci}</td>
                  <td>{a.status}</td>
                  <td>{a.local}</td>
                  <td>{a.created_at}</td>
                  <td>
                    <Link className="btn-edit" to={"/assets/" + a.id}>
                      Edit
                    </Link>
                    &nbsp;
                    <button
                      className="btn-delete"
                      onClick={(ev) => onDeleteClick(a)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
        {/* <PaginationLinks meta={meta} onPageClick={onPageClick} /> */}
      </div>
    </div>
  );
}
