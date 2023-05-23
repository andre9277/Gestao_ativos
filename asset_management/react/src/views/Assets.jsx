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
import ColumnMenuFilter from "../components/ColumnMenuFilter.jsx";
import TableAssets from "../components/TableAssets.jsx";

export default function Assets() {
  const navigate = useNavigate();

  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingAll, setLoadingAll] = useState(false);
  const [meta, setMeta] = useState({});
  const { setNotification, user } = useStateContext();

  const [cats, setCats] = useState([]);
  const [brands, setBrands] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [floor, setFloor] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFloor, setSelectedFloor] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");

  const [allDados, setAllDados] = useState([]);

  useEffect(() => {
    Promise.all([axiosClient.get("/assetsDefault")]).then((responses) => {
      setLoading(false);
      setCats(responses[0].data.cats);
      setBrands(responses[0].data.brands);

      setModelos(responses[0].data.models);
      setFloor(responses[0].data.floor);
      setAllDados(responses[0].data.assets); //Gets all data from the assets
      //console.log("allDados", responses[0].data);
    });
  }, []);

  //returns all assets (mount hook is called 2x)
  useEffect(() => {
    const fetchData = async () => {
      await getAssets();
    };

    fetchData();
  }, []);

  // Performs a client access request
  const getAssets = (url) => {
    url = url || "/assets";

    // When there is still a request, we apply loading = true
    setLoading(true);
    axiosClient
      .get(url)
      .then(({ data }) => {
        // When the request is successful, loading=false
        setLoading(false);
        setAssets(data.data);
        setMeta(data.meta);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  //----------Handle click to delete an asset
  const onDeleteClick = () => {
    // Get the IDs of all the checked assets
    const checkedAssetIds = assets.filter((a) => a.checked).map((as) => as.id);

    // If no assets are checked, return
    if (checkedAssetIds.length === 0) {
      return;
    }

    // Confirmation of asset deletion
    if (
      !window.confirm(
        "Tem a certeza que pretende eliminar o(s) ativo(s) selecionado(s)?"
      )
    ) {
      return;
    }

    // Create the URL with the asset IDs
    const url = `/assets/${checkedAssetIds.join(",")}`;

    // Send the DELETE request
    axiosClient
      .delete(url)
      .then(() => {
        setNotification("Ativo(s) apagado(s) com sucesso!");
        // Fetch assets again to update the UI
        getAssets();
      })
      .catch((error) => {
        console.error("Erro ao apagar ativo(s):", error);
        // Handle error if necessary...
      });
  };

  //-----------Handle click to edit an asset-------------
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

  //OnPageClick for the pagination
  const onPageClick = (link) => {
    getAssets(link.url);
  };

  //-------------Handle change of the columns-------------
  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory);
  };

  const handleFloorChange = (event) => {
    const selectedFloor = event.target.value;
    setSelectedFloor(selectedFloor);
  };

  const handleBrandChange = (event) => {
    const selectedBrand = event.target.value;
    setSelectedBrand(selectedBrand);
  };

  const handleModelChange = (event) => {
    const selectedModel = event.target.value;
    setSelectedModel(selectedModel);
  };

  //Reset of the filters implemented
  const resetFilter = () => {
    setSelectedBrand("");
    setSelectedFloor("");
    setSelectedCategory("");
    setSelectedModel("");
    const sortedAssets = [...assets].sort((a, b) => b.id - a.id); // Sort by the "id" column in ascending order
    setAssets(sortedAssets);
    setOrder("ASC"); // Reset the sorting order to "ASC"
  };

  //For the checkbox, if the value of the filter is empty, then uses the assets array of the current page.
  //if filter exists then uses the allDados array, that gives information about every assets in our database
  const toggleCheck = (id) => {
    if (
      selectedBrand === "" &&
      selectedCategory === "" &&
      selectedFloor === "" &&
      selectedModel === ""
    ) {
      const checkedIdx = assets.findIndex((a) => a.id === id);

      if (checkedIdx === -1) return;
      const updatedAssets = [...assets];
      updatedAssets[checkedIdx].checked = !updatedAssets[checkedIdx].checked;
      setAssets(updatedAssets);
    } else {
      const checkedIdx = allDados.findIndex((a) => a.id === id);
      if (checkedIdx === -1) return;
      const updatedAssets = [...allDados];
      updatedAssets[checkedIdx].checked = !updatedAssets[checkedIdx].checked;
      setAssets(updatedAssets);
    }
  };

  //----------Sorting of the asset table in every column
  const [order, setOrder] = useState("ASC");

  const sorting = (col) => {
    const columnMapping = {
      Categoria: "category.name",
      Marca: "brand.sig",
      Modelo: "modelo.name",
      Piso: "floor",
    };

    const dbColumnName = columnMapping[col];

    if (order === "ASC") {
      const sorted = [...assets].sort((a, b) => {
        const propA = getPropertyByPath(a, dbColumnName);
        const propB = getPropertyByPath(b, dbColumnName);

        if (propA === null || propB === null) {
          //Exclude null values
          return propA === null ? 1 : -1;
        }
        return propA > propB ? 1 : -1;
      });
      setAssets(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...assets].sort((a, b) => {
        const propA = getPropertyByPath(a, dbColumnName);
        const propB = getPropertyByPath(b, dbColumnName);
        if (propA === null || propB === null) {
          //Exclude null values
          return propA === null ? -1 : 1;
        }
        return propA < propB ? 1 : -1;
      });
      setAssets(sorted);
      setOrder("ASC");
    }
  };

  //auxiliar function to get the property of one array of objects of objects
  const getPropertyByPath = (obj, path) => {
    const properties = path.split(".");
    let value = obj;
    for (let prop of properties) {
      value = value[prop];
    }
    return value;
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
          {user.role_id === 3 ? null : (
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
          )}
          {
            <button onClick={resetFilter} className="btn-dwl">
              Limpar filtro
            </button>
          }
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
              <th>
                <ColumnMenuFilter
                  titulo={"Categoria"}
                  data={cats}
                  selectedAttribut={selectedCategory}
                  handleFunc={handleCategoryChange}
                  sorting={sorting}
                  order={order}
                />
              </th>
              <th>
                <ColumnMenuFilter
                  titulo={"Marca"}
                  data={brands}
                  selectedAttribut={selectedBrand}
                  handleFunc={handleBrandChange}
                  sorting={sorting}
                  order={order}
                />
              </th>
              <th>
                <ColumnMenuFilter
                  titulo={"Modelo"}
                  data={modelos}
                  selectedAttribut={selectedModel}
                  handleFunc={handleModelChange}
                  sorting={sorting}
                  order={order}
                />
              </th>
              <th>NºInventário</th>
              <th>Nº Série</th>
              <th>Localização</th>
              <th>Unidade</th>
              <th>
                <ColumnMenuFilter
                  titulo={"Piso"}
                  data={floor}
                  selectedAttribut={selectedFloor}
                  handleFunc={handleFloorChange}
                  sorting={sorting}
                  order={order}
                />
              </th>
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
                <td colSpan="5" className="lgText">
                  Carregando...
                </td>
              </tr>
            </tbody>
          )}
          {!loading && (
            <TableAssets
              assets={assets}
              selectedCategory={selectedCategory}
              selectedFloor={selectedFloor}
              selectedBrand={selectedBrand}
              selectedModel={selectedModel}
              toggleCheck={toggleCheck}
              allDados={allDados}
            />
          )}
        </table>
        <p> </p>
        <p> </p>
        <PaginationLinks meta={meta} onPageClick={onPageClick} />
      </div>
    </div>
  );
}
