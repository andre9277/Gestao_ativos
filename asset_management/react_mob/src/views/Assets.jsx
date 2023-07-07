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
import { useEffect, useState, useRef } from "react";
import axiosClient from "../axios-client.js";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider.jsx";
import "../styles/assets.css";
import PaginationLinks from "../components/PaginationLinks.jsx";
/* import "../styles/Dashboard.css"; */
import ColumnMenuFilter from "../components/ColumnMenuFilter.jsx";
import PaginationFilter from "../components/PaginationFilter.jsx";
import SelectFilter from "../components/SelectFilter.jsx";
import { Modal, Button } from "react-bootstrap";

export default function Assets() {
  const navigate = useNavigate();

  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  //const [loadingAll, setLoadingAll] = useState(false);
  const [meta, setMeta] = useState({});
  const { user, setNotification } = useStateContext();

  const [cats, setCats] = useState([]);
  const [brands, setBrands] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [floor, setFloor] = useState([]);
  const [ent, setEnt] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFloor, setSelectedFloor] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedEnt, setSelectedEnt] = useState("");
  const [originalModels, setOriginalModels] = useState([]);
  const [allDados, setAllDados] = useState([]);

  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [filteredAllocations, setFilteredAllocations] = useState([]);

  //*For pagination with filters*
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 20;
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;

  const abortControllerRef = useRef(null);
  const abortControllerrRef = useRef(null);

  const [show, setShow] = useState(false);

  const [deleteConfirmed, setDeleteConfirmed] = useState(false);

  useEffect(() => {
    getAssets();
  }, []);

  // Performs a client access request
  const getAssets = (url) => {
    abortControllerrRef.current = new AbortController();
    const { signal } = abortControllerrRef.current;

    url = url || "/assets";

    // When there is still a request, we apply loading = true
    setLoading(true);
    axiosClient
      .get(url, { signal })
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
  /*  useEffect(() => {
    return () => {
      if (abortControllerrRef.current) {
        abortControllerrRef.current.abort();
      }
    };
  }, []);
 */
  useEffect(() => {
    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;
    Promise.all([axiosClient.get("/assetsDefault", { signal })])
      .then((responses) => {
        setLoading(false);
        setCats(responses[0].data.cats);
        setBrands(responses[0].data.brands);
        setOriginalModels(responses[0].data.models);
        setModelos(responses[0].data.models);
        setFloor(responses[0].data.floor);
        setAllDados(responses[0].data.assets); //Gets all data from the assets
        setEnt(responses[0].data.localiz);
      })
      .catch((error) => {
        //error;
      });

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  //returns all assets (mount hook is called 2x)

  //------------------------Filter Sorting-----------------------------------------------
  //keeps checking if there is a filter on or off:
  const [filtered, setFiltered] = useState(false);
  //For the all the asset data:
  const [allDataF, setAllDataF] = useState([]);
  const [orderFilter, setOrderFilter] = useState("ASC");

  useEffect(() => {
    const hasFilter =
      selectedCategory !== "" ||
      selectedFloor !== "" ||
      selectedBrand !== "" ||
      selectedModel !== "" ||
      selectedEnt !== "";
    setFiltered(hasFilter);
    //if hasFilter = true then it gets all the assets from all the pages:
    if (hasFilter) {
      setAllDataF(allDados);
    }
  }, [
    selectedCategory,
    selectedFloor,
    selectedBrand,
    selectedModel,
    selectedEnt,
  ]);

  //use allData when filtered = true and when its false its equal to the assets object
  const filterAsset = () => {
    const filteredData = allDataF.filter(
      (row) =>
        (selectedCategory === "" || row.category.name === selectedCategory) &&
        (selectedFloor === "" || row.floor === selectedFloor) &&
        (selectedBrand === "" || row.brand.name === selectedBrand) &&
        (selectedModel === "" || row.modelo.name === selectedModel) &&
        (selectedEnt === "" || row.entity.ent_name === selectedEnt)
    );

    setFilteredAllocations(filtered ? filteredData : assets);
    setIsButtonClicked(true);
    setDropdownOpen(false);
  };

  const totalResults = filteredAllocations.length;
  //----------------------------Sorting (with filter)----------------------
  const sortingFilter = (col) => {
    const columnMapping = {
      Categoria: "category.name",
      Marca: "brand.name",
      Modelo: "modelo.name",
      Piso: "floor",
      Entidade: "entity.ent_name",
      NºSerie: "numb_ser",
    };

    const dbColumnName = columnMapping[col];

    if (orderFilter === "ASC") {
      const sorted = [...allDataF].sort((a, b) => {
        const propA = getPropertyByPathFilter(a, dbColumnName);
        const propB = getPropertyByPathFilter(b, dbColumnName);

        if (propA === null || propB === null) {
          //Exclude null values
          return propA === null ? 1 : -1;
        }
        return propA > propB ? 1 : -1;
      });
      setAllDataF(sorted);
      setOrderFilter("DSC");
    }
    if (orderFilter === "DSC") {
      const sorted = [...allDataF].sort((a, b) => {
        const propA = getPropertyByPathFilter(a, dbColumnName);
        const propB = getPropertyByPathFilter(b, dbColumnName);
        if (propA === null || propB === null) {
          //Exclude null values
          return propA === null ? -1 : 1;
        }
        return propA < propB ? 1 : -1;
      });
      setAllDataF(sorted);
      setOrderFilter("ASC");
    }
  };

  //auxiliar function to get the property of one array of objects of objects
  const getPropertyByPathFilter = (obj, path) => {
    const properties = path.split(".");
    let value = obj;
    for (let prop of properties) {
      value = value[prop];
    }
    return value;
  };

  //------------------------------------------------------------------------

  //----------Handle click to add an asset------------------------
  const onAddClick = () => {
    const url = "/assets/new";
    navigate(url);
  };

  //-----------Handle click to edit an asset-----------------------------
  const onEditClick = () => {
    // Get the IDs of all the checked assets
    const checkedAssetIds = assets.filter((a) => a.checked).map((as) => as.id);
    const url = `/assets/${checkedAssetIds}`;

    if (checkedAssetIds.length === 0) {
      return;
    } else {
      navigate(url);
    }
  };

  //OnPageClick for the pagination
  const onPageClick = (link) => {
    getAssets(link.url);
  };

  //-------------Handle change of the columns----------------------------
  const handleCategoryChange = (event) => {
    const selectedCategoryName = event.target.value;

    // Find the category object based on the selected name
    const selectedCategory = cats.find(
      (category) => category.name === selectedCategoryName
    );

    if (selectedCategory) {
      setSelectedCategory(selectedCategoryName);

      setLoading(true);
      axiosClient
        .get(`/brands/category/${selectedCategory.id}`)
        .then((response) => {
          setLoading(false);
          setBrands(response.data);
        })
        .catch((error) => {
          setLoading(false);
          console.error(error);
        });
    }
  };

  const handleFloorChange = (event) => {
    const selectedFloor = event.target.value;
    setSelectedFloor(selectedFloor);
  };

  const handleBrandChange = (event) => {
    const selectedBrandName = event.target.value;

    // Find the brand object with the selected name
    const selectedBrand = brands.find(
      (brand) => brand.name === selectedBrandName
    );

    if (selectedBrand) {
      const selectedBrandId = selectedBrand.id;
      setSelectedBrand(selectedBrandName);

      // Filter the models based on the selected brand ID
      const filteredModels = modelos.filter(
        (model) => model.brand_id === selectedBrandId
      );

      // Update the modelos state with the filtered models
      setModelos(filteredModels);
    }
  };

  const handleModelChange = (event) => {
    const selectedModel = event.target.value;
    setSelectedModel(selectedModel);
  };

  const handleEntityChange = (event) => {
    const selectedEntity = event.target.value;
    setSelectedEnt(selectedEntity);
  };

  //Reset of the filters implemented
  const resetFilter = () => {
    setSelectedBrand("");
    setSelectedFloor("");
    setSelectedCategory("");
    setSelectedModel("");
    setSelectedEnt("");
    const sortedAssets = [...assets].sort((a, b) => b.id - a.id); // Sort by the "id" column in ascending order
    setAssets(sortedAssets);
    setAllDataF([]);
    setOrder("ASC"); // Reset the sorting order to "ASC"
    setCurrentPage(1);
    setFilteredAllocations([]);
    setIsButtonClicked(false);
    setDropdownOpen(false);
    setModelos(originalModels); // gets back all the models in the modelos array
  };

  //For the checkbox, if the value of the filter is empty, then uses the assets array of the current page.
  //if filter exists then uses the allDados array, that gives information about every assets in our database
  const toggleCheck = (id) => {
    if (
      selectedBrand === "" &&
      selectedCategory === "" &&
      selectedFloor === "" &&
      selectedModel === "" &&
      selectedEnt === ""
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

  //----------Sorting of the asset table in every column---------- (with pagination)
  const [order, setOrder] = useState("ASC");

  const sorting = (col) => {
    const columnMapping = {
      Categoria: "category.name",
      Marca: "brand.name",
      Modelo: "modelo.name",
      Piso: "floor",
      NºSerie: "numb_ser",
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
  /*  console.log("data filtered:", allDataF);
  console.log("assets", assets); */

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  /*------------Button Apagar------------------------------*/
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

  // Execute the delete operation when deleteConfirmed is true
  useEffect(() => {
    if (deleteConfirmed) {
      // Get the IDs of all the checked assets
      const checkedAssetIds = assets
        .filter((a) => a.checked)
        .map((as) => as.id);

      // If no assets are checked, return
      if (checkedAssetIds.length === 0) {
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

      // Reset deleteConfirmed to false
      setDeleteConfirmed(false);
    }
  }, [deleteConfirmed]);

  return (
    <div className="mn-cnt">
      <div className="space-mov"></div>
      <h1 className="search-tit">Procurar</h1>
      <div className="space-mov"></div>
      <div className="icon-search">
        <input className="inp-search"></input>
      </div>
      <div className="search-sch">
        <button className="btn-sch-mb">Procurar</button>
      </div>
      <div className="barcode-search">
        <center>
          <i className="fa fa-barcode ic-bc" aria-hidden="true"></i>
        </center>
      </div>
    </div>
  );
}
