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


Project developed under the EstágiAP XXI Program.
Advisor: Emanuel Gonçalves
Autor: André Ferreira
Local: Hospital de Braga, EPE
Department: Serviço de Sistema de Informação

All the changes made to enable the implementation of the desired development tools were made by André Ferreira.
*/
import React, { useState, useEffect } from "react";
import ConfigDropdown from "./ConfigDropdown";
import "../styles/Config.css"; // Create a CSS file to style the dropdown
import axiosClient from "../axios-client";
import ConfigDropAdd from "./ConfigDropAdd";
import ConfigDropEdit from "./ConfigDropEdit";
import ConfigDropMdlAdd from "./ConfigDropMdlAdd";
import ConfigDropMdlDel from "./ConfigDropMdlDel";
import { Modal, Button } from "react-bootstrap";

const options = [
  "Categoria",
  "Marca",
  "Modelo",
  "Entidade",
  "Unidade",
  "Fornecedor",
  "Categoria/Marca",
];

const Config = () => {
  //for the new category add:
  const [newCategory, setNewCategory] = useState("");

  //store data from the api call:
  const [cats, setCats] = useState([]);
  const [brands, setBrands] = useState([]);
  const [ents, setEnts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  //For the models
  const [models, setModels] = useState([]);
  const [newModel, setNewModel] = useState("");

  //For the units
  const [units, setUnits] = useState([]);
  const [newUnit, setNewUnit] = useState("");

  //Values to keep track of Entity and Brand values:
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedEnt, setSelectedEnt] = useState("");

  //Error and success message to display validation messages
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  //-----------------------------------------------------
  //For the Category/Brand Modal
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  //-----------------------------------------------------

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

  useEffect(() => {
    fetchRelations();
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

  const [selectedRelations, setSelectedRelations] = useState([]);

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

  //for timing the erros
  const clearErrorAfterTimeout = (timeout) => {
    setTimeout(() => {
      setError(null);
    }, timeout);
  };

  const clearSuccessMessageAfterTimeout = (timeout) => {
    setTimeout(() => {
      setSuccessMessage(null);
    }, timeout);
  };

  //--------------Category---------------------------------
  //---------------Add new category------------------
  const handleAddCategory = async () => {
    setError(null); // Clear any previous errors
    if (newCategory.trim() === "") {
      setError("Atenção! Introduza uma categoria.");
      clearErrorAfterTimeout(5000); // Clear the error after 5 seconds
      return;
    }

    // Check if the category already exists in the list
    if (cats.some((category) => category.name === newCategory.trim())) {
      setError("Atenção! Categoria já existe!");
      clearErrorAfterTimeout(5000); // Clear the error after 5 seconds
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
      setSuccessMessage("Categoria adicionada com sucesso!");
      clearSuccessMessageAfterTimeout(5000);
    } catch (err) {
      setError("Erro ao adicionar categoria. Por favor tente outra vez.");
      clearErrorAfterTimeout(5000); // Clear the error after 5 seconds
    }
  };

  //---------------Remove a category------------------
  const handleRemoveCategory = async () => {
    setError(null); // Clear any previous errors
    const selectedOptions = document.getElementById("list").selectedOptions;
    const categoryToRemove = [...selectedOptions].map((option) => option.value);

    if (categoryToRemove.length === 0) {
      setError("Por favor, selecione uma categoria para remover.");
      clearErrorAfterTimeout(5000);
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

      setSuccessMessage("Categoria removida com sucesso!");
      clearSuccessMessageAfterTimeout(5000);
      // Remove the deleted categories from the state
      setCats((prevCategories) =>
        prevCategories.filter(
          (category) => !categoryToRemove.includes(category.id)
        )
      );
    } catch (err) {
      setError("Erro ao remover a categoria. Por favor tente outra vez.");
      clearErrorAfterTimeout(5000);
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
      setError("Atenção! Não pode guardar uma categoria com valor nulo.");
      clearErrorAfterTimeout(5000);
      return;
    }

    try {
      // Make a PUT request to update the data on the server
      await axiosClient.put(`/categoriesUpdate/${selectedData.id}`, {
        name: editedValue.trim(),
      });
      setSuccessMessage("Categoria editada com sucesso!");
      clearSuccessMessageAfterTimeout(5000);
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
      setError("Atenção! Erro ao editar, tente novamente.");
      clearErrorAfterTimeout(5000);
    }
  };

  //--------------Brand---------------------------------
  const [newBrand, setNewBrand] = useState("");

  //Add a new brand
  const handleAddBrand = async () => {
    setError(null); // Clear any previous errors
    if (newBrand.trim() === "") {
      setError("Atenção! Introduza uma marca.");
      clearErrorAfterTimeout(5000); // Clear the error after 5 seconds
      return;
    }

    // Check if the brand already exists in the list
    if (brands.some((brand) => brand.name === newBrand.trim())) {
      setError("Atenção! Marca já existe!");
      clearErrorAfterTimeout(5000); // Clear the error after 5 seconds
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

      setSuccessMessage("Marca adicionada com sucesso!");
      clearSuccessMessageAfterTimeout(5000);
    } catch (err) {
      setError("Erro ao adicionar marca. Por favor tente outra vez.");
      clearErrorAfterTimeout(5000);
    }
  };

  //Remove a brand
  const handleRemoveBrand = async () => {
    const selectElement = document.getElementById("brand");

    const selectedOptions = [...selectElement.selectedOptions];
    const brandToRemove = selectedOptions.map((option) => option.value);

    if (brandToRemove.length === 0) {
      setError("Por favor, selecione uma marca para remover.");
      clearErrorAfterTimeout(5000);
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

      setSuccessMessage("Marca removida com sucesso!");
      clearSuccessMessageAfterTimeout(5000);
    } catch (err) {
      setError("Erro ao remover a marca. Por favor tente outra vez.");
      clearErrorAfterTimeout(5000);
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
      setError("Atenção! Não pode guardar uma marca com valor nulo.");
      clearErrorAfterTimeout(5000);
      return;
    }

    try {
      // Make a PUT request to update the data on the server
      await axiosClient.put(`/brandUpdate/${selectedBrData.id}`, {
        name: editedBrValue.trim(),
      });

      setSuccessMessage("Marca editada com sucesso!");
      clearSuccessMessageAfterTimeout(5000);

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
      setError("Atenção! Erro ao editar, tente novamente.");
      clearErrorAfterTimeout(5000);
    }
  };

  //--------------Entity---------------------------------
  const [newEntity, setNewEntity] = useState("");

  //Add Entity-------------------------
  const handleAddEntity = async () => {
    setError(null);

    if (newEntity.trim() === "") {
      setError("Atenção! Introduza uma entidade.");
      clearErrorAfterTimeout(5000); // Clear the error after 5 seconds
      return;
    }

    // Check if the entity already exists in the list
    if (ents.some((ent) => ent.name === newEntity.trim())) {
      setError("Atenção! Entidade já existe!");
      clearErrorAfterTimeout(5000); // Clear the error after 5 seconds;
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
      setSuccessMessage("Entidade adicionada com sucesso!");
      clearSuccessMessageAfterTimeout(5000);
    } catch (err) {
      setError("Erro ao adicionar categoria. Por favor tente outra vez.");
      clearErrorAfterTimeout(5000);
    }
  };

  //Delete Entity-------------------------
  const handleRemoveEntity = async () => {
    setError(null);

    const selectElement = document.getElementById("ent");
    const selectedOptions = Array.from(selectElement.selectedOptions);
    const entToRemove = selectedOptions.map((option) => option.value);

    if (entToRemove.length === 0) {
      setError("Por favor, selecione uma entidade para remover.");
      clearErrorAfterTimeout(5000);
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
      setSuccessMessage("Entidade removida com sucesso!");
      clearSuccessMessageAfterTimeout(5000);
    } catch (err) {
      setError("Erro ao remover a entidade. Por favor tente outra vez.");
      clearErrorAfterTimeout(5000);
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
      setError("Atenção! Não pode guardar uma entidade com valor nulo.");
      clearErrorAfterTimeout(5000);
      return;
    }

    try {
      // Make a PUT request to update the data on the server
      await axiosClient.put(`/entsUpdate/${selectedEntData.id}`, {
        name: editedEntValue.trim(),
      });
      setSuccessMessage("Entidade editada com sucesso!");
      clearSuccessMessageAfterTimeout(5000);
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
      setError("Atenção! Erro ao editar, tente novamente.");
      clearErrorAfterTimeout(5000);
    }
  };

  //--------------Supplier---------------------------------
  const [newSupplier, setNewSupplier] = useState("");

  //Add Supplier
  const handleAddSupplier = async () => {
    setError(null);
    if (newSupplier.trim() === "") {
      setError("Atenção! Introduza um fornecedor.");
      clearErrorAfterTimeout(5000);
      return;
    }

    // Check if the supplier already exists in the list
    if (suppliers.some((supplier) => supplier.name === newSupplier.trim())) {
      setError("Atenção! Fornecedor já existe!");
      clearErrorAfterTimeout(5000);
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
      setSuccessMessage("Fornecedor adicionado com sucesso!");
      clearSuccessMessageAfterTimeout(5000);
    } catch (err) {
      setError("Erro ao adicionar fornecedor. Por favor tente outra vez.");
      clearErrorAfterTimeout(5000);
    }
  };

  //Delete Supplier
  const handleRemoveSupplier = async () => {
    setError(null);
    const selectElement = document.getElementById("sup");
    const selectedOptions = Array.from(selectElement.selectedOptions);
    const supToRemove = selectedOptions.map((option) => option.value);

    if (supToRemove.length === 0) {
      setError("Por favor, selecione um fornecedor para remover.");
      clearErrorAfterTimeout(5000);
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
      setSuccessMessage("Fornecedor removido com sucesso!");
      clearSuccessMessageAfterTimeout(5000);
    } catch (err) {
      setError("Erro ao remover o fornecedor. Por favor tente outra vez.");
      clearErrorAfterTimeout(5000);
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
      setError("Atenção! Não pode guardar um fornecedor com valor nulo.");
      clearErrorAfterTimeout(5000);
      return;
    }

    try {
      // Make a PUT request to update the data on the server
      await axiosClient.put(`/supUpdate/${selectedSupData.id}`, {
        name: editedSupValue.trim(),
      });

      setSuccessMessage("Fornecedor editado com sucesso!");
      clearSuccessMessageAfterTimeout(5000);

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
      setError("Atenção! Erro ao editar, tente novamente.");
      clearErrorAfterTimeout(5000);
    }
  };

  //----------------------Models-------------------
  //--------------------------Add Model-------------------------
  // Function to add a new model with the selected brand
  const handleAddModel = async () => {
    setError(null);
    if (newModel.trim() === "") {
      setError("Atenção! Introduza um modelo.");
      clearErrorAfterTimeout(5000);
      return;
    }

    if (selectedBrand === "") {
      setError("Atenção! Selecione uma marca.");
      clearErrorAfterTimeout(5000);
      return;
    }

    // Check if the model already exists in the list
    if (models.some((model) => model.name === newModel.trim())) {
      setError("Atenção! Modelo já existe!");
      clearErrorAfterTimeout(5000);
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
      setSuccessMessage("Modelo adicionado com sucesso!");
      clearSuccessMessageAfterTimeout(5000);
    } catch (err) {
      setError("Erro ao adicionar modelo. Por favor tente outra vez.");
      clearErrorAfterTimeout(5000);
    }
  };
  //--------------------------Delete Model-------------------------
  const handleRemoveModel = async () => {
    const selectElement = document.getElementById("model");
    const selectedOptions = Array.from(selectElement.selectedOptions);
    const modelToRemove = selectedOptions.map((option) => option.value);

    if (modelToRemove.length === 0) {
      setError("Atenção! Selecione um modelo para remover.");
      clearErrorAfterTimeout(5000);
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
      setSuccessMessage("Modelo removido com sucesso!");
      clearSuccessMessageAfterTimeout(5000);
    } catch (err) {
      setError("Erro ao remover o modelo. Por favor tente outra vez.");
      clearErrorAfterTimeout(5000);
    }
  };

  //---------Edit Model
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
      setError("Atenção! Não pode guardar um modelo com valor nulo.");
      clearErrorAfterTimeout(5000);
      return;
    }

    try {
      // Make a PUT request to update the data on the server
      await axiosClient.put(`/mdlUpdate/${selectedMdlData.id}`, {
        name: editedMdlValue.trim(),
      });
      setSuccessMessage("Modelo editado com sucesso!");
      clearSuccessMessageAfterTimeout(5000);
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
      setError("Atenção! Erro ao editar, tente novamente.");
      clearErrorAfterTimeout(5000);
    }
  };

  //-------------------Units-------------------
  //--------------------------Add Unit-------------------------
  const handleAddUnit = async () => {
    setError(null);
    if (newUnit.trim() === "") {
      setError("Atenção! Introduza uma unidade.");
      clearErrorAfterTimeout(5000);
      return;
    }
    if (selectedEnt === "") {
      setError("Atenção! Selecione uma entidade.");
      clearErrorAfterTimeout(5000);
      return;
    }

    // Check if the unit already exists in the list
    if (units.some((unit) => unit.name === newUnit.trim())) {
      setError("Atenção! Unidade já existe!");
      clearErrorAfterTimeout(5000);
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
      setSuccessMessage("Unidade adicionada com sucesso!");
      clearSuccessMessageAfterTimeout(5000);
    } catch (err) {
      setError("Erro ao adicionar unidade. Por favor tente outra vez.");
      clearErrorAfterTimeout(5000);
    }
  };
  //--------------------------Delete Unit-------------------------
  const handleRemoveUnit = async () => {
    const selectedOptions = document.getElementById("unit").selectedOptions;
    const unitToRemove = [...selectedOptions].map((option) => option.value);

    if (unitToRemove.length === 0) {
      setError("Atenção! Selecione uma unidade para remover.");
      clearErrorAfterTimeout(5000);
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
      setSuccessMessage("Unidade removida com sucesso!");
      clearSuccessMessageAfterTimeout(5000);
    } catch (err) {
      setError("Erro ao remover a unidade. Por favor tente outra vez.");
      clearErrorAfterTimeout(5000);
    }
  };

  //Edit Unit
  const [selectedUntData, setSelectedUntData] = useState(null);
  const [editedUntValue, setEditedUntValue] = useState("");

  const handleDataUntSelection = () => {
    const selectedDataName = event.target.value;
    const selectedDataObject = units.find(
      (data) => data.name === selectedDataName
    );
    setSelectedUntData(selectedDataObject);
    setEditedUntValue(selectedDataObject.name);
  };

  const handleDataUntUpdate = async () => {
    if (editedUntValue.trim() === "") {
      setError("Atenção! Não pode guardar uma unidade com valor nulo.");
      clearErrorAfterTimeout(5000);
      return;
    }

    try {
      // Make a PUT request to update the data on the server
      await axiosClient.put(`/unitUpdate/${selectedUntData.id}`, {
        name: editedUntValue.trim(),
      });
      setSuccessMessage("Unidade editada com sucesso!");
      clearSuccessMessageAfterTimeout(5000);
      // Update the data in the state
      setUnits((prevData) =>
        prevData.map((data) =>
          data.id === selectedUntData.id
            ? { ...data, name: editedUntValue.trim() }
            : data
        )
      );

      // Clear the selected data and edited value
      setSelectedUntData(null);
      setEditedUntValue("");
    } catch (err) {
      setError("Atenção! Erro ao editar, tente novamente.");
      clearErrorAfterTimeout(5000);
    }
  };

  const [relations, setRelations] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  //----------------For the category and brand---------------------
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Check if a brand is selected from the dropdown or if a new brand name is provided
      let brandId;
      if (selectedBrand) {
        brandId = selectedBrand;
      } else {
        setError(
          "Atenção! Necessita de selecionar um valor da Categoria e/ou Marca."
        );
        clearErrorAfterTimeout(5000);
        return;
      }
      console.log(selectedBrand);
      if (selectedBrand === "") {
        setError("Atenção! Selecione uma marca.");
        clearErrorAfterTimeout(5000);
      }

      // Add the category-brand relation
      const categoryBrand = {
        category_id: selectedCategory,
        brand_id: brandId,
      };
      await axiosClient.post("/categoryBrands", categoryBrand);

      setSuccessMessage("Relação Categoria/Marca adicionada com sucesso!");
      clearSuccessMessageAfterTimeout(5000);

      fetchRelations();
    } catch (err) {
      if (err.response && err.response.status === 422) {
        setError(err.response.data.errors);
      } else {
        setError("Atenção! Necessita de selecionar alguns valores.");
        clearErrorAfterTimeout(5000);
      }
    }
    handleCloseModal();
  };

  // Fetch the relations between category and brand from the backend API
  const fetchRelations = async () => {
    try {
      const response = await axiosClient.get("/category-brands");
      setRelations(response.data);
    } catch (error) {
      setError("Atenção! Erro ao carregar todas as relações.");
      clearErrorAfterTimeout(5000);
    }
  };

  // Function to handle the removal of a relation
  const handleRemoveRelation = async (relationId, event) => {
    event.preventDefault();
    try {
      // Make a DELETE request to your backend API for relation removal
      await axiosClient.delete(`/category-brandsDel/${relationId}`);
      setSuccessMessage("Relação Categoria/Marca removida com sucesso!");
      clearSuccessMessageAfterTimeout(5000);

      // Fetch the updated relations data and update the list
      fetchRelations();
    } catch (err) {
      setError("Atenção! Erro ao remover a relação selecionada.");
      clearErrorAfterTimeout(5000);
    }
    handleCloseModal();
  };

  const handleRemoveSelectedRelations = async () => {
    try {
      if (selectedRelations.length === 0) {
        setError("Atenção! Selecione pelo menos uma relação para remover.");
        clearErrorAfterTimeout(5000);
        return;
      }
      // Iterate over selected relation IDs and remove them one by one
      for (const relationId of selectedRelations) {
        await handleRemoveRelation(relationId, event);
      }
      // Fetch the updated relations data after removing the selected relations
      fetchRelations();
    } catch (err) {
      setError("Atenção! Erro ao remover as relações selecionadas.");
      clearErrorAfterTimeout(5000);
    }
    // Clear the selection after removing the relations
    setSelectedRelations([]);
  };

  //handles the selection of the Category/Brands
  const handleCheckboxChange = (event, relationId) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedRelations((prevSelected) => [...prevSelected, relationId]);
    } else {
      setSelectedRelations((prevSelected) =>
        prevSelected.filter((id) => id !== relationId)
      );
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
        <div className="checkbox-dropdown-containerr">
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
                error={error}
                successMessage={successMessage}
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
                error={error}
                successMessage={successMessage}
              />
            )}
          {selectedFirstOption === "Categoria" &&
            selectedNextOption === "Editar" && (
              <ConfigDropEdit
                Title={selectedFirstOption}
                tag="list"
                datas={cats}
                selectedData={selectedData}
                handleDataSelection={handleDataSelection}
                editedValue={editedValue}
                setEditedValue={setEditedValue}
                handleDataUpdate={handleDataUpdate}
                error={error}
                successMessage={successMessage}
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
                error={error}
                successMessage={successMessage}
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
                error={error}
                successMessage={successMessage}
              />
            )}

          {selectedFirstOption === "Marca" &&
            selectedNextOption === "Editar" && (
              <ConfigDropEdit
                Title={selectedFirstOption}
                tag="list"
                datas={brands}
                selectedData={selectedBrData}
                handleDataSelection={handleDataBrSelection}
                editedValue={editedBrValue}
                setEditedValue={setEditedBrValue}
                handleDataUpdate={handleDataBrUpdate}
                error={error}
                successMessage={successMessage}
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
                error={error}
                successMessage={successMessage}
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
                error={error}
                successMessage={successMessage}
              />
            )}

          {selectedFirstOption === "Entidade" &&
            selectedNextOption === "Editar" && (
              <ConfigDropEdit
                Title={selectedFirstOption}
                tag="list"
                datas={ents}
                selectedData={selectedEntData}
                handleDataSelection={handleDataEntSelection}
                editedValue={editedEntValue}
                setEditedValue={setEditedEntValue}
                handleDataUpdate={handleDataEntUpdate}
                error={error}
                successMessage={successMessage}
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
                error={error}
                successMessage={successMessage}
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
                error={error}
                successMessage={successMessage}
              />
            )}
          {selectedFirstOption === "Fornecedor" &&
            selectedNextOption === "Editar" && (
              <ConfigDropEdit
                Title={selectedFirstOption}
                tag="list"
                datas={suppliers}
                selectedData={selectedSupData}
                handleDataSelection={handleDataSupSelection}
                editedValue={editedSupValue}
                setEditedValue={setEditedSupValue}
                handleDataUpdate={handleDataSupUpdate}
                error={error}
                successMessage={successMessage}
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
                error={error}
                successMessage={successMessage}
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
                error={error}
                successMessage={successMessage}
              />
            )}

          {selectedFirstOption === "Modelo" &&
            selectedNextOption === "Editar" && (
              <ConfigDropEdit
                Title={selectedFirstOption}
                tag="list"
                datas={models}
                selectedData={selectedMdlData}
                handleDataSelection={handleDataMdlSelection}
                editedValue={editedMdlValue}
                setEditedValue={setEditedMdlValue}
                handleDataUpdate={handleDataMdlUpdate}
                error={error}
                successMessage={successMessage}
              />
            )}

          {/** ----Unit------ */}

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
                error={error}
                successMessage={successMessage}
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
                error={error}
                successMessage={successMessage}
              />
            )}
          {selectedFirstOption === "Unidade" &&
            selectedNextOption === "Editar" && (
              <ConfigDropEdit
                Title={selectedFirstOption}
                tag="list"
                datas={units}
                selectedData={selectedUntData}
                handleDataSelection={handleDataUntSelection}
                editedValue={editedUntValue}
                setEditedValue={setEditedUntValue}
                handleDataUpdate={handleDataUntUpdate}
                error={error}
                successMessage={successMessage}
              />
            )}
          {/* ------------Category/Brand------------------ */}
          <div>
            {selectedFirstOption === "Categoria/Marca" &&
              selectedNextOption === "Adicionar" && (
                <div id="container-config">
                  <form>
                    <h4 className="titleconfig">
                      Adicionar relação Categoria/Marca:
                    </h4>

                    {/* Category*/}
                    <label className="configlb">Categoria:</label>
                    <select
                      name="category"
                      id="category"
                      value={selectedCategory}
                      className="configSelect"
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <option value=""></option>
                      {cats.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>

                    {/* Brand*/}
                    <label className="configlb">Marca:</label>
                    <select
                      name="brand"
                      id="brand"
                      value={selectedBrand}
                      className="configSelect"
                      onChange={(e) => setSelectedBrand(e.target.value)}
                    >
                      <option value=""></option>
                      {brands.map((brand) => (
                        <option key={brand.id} value={brand.id}>
                          {brand.name}
                        </option>
                      ))}
                    </select>

                    <button
                      type="button"
                      className="addConfig"
                      onClick={handleShowModal}
                    >
                      <i
                        className="fa fa-plus fa-lg"
                        aria-hidden="true"
                        title="Adicionar"
                      ></i>
                    </button>
                  </form>

                  {error && <p className="errorMessag">{error}</p>}
                  {successMessage && (
                    <p className="successMessag">{successMessage}</p>
                  )}
                  <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                      <Modal.Title> Confirmação</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      {/* Add content inside the modal here */}
                      {/* For example, you can display some information related to the Title */}
                      <p>
                        {" "}
                        Tem a certeza que pretende adicionar Categoria/Marca?
                      </p>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="primary"
                        onClick={(e) => handleSubmit(e)}
                      >
                        Confirmar
                      </Button>
                      <Button variant="secondary" onClick={handleCloseModal}>
                        Cancelar
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              )}
            {selectedFirstOption === "Categoria/Marca" &&
              selectedNextOption === "Editar" && (
                <h4>
                  Atenção! De momento não é possível editar uma relação
                  Categoria/Marca
                </h4>
              )}
            {selectedFirstOption === "Categoria/Marca" &&
              selectedNextOption === "Apagar" && (
                <div id="container-config">
                  <form>
                    {/* List of relations */}
                    <div id="container-config-rel">
                      <h4>Relações Categoria - Marca</h4>
                      <ul className="relations-list">
                        {relations.map((relation) => (
                          <li key={relation.id}>
                            <label className="lbs-cats-brs">
                              <input
                                type="checkbox"
                                checked={selectedRelations.includes(
                                  relation.id
                                )}
                                onChange={(e) =>
                                  handleCheckboxChange(e, relation.id)
                                }
                                className="check-cats-br"
                              />
                              {`${
                                cats.find(
                                  (cat) => cat.id === relation.category_id
                                )?.name || "Categoria desconhecida"
                              } - ${
                                brands.find(
                                  (brand) => brand.id === relation.brand_id
                                )?.name || "Marca desconhecida"
                              }`}
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button
                      type="button"
                      onClick={handleShowModal}
                      className="btn-rel-br"
                    >
                      <i
                        className="fa fa-trash fa-lg"
                        aria-hidden="true"
                        title="Apagar"
                      ></i>
                    </button>
                  </form>
                  {error && <p className="errorMessag">{error}</p>}
                  {successMessage && (
                    <p className="successMessag">{successMessage}</p>
                  )}

                  <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                      <Modal.Title> Confirmação</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      {/* Add content inside the modal here */}
                      {/* For example, you can display some information related to the Title */}
                      <p>
                        {" "}
                        Tem a certeza que pretende eliminar Categoria/Marca?
                      </p>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="primary"
                        onClick={(e) => handleRemoveSelectedRelations(e)}
                      >
                        Confirmar
                      </Button>
                      <Button variant="secondary" onClick={handleCloseModal}>
                        Cancelar
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              )}

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
