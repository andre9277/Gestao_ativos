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
import ConfigBr from "./ConfigBr";

const options = [
  "Categoria",
  "Fornecedor",
  "Marca",
  "Modelo",
  "Entidade",
  "Unidade",
];

const Config = () => {
  //For the category´s
  const [cats, setCats] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  //For the brands
  const [brands, setBrands] = useState([]);
  const [newBrand, setNewBrand] = useState("");

  //for the entitys
  const [ents, setEnts] = useState([]);

  //for the suppliers
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

  //Shows all the relations of categories and brands
  useEffect(() => {
    fetchRelationss();
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

  //Tracking of options selected:
  const [hasSelectedOption, setHasSelectedOption] = useState(false);
  const [showFirstSetMessage, setShowFirstSetMessage] = useState(false);
  const [showSecondSetMessage, setShowSecondSetMessage] = useState(false);

  const [showNextOptions, setShowNextOptions] = useState(false);
  const [showNextOptionsSecondSet, setShowNextOptionsSecondSet] =
    useState(false);

  // New state variables to save user selections
  const [selectedFirstOption, setSelectedFirstOption] = useState("");
  const [selectedNextOption, setSelectedNextOption] = useState("");

  //Options of the second options phase
  const additionalOptions = ["Adicionar", "Editar", "Apagar"];

  //Text for each option of the configurations, displayed under every option
  const getOptionExplanation = (option) => {
    // Define explanations for each option here
    const explanations = {
      Categoria: "Esta opção permite configurar as categorias.",
      Marca: "Esta opção permite configurar as marcas.",
      Modelo: "Esta opção permite configurar as modelos.",
      Entidade: "Esta opção permite configurar as entidades.",
      Unidade: "Esta opção permite configurar as unidades.",
      Fornecedor: "Esta opção permite configurar os fornecedores.",
      "Categoria/Marca":
        "Esta opção permite configurar as relações categoria/marca.",
      Adicionar: "Esta operação permite adicionar.",
      Editar: "Esta operação permite editar.",
      Apagar: "Esta operação permite apgar.",
    };

    return explanations[option] ? (
      <i className="option-explanation">{explanations[option]}</i>
    ) : null;
  };

  //-----------Keep track of edited relation of Brand/Categ---------

  // Fetch the relations between category and brand from the backend API
  const fetchRelationss = async () => {
    try {
      const response = await axiosClient.get("/category-brands");
      setRelations(response.data);
    } catch (error) {
      setError("Atenção! Erro ao carregar todas as relações.");
      clearErrorAfterTimeout(5000);
    }
  };

  //------------------Options of Configuration-------------------------------
  const handleOptionToggle = (option) => {
    if (selectedOption === option) {
      setSelectedOption("");
      setHasSelectedOption(false);
    } else {
      setSelectedOption(option);
      setHasSelectedOption(true);
    }
  };

  const handleNextButtonClick = () => {
    // Reset hasSelectedOption to false when moving to the second set
    setHasSelectedOption(false);

    if (!showNextOptions) {
      if (!hasSelectedOption) {
        setShowFirstSetMessage(true);
        setTimeout(() => {
          setShowFirstSetMessage(false);
        }, 3000); // Hide the message after 3000 milliseconds (3 seconds)
        return; // Abort the function and prevent further actions
      }
      setShowNextOptions(true);
      setSelectedOption(""); // Clear the selected option when "Next" is clicked
      setShowFirstSetMessage(false); // Hide the message for the first set

      // Save the first option chosen
      setSelectedFirstOption(selectedOption);
    } else if (!showNextOptionsSecondSet) {
      if (!hasSelectedOption) {
        setShowSecondSetMessage(true);
        setTimeout(() => {
          setShowSecondSetMessage(false);
        }, 3000); // Hide the message after 3000 milliseconds (3 seconds)
        return; // Abort the function and prevent further actions
      }
      setShowNextOptionsSecondSet(true);
      setShowSecondSetMessage(false); // Hide the message for the second set

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

    // Reset the hasSelectedOption state to false when going back to the initial menu
    setHasSelectedOption(false);

    // Clear the selected options for both sets
    setSelectedOption("");
    setSelectedNextOption("");
    setEditedValue("");
    if (selectedNextOption === "") {
      setSelectedFirstOption("");
    }

    setSelectedNextOption("");
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
      setShowNextOptions(false);
      setShowNextOptionsSecondSet(false);
      setSelectedFirstOption("");
      setSelectedNextOption("");
    }, timeout);
  };

  //--------------Category---------------------------------
  //---------------Add new category------------------
  const handleAddCategory = async () => {
    setError(null); // Clear any previous errors

    //Validate the category name:
    const categoryRegex = /^[A-Za-z ]+$/;

    if (newCategory.trim() === "") {
      setError("Atenção! Introduza uma categoria.");
      clearErrorAfterTimeout(5000); // Clear the error after 5 seconds
      return;
    }

    if (!categoryRegex.test(newCategory.trim())) {
      setError("Atenção! A categoria só pode conter letras.");
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
      clearSuccessMessageAfterTimeout(2000);
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
      clearSuccessMessageAfterTimeout(2000);
      // Remove the deleted categories from the state
      setCats((prevCategories) =>
        prevCategories.filter(
          (category) => !categoryToRemove.includes(category.id)
        )
      );
    } catch (err) {
      setError(
        "Erro ao remover a categoria. Por favor tente outra vez. Verifique se existe alguma relação Categoria/Marca!"
      );
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
    setError(null);

    // Define a regular expression to validate the category name
    const categoryRegex = /^[A-Za-z ]+$/;

    if (editedValue.trim() === "") {
      setError("Atenção! Não pode guardar uma categoria com valor nulo.");
      clearErrorAfterTimeout(5000);
      return;
    }

    if (!categoryRegex.test(editedValue.trim())) {
      setError("Atenção! A categoria só pode conter letras.");
      clearErrorAfterTimeout(5000);
      return;
    }

    try {
      // Make a PUT request to update the data on the server
      await axiosClient.put(`/categoriesUpdate/${selectedData.id}`, {
        name: editedValue.trim(),
      });
      setSuccessMessage("Categoria editada com sucesso!");
      clearSuccessMessageAfterTimeout(2000);
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

  //---------Add a new brand---------
  const handleAddBrand = async (selectedCategoryID) => {
    setError(null); // Clear any previous errors

    // Validate the brand name
    const brandRegex = /^[A-Za-z0-9- ]+$/;

    if (newBrand.trim() === "") {
      setError("Atenção! Introduza uma marca.");
      clearErrorAfterTimeout(5000); // Clear the error after 5 seconds
      return;
    }

    if (!brandRegex.test(newBrand.trim())) {
      setError("Atenção! A marca só pode conter letras, números e hífen.");
      clearErrorAfterTimeout(5000); // Clear the error after 5 seconds
      return;
    }

    try {
      // Make a POST request to your backend API to add a new brand
      const response = await axiosClient.post("/brandsAdd", {
        name: newBrand.trim(),
      });

      const newBrandID = response.data.id;

      // Make a POST request to add the category-brand relation
      const categoryBrand = {
        category_id: selectedCategoryID,
        brand_id: newBrandID,
      };
      await axiosClient.post("/categoryBrands", categoryBrand);

      // Fetch the updated relations data and update the state
      await fetchRelationss();

      // Add the new brand to the state
      setBrands((prevBrands) => [...prevBrands, response.data]);
      setNewBrand("");
      setSelectedCategory("");
      setSuccessMessage("Marca adicionada com sucesso!");
      clearSuccessMessageAfterTimeout(2000);
    } catch (err) {
      setError("Erro ao adicionar marca. Por favor tente outra vez.");
      clearErrorAfterTimeout(5000);
    }
  };

  //Handle remove brand function
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
      // Find and delete the relations for the brands to be removed
      await Promise.all(
        brandToRemove.map(async (brandId) => {
          // Find the relation ID for the given brandId
          const relationId = findRelationIdByBrandId(brandId);

          if (relationId) {
            // Delete the relation using the relation ID
            await axiosClient.delete(`/category-brandsDel/${relationId}`);
          }

          // Delete the brand
          await axiosClient.delete(`/brandsDel/${brandId}`);
        })
      );

      // Fetch the updated brands data and update the state
      axiosClient.get("/brands").then((response) => {
        setBrands(response.data);
      });

      setSuccessMessage("Marca removida com sucesso!");
      clearSuccessMessageAfterTimeout(2000);
    } catch (err) {
      setError("Erro ao remover a marca. Por favor tente outra vez.");
      clearErrorAfterTimeout(5000);
    }
  };

  //Function that gets the  brandid of the relations of the category_brand table
  const findRelationIdByBrandId = (brandId) => {
    const brandIdNumber = Number(brandId); // Convert brandId to a number
    const relation = relations.find((rel) => rel.brand_id === brandIdNumber);

    return relation ? relation.id : null;
  };

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
    setError(null);

    // Validate the brand name
    const brandRegex = /^[A-Za-z0-9- ]+$/;

    if (editedBrValue.trim() === "") {
      setError("Atenção! Não pode guardar uma marca com valor nulo.");
      clearErrorAfterTimeout(5000);
      return;
    }

    if (!brandRegex.test(editedBrValue.trim())) {
      setError("Atenção! A marca só pode conter letras, números e hífen.");
      clearErrorAfterTimeout(5000); // Clear the error after 5 seconds
      return;
    }

    try {
      // Make a PUT request to update the data on the server
      await axiosClient.put(`/brandUpdate/${selectedBrData.id}`, {
        name: editedBrValue.trim(),
      });

      setSuccessMessage("Marca editada com sucesso!");
      clearSuccessMessageAfterTimeout(2000);

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

  //--------------Entity-----------------------
  const [newEntity, setNewEntity] = useState("");

  //---------Add Entity-------------------------
  const handleAddEntity = async () => {
    setError(null);

    //Validate the entity name:
    const entRegex = /^[A-Za-z ]+$/;

    if (newEntity.trim() === "") {
      setError("Atenção! Introduza uma entidade.");
      clearErrorAfterTimeout(5000); // Clear the error after 5 seconds
      return;
    }

    if (!entRegex.test(newEntity.trim())) {
      setError("Atenção! A entidade só pode conter letras.");
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
      clearSuccessMessageAfterTimeout(2000);
    } catch (err) {
      setError("Erro ao adicionar categoria. Por favor tente outra vez.");
      clearErrorAfterTimeout(5000);
    }
  };

  //---------Delete Entity-------------------------
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
      clearSuccessMessageAfterTimeout(2000);
    } catch (err) {
      setError("Erro ao remover a entidade. Por favor tente outra vez.");
      clearErrorAfterTimeout(5000);
    }
  };

  //---------Edit entity---------
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
    setError(null);

    // Define a regular expression to validate the category name
    const entRegex = /^[A-Za-z ]+$/;

    if (editedEntValue.trim() === "") {
      setError("Atenção! Não pode guardar uma entidade com valor nulo.");
      clearErrorAfterTimeout(5000);
      return;
    }

    if (!entRegex.test(editedEntValue.trim())) {
      setError("Atenção! A entidade só pode conter letras.");
      clearErrorAfterTimeout(5000);
      return;
    }

    try {
      // Make a PUT request to update the data on the server
      await axiosClient.put(`/entsUpdate/${selectedEntData.id}`, {
        name: editedEntValue.trim(),
      });
      setSuccessMessage("Entidade editada com sucesso!");
      clearSuccessMessageAfterTimeout(2000);
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

  //---------Add Supplier---------
  const handleAddSupplier = async () => {
    setError(null);

    //Validate the supplier name:
    const suppRegex = /^[A-Za-z ]+$/;

    if (newSupplier.trim() === "") {
      setError("Atenção! Introduza um fornecedor.");
      clearErrorAfterTimeout(5000);
      return;
    }

    if (!suppRegex.test(newSupplier.trim())) {
      setError("Atenção! O fornecedor só pode conter letras.");
      clearErrorAfterTimeout(5000); // Clear the error after 5 seconds
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
      clearSuccessMessageAfterTimeout(2000);
    } catch (err) {
      setError("Erro ao adicionar fornecedor. Por favor tente outra vez.");
      clearErrorAfterTimeout(5000);
    }
  };

  //---------Delete Supplier---------
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
      clearSuccessMessageAfterTimeout(2000);
    } catch (err) {
      setError("Erro ao remover o fornecedor. Por favor tente outra vez.");
      clearErrorAfterTimeout(5000);
    }
  };

  //---------Edit Supplier---------
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
    setError(null);

    // Define a regular expression to validate the category name
    const suppRegex = /^[A-Za-z ]+$/;

    if (editedSupValue.trim() === "") {
      setError("Atenção! Não pode guardar um fornecedor com valor nulo.");
      clearErrorAfterTimeout(5000);
      return;
    }

    if (!suppRegex.test(editedSupValue.trim())) {
      setError("Atenção! O fornecedor só pode conter letras.");
      clearErrorAfterTimeout(5000);
      return;
    }

    try {
      // Make a PUT request to update the data on the server
      await axiosClient.put(`/supUpdate/${selectedSupData.id}`, {
        name: editedSupValue.trim(),
      });

      setSuccessMessage("Fornecedor editado com sucesso!");
      clearSuccessMessageAfterTimeout(2000);

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
  //Add Model
  const handleAddModel = async () => {
    setError(null);

    //Validate the category name:
    const mdlRegex = /^[A-Za-z0-9- ]+$/;

    if (newModel.trim() === "") {
      setError("Atenção! Introduza um modelo.");
      clearErrorAfterTimeout(5000);
      return;
    }

    if (!mdlRegex.test(newModel.trim())) {
      setError("Atenção! O modelo só pode conter letras, números e hífen.");
      clearErrorAfterTimeout(5000); // Clear the error after 5 seconds
      return;
    }

    if (selectedBrand === "") {
      setError("Atenção! Selecione uma marca.");
      clearErrorAfterTimeout(5000);
      return;
    }

    // Check if the model already exists in the list
    /*  if (models.some((model) => model.name === newModel.trim())) {
      setError("Atenção! Modelo já existe!");
      clearErrorAfterTimeout(5000);
      return;
    } */

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
      clearSuccessMessageAfterTimeout(2000);
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
      clearSuccessMessageAfterTimeout(2000);
    } catch (err) {
      setError("Erro ao remover o modelo. Por favor tente outra vez.");
      clearErrorAfterTimeout(5000);
    }
  };

  //---------Edit Model---------
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
    //Validate the model name
    const mdlRegex = /^[A-Za-z0-9- ]+$/;

    if (editedMdlValue.trim() === "") {
      setError("Atenção! Não pode guardar um modelo com valor nulo.");
      clearErrorAfterTimeout(5000);
      return;
    }

    if (!mdlRegex.test(editedMdlValue.trim())) {
      setError("Atenção! O modelo só pode conter letras, números e hífen.");
      clearErrorAfterTimeout(5000); // Clear the error after 5 seconds
      return;
    }

    try {
      // Make a PUT request to update the data on the server
      await axiosClient.put(`/mdlUpdate/${selectedMdlData.id}`, {
        name: editedMdlValue.trim(),
      });
      setSuccessMessage("Modelo editado com sucesso!");
      clearSuccessMessageAfterTimeout(2000);
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
  //Add Unit
  const handleAddUnit = async () => {
    setError(null);

    //Validate the category name:
    const unitRegex = /^[A-Za-z ]+$/;

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

    if (!unitRegex.test(newUnit.trim())) {
      setError("Atenção! A unidade só pode conter letras.");
      clearErrorAfterTimeout(5000); // Clear the error after 5 seconds
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
      clearSuccessMessageAfterTimeout(2000);
    } catch (err) {
      setError("Erro ao adicionar unidade. Por favor tente outra vez.");
      clearErrorAfterTimeout(5000);
    }
  };
  //---------------------Delete Unit----------------------
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
      clearSuccessMessageAfterTimeout(2000);
    } catch (err) {
      setError("Erro ao remover a unidade. Por favor tente outra vez.");
      clearErrorAfterTimeout(5000);
    }
  };

  //---------------Edit Unit------------
  const [selectedUntData, setSelectedUntData] = useState(null);
  const [editedUntValue, setEditedUntValue] = useState("");

  //Selection of the handle Data unit
  const handleDataUntSelection = () => {
    const selectedDataName = event.target.value;
    const selectedDataObject = units.find(
      (data) => data.name === selectedDataName
    );
    setSelectedUntData(selectedDataObject);
    setEditedUntValue(selectedDataObject.name);
  };

  //Handle data  unit update
  const handleDataUntUpdate = async () => {
    setError(null);

    // Define a regular expression to validate the category name
    const unitRegex = /^[A-Za-z ]+$/;

    if (editedUntValue.trim() === "") {
      setError("Atenção! Não pode guardar uma unidade com valor nulo.");
      clearErrorAfterTimeout(5000);
      return;
    }

    if (!unitRegex.test(editedUntValue.trim())) {
      setError("Atenção! A unidade só pode conter letras.");
      clearErrorAfterTimeout(5000);
      return;
    }

    try {
      // Make a PUT request to update the data on the server
      await axiosClient.put(`/unitUpdate/${selectedUntData.id}`, {
        name: editedUntValue.trim(),
      });
      setSuccessMessage("Unidade editada com sucesso!");
      clearSuccessMessageAfterTimeout(2000);
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

  //----------------For the category and brand---------------------
  const [relations, setRelations] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  //Close of the message when option are null
  const handleClose = () => {
    setShowFirstSetMessage(false);
    setShowSecondSetMessage(false);
  };

  return (
    <div className="form-brd-mdl">
      <h1 className="mn-config">Configurações</h1>
      {
        <h6 className="brdc-options">
          {selectedFirstOption} {selectedNextOption === "" ? "" : ">"}{" "}
          {selectedNextOption}
        </h6>
      }
      {/* Render the modal conditionally - Show the erros Modals*/}
      <Modal
        show={showFirstSetMessage || showSecondSetMessage}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="messagee">Erro!</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showFirstSetMessage && (
            <div className="message">
              <b className="attention-msg">Atenção!</b>
              <p>
                Não selecionou nenhuma opção. Por favor, selecione uma opção!
              </p>
            </div>
          )}

          {showSecondSetMessage && (
            <div className="message">
              <b className="attention-msg">Atenção!</b>
              <p>
                Não selecionou nenhuma operação. Por favor, selecione uma
                operação!
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>

      {!showNextOptions && (
        <div className="checkbox-dropdown-container">
          <p className="fr-ini">
            Selecione uma das opções para realizar a configuração.
          </p>
          {options.map((option, index) => (
            <div key={index} className="cls-options">
              <input
                type="checkbox"
                checked={selectedOption === option}
                onChange={() => handleOptionToggle(option)}
                className="chcb_inpt"
              />
              <label key={index} className="checkbox-label">
                {option}
                {getOptionExplanation(option)}{" "}
              </label>
            </div>
          ))}
        </div>
      )}
      {showNextOptions && !showNextOptionsSecondSet && (
        <div className="checkbox-dropdown-containerr">
          <p className="fr-ini-op">Selecione uma das operações:</p>
          {additionalOptions.map((option, index) => (
            <div key={index} className="cls-options">
              <input
                type="checkbox"
                checked={selectedOption === option}
                onChange={() => handleOptionToggle(option)}
                className="chcb_inpt"
              />
              <label key={index} className="checkbox-label">
                {option}
                {getOptionExplanation(option)}{" "}
              </label>
            </div>
          ))}
        </div>
      )}
      {showNextOptionsSecondSet && showNextOptions ? (
        <div>
          {/* -----Categories----- */}
          {/* Category Add*/}
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
          {/* Category Delete*/}
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
          {/* Category edit */}
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
          {/* Brand add*/}
          {selectedFirstOption === "Marca" &&
            selectedNextOption === "Adicionar" && (
              <ConfigBr
                Title={selectedFirstOption}
                id="category"
                setData={newBrand}
                setNewData={setNewBrand}
                handleAdd={handleAddBrand}
                error={error}
                successMessage={successMessage}
                rel1={"Categoria"}
                selectedAttri={selectedCategory}
                setSelectedAttri={setSelectedCategory}
                array1={cats}
              />
            )}
          {/* Brand delete */}
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
          {/* Brand edit */}
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
          {/* Entity Add */}
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
          {/* Entity delete */}
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
          {/* Entity edit */}
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
          {/* Supplier add */}
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
          {/* Supplier delete */}
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
          {/* Supplier Edit */}
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

          {/* Model delete */}
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
          {/* Model edit */}
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
          {/* Unit Add */}
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
          {/* Unit delete */}
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

          {/* Unit edit */}
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

          <div>
            <button onClick={handleBackButtonClick} className="vl-btn">
              Anterior
            </button>
            <p></p>
          </div>
        </div>
      ) : (
        <>
          {/* Only show the "Seguinte" button if there is only 1 option displayed */}
          {selectedFirstOption === "" ? (
            <button onClick={handleNextButtonClick} className="next-conf">
              Seguinte
            </button>
          ) : (
            <>
              <button onClick={handleBackButtonClick} className="vl-btn">
                Anterior
              </button>
              <button onClick={handleNextButtonClick} className="next-conf">
                Seguinte
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Config;
