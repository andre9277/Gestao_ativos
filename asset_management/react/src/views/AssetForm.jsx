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

  //retorna todos os assets (mount hook é chamado 2x)
  useEffect(() => {
    getCats();
  }, []);

  //Ficamos com o ID
  let { id } = useParams();

  //Lista de utilizadores:
  const [asset, setAsset] = useState({
    id: null,
    numb_inv: "",
    numb_ser: "",
    cond: "",
    ala: "",
    ci: "",
    state: "",
    cat_id: "",
    supplier_id: "",
    brand_id: "",
    ent_id: "",
    date_purch: "",
  });
  const [errors, setErrors] = useState(null);

  //Loading para informar aos assets de quando a tabela acaba de dar load
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();

  const [cats, setCats] = useState([]);

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
          setNotification("Ativo atualizado com sucesso!");
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
          setNotification("Ativo criado com sucesso!");
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

  const getCats = (url) => {
    url = url || "/categories";

    axiosClient.get(url).then(({ data }) => {
      setCats(data);
    });
  };

  return (
    <>
      {asset.id && <h1>Atualizar Ativo: {asset.brand}</h1>}
      {!asset.id && <h1>Novo Ativo</h1>}
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
            <button className="btn-adicionar">Gravar</button>
            <label>
              {" "}
              Nº Inventário:
              <input
                value={asset.numb_inv}
                onChange={(ev) =>
                  setAsset({ ...asset, numb_inv: ev.target.value })
                }
                placeholder="NºInventário"
              />
            </label>
            <label>
              {" "}
              Data de Compra:
              <input
                value={asset.date_purch}
                onChange={(ev) =>
                  setAsset({ ...asset, date_purch: ev.target.value })
                }
                placeholder="Data de compra"
              />
            </label>
            <label>
              {" "}
              Número de série:
              <input
                value={asset.numb_ser}
                onChange={(ev) =>
                  setAsset({ ...asset, numb_ser: ev.target.value })
                }
                placeholder="Numero de série"
              />
            </label>
            <label>
              {" "}
              Marca*:
              <input
                value={asset.brand_id}
                onChange={(ev) =>
                  setAsset({ ...asset, brand_id: ev.target.value })
                }
                placeholder="Marca"
              />
            </label>
            <label>
              {" "}
              Entidade*:
              <input
                value={asset.ent_id}
                onChange={(ev) =>
                  setAsset({ ...asset, ent_id: ev.target.value })
                }
                placeholder="Entidade"
              />
            </label>

            <label htmlFor="condicao">Condição:</label>
            <select
              name="condicao"
              id="condicao"
              value={asset.cond}
              onChange={(event) =>
                setAsset({ ...asset, cond: event.target.value })
              }
            >
              <option value="">Selecione a condição...</option>
              <option value="Novo">Novo</option>
              <option value="Usado">Usado</option>
              <option value="Reparação">Reparação</option>
              <option value="Obsoleto">Obsoleto</option>
            </select>

            <label htmlFor="floor">Piso:</label>
            <select
              name="floor"
              id="floor"
              value={asset.floor}
              onChange={(event) =>
                setAsset({ ...asset, floor: event.target.value })
              }
            >
              <option value="">Selecione o piso...</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>

            <label htmlFor="ala">Ala:</label>
            <select
              name="ala"
              id="ala"
              value={asset.ala}
              onChange={(event) =>
                setAsset({ ...asset, ala: event.target.value })
              }
            >
              <option value="">Selecione a ala...</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
            </select>
            <label>
              {" "}
              CI:
              <input
                value={asset.ci}
                onChange={(ev) => setAsset({ ...asset, ci: ev.target.value })}
                placeholder="CI"
              />
            </label>
            <label htmlFor="estado">Estado:</label>
            <select
              name="estado"
              id="estado"
              value={asset.state}
              onChange={(event) =>
                setAsset({ ...asset, state: event.target.value })
              }
            >
              <option value="">Selecione o estado...</option>
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
            </select>

            {/*   {asset.map((aset, index) => (
              <tr key={`${aset.id}-${index}`}>
                <td>{cats.find((cat) => cat.id === aset.cat_id).name}</td>
                <td>{allocation.asset_id}</td>
                <td>{allocation.allocation_date}</td>
              </tr>
            ))} */}

            <label htmlFor="category">Categoria:</label>
            <select
              name="category"
              id="category"
              value={asset.cat_id}
              onChange={(event) =>
                setAsset({ ...asset, cat_id: event.target.value })
              }
            >
              <option value="">Selecione a Categoria ...</option>
              {cats.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <label>
              {" "}
              Fornecedor:
              <input
                value={asset.supplier_id}
                onChange={(ev) =>
                  setAsset({ ...asset, supplier_id: ev.target.value })
                }
                placeholder="Fornecedor"
              />
            </label>
          </form>
        )}
      </div>
    </>
  );
}
