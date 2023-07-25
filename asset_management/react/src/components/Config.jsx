import React, { useState, useEffect } from "react";
import "../styles/Config.css";
import ConfigDropdown from "./ConfigDropdown";
import "../styles/Config.css"; // Create a CSS file to style the dropdown
import axiosClient from "../axios-client";
import ConfigDropAdd from "./ConfigDropAdd";
import ConfigDropEdit from "./ConfigDropEdit";
import ConfigDropMdlAdd from "./ConfigDropMdlAdd";
import ConfigDropMdlDel from "./ConfigDropMdlDel";

const options = [
  "Categoria",
  "Marca",
  "Entidade",
  "Fornecedor",
  "Categoria/Marca",
  "Modelo",
  "Unidade",
];

const Config = () => {
  //for the new category add:
  const [newCategory, setNewCategory] = useState("");

  //to store data from the api call:
  const [cats, setCats] = useState([]);
  const [brands, setBrands] = useState([]);
  const [ents, setEnts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  //for the models
  const [models, setModels] = useState([]);
  const [newModel, setNewModel] = useState("");

  //for the units
  const [units, setUnits] = useState([]);
  const [newUnit, setNewUnit] = useState("");

  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedEnt, setSelectedEnt] = useState("");

  //Gets all data from the entity,unit, brands and categories (also for unit and model)
  useEffect(() => {
    Promise.all([axiosClient.get("/combinedData")]).then((responses) => {
      setCats(responses[0].data.cats);
      setEnts(responses[0].data.ents);
      setUnits(responses[0].data.units);
      setBrands(responses[0].data.brands);
      setModels(responses[0].data.models);
      setSuppliers(responses[0].data.suppliers);
    });
  }, []);

  // Function to handle brand selection
  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
  };

  // Function to handle ent selection
  const handleEntChange = (e) => {
    setSelectedEnt(e.target.value);
  };

  //-------------Options for Configuration------------------------
  // Previous state variables
  const [selectedOption, setSelectedOption] = useState("");
  const [showNextOptions, setShowNextOptions] = useState(false);
  const [showNextOptionsSecondSet, setShowNextOptionsSecondSet] =
    useState(false);

  // New state variables to save user selections
  const [selectedFirstOption, setSelectedFirstOption] = useState("");
  const [selectedNextOption, setSelectedNextOption] = useState("");
  const additionalOptions = ["Adicionar", "Editar", "Apagar"];

  const handleOptionToggle = (option) => {
    if (selectedOption === option) {
      setSelectedOption("");
    } else {
      setSelectedOption(option);
    }
  };

  const handleNextButtonClick = () => {
    if (!showNextOptions) {
      setShowNextOptions(true);
      setSelectedOption(""); // Clear the selected option when "Next" is clicked

      // Save the first option chosen
      setSelectedFirstOption(selectedOption);
    } else if (!showNextOptionsSecondSet) {
      setShowNextOptionsSecondSet(true);

      // Save the next option (add/edit/delete) chosen
      setSelectedNextOption(selectedOption);
    }
  };

  const handleBackButtonClick = () => {
    if (showNextOptionsSecondSet) {
      setShowNextOptionsSecondSet(false);
    } else if (showNextOptions) {
      setShowNextOptions(false);
    }
  };

  const handleCloseButtonClick = () => {
    setSelectedOption("");
    setShowNextOptions(false);
    setShowNextOptionsSecondSet(false);
  };

  //--------------Category---------------------------------
  //---------------Add new category------------------
  const handleAddCategory = async (event) => {
    event.preventDefault();
    if (newCategory.trim() === "") {
      return;
    }

    // Check if the category already exists in the list
    if (cats.some((category) => category.name === newCategory.trim())) {
      alert("Category already exists.");
      return;
    }

    try {
      // Make a POST request to your backend API
      const response = await axiosClient.post("/categoriesAdd", {
        name: newCategory.trim(),
      });

      // Add the new category to the state
      setCats((prevCategories) => [...prevCategories, response.data]);
      setNewCategory("");
    } catch (err) {
      console.error("Erro ao adicionar categoria", err);
    }
  };

  //---------------Remove a category------------------
  const handleRemoveCategory = async (event) => {
    event.preventDefault();
    const selectedOptions = document.getElementById("list").selectedOptions;
    const categoryToRemove = [...selectedOptions].map((option) => option.value);

    if (categoryToRemove.length === 0) {
      alert("Please select a category to remove.");
      return;
    }

    try {
      // Make a DELETE request to your backend API for category removal
      await Promise.all(
        categoryToRemove.map((categoryId) =>
          axiosClient.delete(`/categoriesDel/${categoryId}`)
        )
      );
      axiosClient.get("/categories").then((response) => {
        setCats(response.data);
      });

      // Remove the deleted categories from the state
      setCats((prevCategories) =>
        prevCategories.filter(
          (category) => !categoryToRemove.includes(category.id)
        )
      );
    } catch (err) {
      console.error("Error removing category", err);
    }
  };

  //-----------Edit a category-------------------------
  const [selectedData, setSelectedData] = useState(null);
  const [editedValue, setEditedValue] = useState("");

  const handleDataSelection = () => {
    const selectedDataName = event.target.value;
    const selectedDataObject = cats.find(
      (data) => data.name === selectedDataName
    );
    setSelectedData(selectedDataObject);
    setEditedValue(selectedDataObject.name);
  };

  const handleDataUpdate = async () => {
    if (editedValue.trim() === "") {
      return;
    }
    console.log("selectedData", selectedData);
    try {
      // Make a PUT request to update the data on the server
      await axiosClient.put(`/categoriesUpdate/${selectedData.id}`, {
        name: editedValue.trim(),
      });

      // Update the data in the state
      setCats((prevData) =>
        prevData.map((data) =>
          data.id === selectedData.id
            ? { ...data, name: editedValue.trim() }
            : data
        )
      );

      // Clear the selected data and edited value
      setSelectedData(null);
      setEditedValue("");
    } catch (err) {
      console.error("Error updating data", err);
    }
  };

  //--------------Brand---------------------------------
  const [newBrand, setNewBrand] = useState("");

  //Add a new brand
  const handleAddBrand = async (event) => {
    event.preventDefault();
    if (newBrand.trim() === "") {
      return;
    }

    // Check if the brand already exists in the list
    if (brands.some((brand) => brand.name === newBrand.trim())) {
      alert("Marca já existe!");
      return;
    }

    try {
      // Make a POST request to your backend API to add a new brand
      const response = await axiosClient.post("/brandsAdd", {
        name: newBrand.trim(),
      });

      // Add the new brand to the state
      setBrands((prevBrands) => [...prevBrands, response.data]);
      setNewBrand("");
    } catch (err) {
      console.error("Erro ao adicionar a marca!", err);
    }
  };

  //Remove a brand
  const handleRemoveBrand = async (event) => {
    event.preventDefault();
    const selectElement = document.getElementById("brand");
    console.log("selectElement", selectElement);
    const selectedOptions = [...selectElement.selectedOptions];
    const brandToRemove = selectedOptions.map((option) => option.value);

    console.log("selectedOptions", selectedOptions);
    console.log("brandToRemove", brandToRemove);
    if (brandToRemove.length === 0) {
      alert("Please select a brand to remove.");
      return;
    }

    try {
      // Make a DELETE request to your backend API for brand removal
      await Promise.all(
        brandToRemove.map((brandId) =>
          axiosClient.delete(`/brandsDel/${brandId}`)
        )
      );

      axiosClient.get("/brands").then((response) => {
        setBrands(response.data);
      });
    } catch (err) {
      console.error("Error removing brand", err);
    }
  };

  //Edit a brand
  //-----------Edit a brand-------------------------
  const [selectedBrData, setSelectedBrData] = useState(null);
  const [editedBrValue, setEditedBrValue] = useState("");

  const handleDataBrSelection = () => {
    const selectedDataName = event.target.value;
    const selectedDataObject = brands.find(
      (data) => data.name === selectedDataName
    );
    setSelectedBrData(selectedDataObject);
    setEditedBrValue(selectedDataObject.name);
  };

  const handleDataBrUpdate = async () => {
    if (editedBrValue.trim() === "") {
      return;
    }
    console.log("selectedData", selectedBrData);
    try {
      // Make a PUT request to update the data on the server
      await axiosClient.put(`/brandUpdate/${selectedBrData.id}`, {
        name: editedBrValue.trim(),
      });

      // Update the data in the state
      setBrands((prevData) =>
        prevData.map((data) =>
          data.id === selectedBrData.id
            ? { ...data, name: editedBrValue.trim() }
            : data
        )
      );

      // Clear the selected data and edited value
      setSelectedBrData(null);
      setEditedBrValue("");
    } catch (err) {
      console.error("Error updating data", err);
    }
  };

  //--------------Entity---------------------------------
  const [newEntity, setNewEntity] = useState("");

  //Add Entity-------------------------
  const handleAddEntity = async (event) => {
    event.preventDefault();
    if (newEntity.trim() === "") {
      return;
    }

    // Check if the entity already exists in the list
    if (ents.some((ent) => ent.name === newEntity.trim())) {
      alert("Entity already exists.");
      return;
    }
    try {
      // Make a POST request to your backend API to add a new entity
      const response = await axiosClient.post("/entAdd", {
        name: newEntity.trim(), // Use the correct field name for the backend
      });

      // Add the new entity to the state
      setEnts((prevEnts) => [...prevEnts, response.data]);
      setNewEntity("");
    } catch (err) {
      console.error("Error adding entity", err);
    }
  };

  //Delete Entity-------------------------
  const handleRemoveEntity = async (event) => {
    event.preventDefault();
    const selectElement = document.getElementById("ent");
    const selectedOptions = Array.from(selectElement.selectedOptions);
    const entToRemove = selectedOptions.map((option) => option.value);

    if (entToRemove.length === 0) {
      alert("Please select a supplier to remove.");
      return;
    }

    try {
      // Make a DELETE request to your backend API for model removal
      await Promise.all(
        entToRemove.map((entId) => axiosClient.delete(`/entDel/${entId}`))
      );

      axiosClient.get("/entities").then((response) => {
        setEnts(response.data);
      });
    } catch (err) {
      console.error("Error removing entity", err);
    }
  };

  //Edit entity
  const [selectedEntData, setSelectedEntData] = useState(null);
  const [editedEntValue, setEditedEntValue] = useState("");

  const handleDataEntSelection = () => {
    const selectedDataName = event.target.value;
    const selectedDataObject = ents.find(
      (data) => data.name === selectedDataName
    );
    setSelectedEntData(selectedDataObject);
    setEditedEntValue(selectedDataObject.name);
  };

  const handleDataEntUpdate = async () => {
    if (editedEntValue.trim() === "") {
      return;
    }
    console.log("selectedData", selectedEntData);
    try {
      // Make a PUT request to update the data on the server
      await axiosClient.put(`/entsUpdate/${selectedEntData.id}`, {
        name: editedEntValue.trim(),
      });

      // Update the data in the state
      setEnts((prevData) =>
        prevData.map((data) =>
          data.id === selectedEntData.id
            ? { ...data, name: editedEntValue.trim() }
            : data
        )
      );

      // Clear the selected data and edited value
      setSelectedEntData(null);
      setEditedEntValue("");
    } catch (err) {
      console.error("Error updating data", err);
    }
  };

  //--------------Supplier---------------------------------
  const [newSupplier, setNewSupplier] = useState("");

  //Add Supplier
  const handleAddSupplier = async (event) => {
    event.preventDefault();
    if (newSupplier.trim() === "") {
      return;
    }

    // Check if the supplier already exists in the list
    if (suppliers.some((supplier) => supplier.name === newSupplier.trim())) {
      alert("Supplier already exists.");
      return;
    }

    try {
      // Make a POST request to your backend API to add a new supplier
      const response = await axiosClient.post("/supplierAdd", {
        name: newSupplier.trim(),
      });

      // Add the new supplier to the state
      setSuppliers((prevSuppliers) => [...prevSuppliers, response.data]);
      setNewSupplier("");
    } catch (err) {
      console.error("Error adding supplier", err);
    }
  };

  //Delete Supplier
  const handleRemoveSupplier = async (event) => {
    event.preventDefault();
    const selectElement = document.getElementById("sup");
    const selectedOptions = Array.from(selectElement.selectedOptions);
    const supToRemove = selectedOptions.map((option) => option.value);

    if (supToRemove.length === 0) {
      alert("Please select a supplier to remove.");
      return;
    }

    try {
      // Make a DELETE request to your backend API for model removal
      await Promise.all(
        supToRemove.map((supId) => axiosClient.delete(`/supplierDel/${supId}`))
      );

      axiosClient.get("/supplier").then((response) => {
        setSuppliers(response.data);
      });
    } catch (err) {
      console.error("Error removing supplier", err);
    }
  };

  //Edit Supplier
  const [selectedSupData, setSelectedSupData] = useState(null);
  const [editedSupValue, setEditedSupValue] = useState("");

  const handleDataSupSelection = () => {
    const selectedDataName = event.target.value;
    const selectedDataObject = suppliers.find(
      (data) => data.name === selectedDataName
    );
    setSelectedSupData(selectedDataObject);
    setEditedSupValue(selectedDataObject.name);
  };

  const handleDataSupUpdate = async () => {
    if (editedSupValue.trim() === "") {
      return;
    }
    console.log("selectedData", selectedSupData);
    try {
      // Make a PUT request to update the data on the server
      await axiosClient.put(`/supUpdate/${selectedSupData.id}`, {
        name: editedSupValue.trim(),
      });

      // Update the data in the state
      setSuppliers((prevData) =>
        prevData.map((data) =>
          data.id === selectedSupData.id
            ? { ...data, name: editedSupValue.trim() }
            : data
        )
      );

      // Clear the selected data and edited value
      setSelectedSupData(null);
      setEditedSupValue("");
    } catch (err) {
      console.error("Error updating data", err);
    }
  };

  //----------------------Models-------------------
  //--------------------------Add Model-------------------------
  // Function to add a new model with the selected brand
  const handleAddModel = async (event) => {
    event.preventDefault();
    if (newModel.trim() === "" || selectedBrand === "") {
      return;
    }

    // Check if the model already exists in the list
    if (models.some((model) => model.name === newModel.trim())) {
      alert("Model already exists.");
      return;
    }

    try {
      // Make a POST request to your backend API to add a new model
      const response = await axiosClient.post("/modelsAdd", {
        name: newModel.trim(),
        brand_id: selectedBrand, // Include the selected brand ID in the request body
      });

      // Add the new model to the state
      setModels((prevModels) => [...prevModels, response.data]);
      setNewModel("");
      setSelectedBrand(""); // Reset selectedBrand after adding the model
    } catch (err) {
      console.error("Error adding model", err);
    }
  };
  //--------------------------Delete Model-------------------------
  const handleRemoveModel = async (event) => {
    event.preventDefault();
    const selectElement = document.getElementById("model");
    const selectedOptions = Array.from(selectElement.selectedOptions);
    const modelToRemove = selectedOptions.map((option) => option.value);

    if (modelToRemove.length === 0) {
      alert("Please select a model to remove.");
      return;
    }

    try {
      // Make a DELETE request to your backend API for model removal
      await Promise.all(
        modelToRemove.map((modelId) =>
          axiosClient.delete(`/modelsDel/${modelId}`)
        )
      );

      axiosClient.get("/modelos").then((response) => {
        setModels(response.data);
      });
    } catch (err) {
      console.error("Error removing model", err);
    }
  };

  //---------Edit Model
  //Edit Supplier
  const [selectedMdlData, setSelectedMdlData] = useState(null);
  const [editedMdlValue, setEditedMdlValue] = useState("");

  const handleDataMdlSelection = () => {
    const selectedDataName = event.target.value;
    const selectedDataObject = models.find(
      (data) => data.name === selectedDataName
    );
    setSelectedMdlData(selectedDataObject);
    setEditedMdlValue(selectedDataObject.name);
  };

  const handleDataMdlUpdate = async () => {
    if (editedMdlValue.trim() === "") {
      return;
    }
    console.log("selectedData", selectedMdlData);
    try {
      // Make a PUT request to update the data on the server
      await axiosClient.put(`/mdlUpdate/${selectedMdlData.id}`, {
        name: editedMdlValue.trim(),
      });

      // Update the data in the state
      setModels((prevData) =>
        prevData.map((data) =>
          data.id === selectedMdlData.id
            ? { ...data, name: editedMdlValue.trim() }
            : data
        )
      );

      // Clear the selected data and edited value
      setSelectedMdlData(null);
      setEditedMdlValue("");
    } catch (err) {
      console.error("Error updating data", err);
    }
  };

  //-------------------Units-------------------
  //--------------------------Add Unit-------------------------
  const handleAddUnit = async (event) => {
    event.preventDefault();
    if (newUnit.trim() === "" || selectedEnt === "") {
      return;
    }

    // Check if the unit already exists in the list
    if (units.some((unit) => unit.name === newUnit.trim())) {
      alert("Unit already exists.");
      return;
    }

    try {
      // Make a POST request to your backend API
      const response = await axiosClient.post("/unitAdd", {
        name: newUnit.trim(),
        ent_id: selectedEnt,
      });

      // Add the new unit to the state
      setUnits((prevUnits) => [...prevUnits, response.data]);
      setNewUnit("");
      setSelectedEnt("");
    } catch (err) {
      console.error("Error adding unit", err);
    }
  };
  //--------------------------Delete Unit-------------------------
  const handleRemoveUnit = async (event) => {
    event.preventDefault();
    const selectedOptions = document.getElementById("unit").selectedOptions;
    const unitToRemove = [...selectedOptions].map((option) => option.value);

    if (unitToRemove.length === 0) {
      alert("Please select a unit to remove.");
      return;
    }

    try {
      // Make a DELETE request to your backend API for unit removal
      await Promise.all(
        unitToRemove.map((unitId) => axiosClient.delete(`/unitDel/${unitId}`))
      );

      // Fetch the updated units list after deletion

      axiosClient.get("/units").then((response) => {
        setUnits(response.data);
      });
    } catch (err) {
      console.error("Error removing unit", err);
    }
  };

  return (
    <div className="form-brd-mdl">
      <h1>Configurações</h1>
      <p className="fr-ini">
        Selecione uma das opções para realizar a configuração
      </p>
      {!showNextOptions && (
        <div className="checkbox-dropdown-container">
          {options.map((option, index) => (
            <label key={index} className="checkbox-label">
              <input
                type="checkbox"
                checked={selectedOption === option}
                onChange={() => handleOptionToggle(option)}
                className="chcb_inpt"
              />
              {option}
            </label>
          ))}
        </div>
      )}
      {showNextOptions && !showNextOptionsSecondSet && (
        <div className="checkbox-dropdown-container">
          {additionalOptions.map((option, index) => (
            <label key={index} className="checkbox-label">
              <input
                type="checkbox"
                checked={selectedOption === option}
                onChange={() => handleOptionToggle(option)}
                className="chcb_inpt"
              />
              {option}
            </label>
          ))}
        </div>
      )}
      {showNextOptionsSecondSet && showNextOptions ? (
        <div>
          {/* -----Categories----- */}
          {selectedFirstOption === "Categoria" &&
            selectedNextOption === "Adicionar" && (
              <ConfigDropAdd
                Title={selectedFirstOption}
                id="category"
                setData={newCategory}
                setNewData={setNewCategory}
                handleAdd={handleAddCategory}
              />
            )}
          {selectedFirstOption === "Categoria" &&
            selectedNextOption === "Apagar" && (
              <ConfigDropdown
                Title={selectedFirstOption}
                id="category"
                tag="list"
                datas={cats}
                handleDel={handleRemoveCategory}
              />
            )}
          {selectedFirstOption === "Categoria" &&
            selectedNextOption === "Editar" && (
              <ConfigDropEdit
                Title={selectedOption}
                tag="list"
                datas={cats}
                selectedData={selectedData}
                handleDataSelection={handleDataSelection}
                editedValue={editedValue}
                setEditedValue={setEditedValue}
                handleDataUpdate={handleDataUpdate}
              />
            )}

          {/** -----Brands------ */}
          {selectedFirstOption === "Marca" &&
            selectedNextOption === "Adicionar" && (
              <ConfigDropAdd
                Title={selectedFirstOption}
                id="category"
                setData={newBrand}
                setNewData={setNewBrand}
                handleAdd={handleAddBrand}
              />
            )}
          {selectedFirstOption === "Marca" &&
            selectedNextOption === "Apagar" && (
              <ConfigDropdown
                Title={selectedFirstOption}
                id="brand"
                tag="brand"
                datas={brands}
                handleDel={handleRemoveBrand}
              />
            )}

          {selectedFirstOption === "Marca" &&
            selectedNextOption === "Editar" && (
              <ConfigDropEdit
                Title={selectedOption}
                tag="list"
                datas={brands}
                selectedData={selectedBrData}
                handleDataSelection={handleDataBrSelection}
                editedValue={editedBrValue}
                setEditedValue={setEditedBrValue}
                handleDataUpdate={handleDataBrUpdate}
              />
            )}

          {/** -----Entity------ */}
          {selectedFirstOption === "Entidade" &&
            selectedNextOption === "Adicionar" && (
              <ConfigDropAdd
                Title={selectedFirstOption}
                id="entidades"
                setData={newEntity}
                setNewData={setNewEntity}
                handleAdd={handleAddEntity}
              />
            )}
          {selectedFirstOption === "Entidade" &&
            selectedNextOption === "Apagar" && (
              <ConfigDropdown
                Title={selectedFirstOption}
                id="entidades"
                tag="ent"
                datas={ents}
                handleDel={handleRemoveEntity}
              />
            )}

          {selectedFirstOption === "Entidade" &&
            selectedNextOption === "Editar" && (
              <ConfigDropEdit
                Title={selectedOption}
                tag="list"
                datas={ents}
                selectedData={selectedEntData}
                handleDataSelection={handleDataEntSelection}
                editedValue={editedEntValue}
                setEditedValue={setEditedEntValue}
                handleDataUpdate={handleDataEntUpdate}
              />
            )}

          {/** -----Supplier------ */}
          {selectedFirstOption === "Fornecedor" &&
            selectedNextOption === "Adicionar" && (
              <ConfigDropAdd
                Title={selectedFirstOption}
                id="sup"
                setData={newSupplier}
                setNewData={setNewSupplier}
                handleAdd={handleAddSupplier}
              />
            )}
          {selectedFirstOption === "Fornecedor" &&
            selectedNextOption === "Apagar" && (
              <ConfigDropdown
                Title={selectedFirstOption}
                id="sup"
                tag="sup"
                datas={suppliers}
                handleDel={handleRemoveSupplier}
              />
            )}
          {selectedFirstOption === "Fornecedor" &&
            selectedNextOption === "Editar" && (
              <ConfigDropEdit
                Title={selectedOption}
                tag="list"
                datas={suppliers}
                selectedData={selectedSupData}
                handleDataSelection={handleDataSupSelection}
                editedValue={editedSupValue}
                setEditedValue={setEditedSupValue}
                handleDataUpdate={handleDataSupUpdate}
              />
            )}

          {/** -----Categories/Brands------ */}

          {/** -----Models------ */}
          {selectedFirstOption === "Modelo" &&
            selectedNextOption === "Adicionar" && (
              <ConfigDropMdlAdd
                Title="Modelo"
                id="model"
                setData={newModel}
                setNewData={setNewModel}
                handleAdd={handleAddModel}
                brands={brands}
                selectedBrand={selectedBrand}
                handleBrandChange={handleBrandChange}
                maintb="Marca"
              />
            )}
          {selectedFirstOption === "Modelo" &&
            selectedNextOption === "Apagar" && (
              <ConfigDropMdlDel
                Title="Modelo"
                id="model"
                tag="model"
                datas={models}
                handleDel={handleRemoveModel}
              />
            )}

          {selectedFirstOption === "Modelo" &&
            selectedNextOption === "Editar" && (
              <ConfigDropEdit
                Title={selectedOption}
                tag="list"
                datas={models}
                selectedData={selectedMdlData}
                handleDataSelection={handleDataMdlSelection}
                editedValue={editedMdlValue}
                setEditedValue={setEditedMdlValue}
                handleDataUpdate={handleDataMdlUpdate}
              />
            )}

          {/** ----Unidade------ */}

          {selectedFirstOption === "Unidade" &&
            selectedNextOption === "Adicionar" && (
              <ConfigDropMdlAdd
                Title="Unidade"
                id="unit"
                setData={newUnit}
                setNewData={setNewUnit}
                handleAdd={handleAddUnit}
                brands={ents}
                selectedBrand={selectedEnt}
                handleBrandChange={handleEntChange}
                maintb="Entidade"
              />
            )}
          {selectedFirstOption === "Unidade" &&
            selectedNextOption === "Apagar" && (
              <ConfigDropMdlDel
                Title="Unidade"
                id="unit"
                tag="unit"
                datas={units}
                handleDel={handleRemoveUnit}
              />
            )}
          <div>
            <button onClick={handleBackButtonClick} className="vl-btn">
              Voltar
            </button>
            <p></p>
            <button onClick={handleCloseButtonClick} className="ini-btn">
              Início
            </button>
          </div>
        </div>
      ) : (
        <button onClick={handleNextButtonClick} className="next-conf">
          Próximo
        </button>
      )}
    </div>
  );
};

export default Config;
