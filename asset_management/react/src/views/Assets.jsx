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
    Promise.all([
      axiosClient.get("/catName"),
      axiosClient.get("/brandsSig"),
      axiosClient.get("/modelosName"),
      axiosClient.get("/floorLevel"),
    ]).then((responses) => {
      setCats(responses[0].data);
      setBrands(responses[1].data);
      setModelos(responses[2].data);
      setFloor(responses[3].data);
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
        // console.log(data);
        setAssets(data.data); // Deve guardar TODOS os ativos de todas as páginas!!!!!
        setMeta(data.meta);
        getAllAssetsData(data.meta); // Call getAllAssetsData with the updated meta
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const getAllAssetsData = async (meta) => {
    try {
      const allData = [];
      for (let page = 1; page <= meta.last_page; page++) {
        try {
          const response = await axiosClient.get(`/assets?page=${page}`);
          const { data } = response;
          allData.push(...data.data);
        } catch (error) {
          console.error(error);
        }
      }

      setAllDados(allData);
    } catch (error) {
      console.error(error);
    }
  };

  //----------Handle click to delete an asset
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

  //-----------Handle click to edit an asset
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

  //-------------Handle change of the columns
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
                  assets={assets}
                  setAssets={setAssets}
                />
              </th>
              <th>
                <ColumnMenuFilter
                  titulo={"Marca"}
                  data={brands}
                  selectedAttribut={selectedBrand}
                  handleFunc={handleBrandChange}
                  assets={assets}
                  setAssets={setAssets}
                />
              </th>
              <th>
                <ColumnMenuFilter
                  titulo={"Modelo"}
                  data={modelos}
                  selectedAttribut={selectedModel}
                  handleFunc={handleModelChange}
                  assets={assets}
                  setAssets={setAssets}
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
                  assets={assets}
                  setAssets={setAssets}
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
              meta={meta}
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
