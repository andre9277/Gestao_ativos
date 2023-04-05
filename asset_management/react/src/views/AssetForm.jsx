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

export default function AssetForm() {
  //permite a navegação de assets para outra página
  const navigate = useNavigate();

  const optionsCond = [
    {
      value: "Novo",
      label: "Novo",
    },
    {
      value: "Usado",
      label: "Usado",
    },
  ];
  //Ficamos com o ID
  let { id } = useParams();

  //Lista de utilizadores:
  const [asset, setAsset] = useState({
    id: null,
    inv: "",
    brand: "",
    model: "",
    serial: "",
    cond: "",
    ala: "",
    ci: "",
    status: "",
    local: "",
    category_id: "",
    supplier_id: null,
  });
  const [errors, setErrors] = useState(null);

  //Loading para informar aos assets de quando a tabela acaba de dar load
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();

  //Sempre que o ID do asset existir:
  if (id) {
    useEffect(() => {
      setLoading(true);
      axiosClient
        .get(`/assets/${id}`)
        .then(({ data }) => {
          setLoading(false);
          setAsset(data);
        })
        .catch(() => {
          setLoading(false);
        });
    }, []);
  }

  //Ao submeter o update:
  const onSubmit = (ev) => {
    ev.preventDefault();

    //se existir um asset id: faz a atualização
    if (asset.id) {
      axiosClient
        .put(`/assets/${asset.id}`, asset)
        .then(() => {
          //mensagem de update realizado com sucesso
          setNotification("Asset was successfully updated");
          //Redireciona para a página dos assets
          navigate("/assets");
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
        .post("/assets", asset)
        .then(() => {
          setNotification("Asset was successfully created");
          navigate("/assets");
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
      {asset.id && <h1>Update Asset: {asset.brand}</h1>}
      {!asset.id && <h1>New Asset</h1>}
      <div className="card animated fadeInDown">
        {loading && <div className="text-center">Loading...</div>}
        {errors && (
          <div className="alert">
            {Object.keys(errors).map((key) => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}
        {!loading && (
          <form onSubmit={onSubmit}>
            <input
              value={asset.inv}
              onChange={(ev) => setAsset({ ...asset, inv: ev.target.value })}
              placeholder="NºInventário"
            />
            <input
              value={asset.brand}
              onChange={(ev) => setAsset({ ...asset, brand: ev.target.value })}
              placeholder="Marca"
            />
            <input
              value={asset.model}
              onChange={(ev) => setAsset({ ...asset, model: ev.target.value })}
              placeholder="Modelo"
            />
            <input
              value={asset.serial}
              onChange={(ev) => setAsset({ ...asset, serial: ev.target.value })}
              placeholder="Numero de série"
            />
            <input
              value={asset.cond}
              onChange={(ev) => setAsset({ ...asset, cond: ev.target.value })}
              placeholder="Condição"
            />
            <input
              value={asset.floor}
              onChange={(ev) => setAsset({ ...asset, floor: ev.target.value })}
              placeholder="Piso"
            />
            <input
              value={asset.ala}
              onChange={(ev) => setAsset({ ...asset, ala: ev.target.value })}
              placeholder="Ala"
            />
            <input
              value={asset.ci}
              onChange={(ev) => setAsset({ ...asset, ci: ev.target.value })}
              placeholder="CI"
            />
            <input
              value={asset.status}
              onChange={(ev) => setAsset({ ...asset, status: ev.target.value })}
              placeholder="Estado"
            />
            <input
              value={asset.local}
              onChange={(ev) => setAsset({ ...asset, local: ev.target.value })}
              placeholder="Localização"
            />
            <input
              value={asset.category_id}
              onChange={(ev) =>
                setAsset({ ...asset, category_id: ev.target.value })
              }
              placeholder="Categoria"
            />
            <input
              value={asset.supplier_id}
              onChange={(ev) =>
                setAsset({ ...asset, supplier_id: ev.target.value })
              }
              placeholder="Fornecedor"
            />
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </>
  );
}
