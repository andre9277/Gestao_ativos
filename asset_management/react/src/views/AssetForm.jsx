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
    getEnts();
    getUnits();
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
    model_id: "",
    unit_id: "",
  });
  const [errors, setErrors] = useState(null);

  //Loading para informar aos assets de quando a tabela acaba de dar load
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();

  const [cats, setCats] = useState([]);
  const [ents, setEnts] = useState([]);
  const [units, setUnits] = useState([]);

  const [selectedEntity, setSelectedEntity] = useState("");

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

  useEffect(() => {
    if (selectedEntity) {
      axiosClient.get(`/unitss?ent_id=${selectedEntity}`).then((response) => {
        setUnits(response.data);
      });
    } else {
      setUnits([]);
    }
  }, [selectedEntity]);
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

  const handleEntityChange = (event) => {
    const selectedEntity = event.target.value;
    setAsset((prevState) => ({
      ...prevState,
      ent_id: selectedEntity,
      unit_id: "",
    }));
    setSelectedEntity(selectedEntity);
  };

  const getCats = (url) => {
    url = url || "/categories";

    axiosClient.get(url).then(({ data }) => {
      setCats(data);
    });
  };

  const getEnts = (url) => {
    url = url || "/entities";

    axiosClient.get(url).then(({ data }) => {
      setEnts(data);
    });
  };

  const getUnits = (url) => {
    url = url || "/units";

    axiosClient.get(url).then(({ data }) => {
      setUnits(data);
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
                placeholder="YYYY-MM-DD"
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
              Modelo*:
              <input
                value={asset.model_id}
                onChange={(ev) =>
                  setAsset({ ...asset, model_id: ev.target.value })
                }
                placeholder="Modelo"
              />
            </label>

            {/* ---------- Entidades ----------*/}
            <label htmlFor="entity">
              Entidades:
              <select
                name="entity"
                id="entity"
                value={asset.ent_id}
                onChange={handleEntityChange}
              >
                <option value="">Selecione a Entidade ...</option>
                {ents.map((ent) => (
                  <option key={ent.id} value={ent.id}>
                    {ent.ent_name}
                  </option>
                ))}
              </select>
            </label>

            {/* ---------- Unidades ----------*/}
            <label htmlFor="unit">
              Unidade:
              <select
                name="unit"
                id="unit"
                value={asset.unit_id}
                onChange={(event) =>
                  setAsset({ ...asset, unit_id: event.target.value })
                }
              >
                <option value="">Selecione a Unidade ...</option>
                {units.map((unit) => (
                  <option key={unit.id} value={unit.id}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="condicao">
              Condição:
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
            </label>

            <label htmlFor="floor">
              Piso:
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
            </label>
            <label htmlFor="ala">
              Ala:
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
            </label>
            <label>
              {" "}
              CI:
              <input
                value={asset.ci}
                onChange={(ev) => setAsset({ ...asset, ci: ev.target.value })}
                placeholder="CI"
              />
            </label>
            <label htmlFor="estado">
              Estado:
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
            </label>

            <label htmlFor="category">
              Categoria:
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
            </label>
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
