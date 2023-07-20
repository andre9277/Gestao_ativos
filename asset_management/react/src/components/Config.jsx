import React, { useState, useEffect } from "react";
import "../styles/Config.css";
import axiosClient from "../axios-client";
import ConfigDropdown from "./ConfigDropdown";

const Config = () => {
  const [nameBrand, setNameBrand] = useState("");
  const [nameModel, setNameModel] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategoryOnly, setSelectedCategoryOnly] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [cats, setCats] = useState([]);
  const [errors, setErrors] = useState([]);
  const [notification, setNotification] = useState("");

  //for the brands
  const [brands, setBrands] = useState([]);
  const [newBrand, setNewBrand] = useState("");

  //for the models
  const [models, setModels] = useState([]);
  const [newModel, setNewModel] = useState("");

  //for the suppliers
  const [suppliers, setSuppliers] = useState([]);
  const [newSupplier, setNewSupplier] = useState("");

  //for entities
  const [ents, setEnts] = useState([]);
  const [newEntity, setNewEntity] = useState("");

  useEffect(() => {
    Promise.all([axiosClient.get("/combinedData")]).then((responses) => {
      setCats(responses[0].data.cats);
      setEnts(responses[0].data.ents);
      //setUnits(responses[0].data.units);
      setBrands(responses[0].data.brands);
      setModels(responses[0].data.models);
      setSuppliers(responses[0].data.suppliers);
    });
  }, []);

  //handle the submit of the category/brand/model relation
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Step 1: Add the brand
      const brand = {
        name: nameBrand,
      };

      const brandResponse = await axiosClient.post("/brandsAdd", brand);
      const brandId = brandResponse.data.id;

      // Step 2: Add the model associated with the brand
      const model = {
        name: nameModel,
        brand_id: brandId,
      };

      const modelResponse = await axiosClient.post("/modelsAdd", model);
      const modelId = modelResponse.data.id;

      const categoryBrand = {
        category_id: selectedCategory,
        brand_id: brandId,
      };

      await axiosClient.post("/categoryBrands", categoryBrand);

      setNotification("Brand and Model added successfully!");
      // Handle success or navigate to a different page
    } catch (err) {
      if (err.response && err.response.status === 422) {
        setErrors(err.response.data.errors);
      } else {
        console.error("Error adding brand and model", err);
      }
    }
  };

  //------Add new category
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

  //------Remove a category
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

  //--------------------------Add Model-------------------------
  const handleAddModel = async (event) => {
    event.preventDefault();
    if (newModel.trim() === "") {
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
      });

      // Add the new model to the state
      setModels((prevModels) => [...prevModels, response.data]);
      setNewModel("");
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
  //--------------------------Add Supplier-------------------------
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
  //--------------------------Delete Supplier-------------------------
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

  //--------------------------Add Entity-------------------------
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

  //--------------------------Delete Entity-------------------------
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

  return (
    <div className="form-brd-mdl">
      <h1>Configurações</h1>
      <div className="config-gp-one">
        {/*----------------- Add a new Category only------------------- */}
        <ConfigDropdown
          Title="Categoria"
          id="category"
          setData={newCategory}
          setNewData={setNewCategory}
          handleAdd={handleAddCategory}
          tag="list"
          datas={cats}
          handleDel={handleRemoveCategory}
        />
        {/*----------------- Add a new Brand only------------------- */}
        <ConfigDropdown
          Title={"Marcas"}
          id="brand"
          setData={newBrand}
          setNewData={setNewBrand}
          handleAdd={handleAddBrand}
          tag="brand"
          datas={brands}
          handleDel={handleRemoveBrand}
        />

        {/*----------------- Add a new Model only------------------- */}
        <ConfigDropdown
          Title="Modelos"
          id="model"
          setData={newModel}
          setNewData={setNewModel}
          handleAdd={handleAddModel}
          tag="model"
          datas={models}
          handleDel={handleRemoveModel}
        />
      </div>
      <div className="config-gp-two">
        {/*----------------- Add a new Supplier only------------------- */}
        <ConfigDropdown
          Title="Fornecedores"
          id="sup"
          setData={newSupplier}
          setNewData={setNewSupplier}
          handleAdd={handleAddSupplier}
          tag="sup"
          datas={suppliers}
          handleDel={handleRemoveSupplier}
        />

        {/*----------------- Add a new Entity only------------------- */}
        <ConfigDropdown
          Title="Entidade"
          id="entidades"
          setData={newEntity}
          setNewData={setNewEntity}
          handleAdd={handleAddEntity}
          tag="ent"
          datas={ents}
          handleDel={handleRemoveEntity}
        />
      </div>
      {/* ---------Add a Category, Brand, Model--------- */}
      <form onSubmit={handleSubmit}>
        <h2 className="titleconfig">
          Adicionar relação Categoria/Marca/Modelo:
        </h2>
        {/* -----------Category----------- */}
        <label className="configlb">
          {" "}
          Categoria:<label className="cmp-obg">*</label>
        </label>
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

        {/* Input field for new category */}
        {selectedCategory === "add_new" && (
          <div>
            <label className="configlb">Nova Categoria:</label>
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="configInp"
            />
          </div>
        )}

        {/* -----------Brand----------- */}
        <label className="configlb">Marca:</label>
        <input
          type="text"
          value={nameBrand}
          onChange={(e) => setNameBrand(e.target.value)}
          className="configInp"
        />

        {/* -----------Model----------- */}
        <label className="configlb">Modelo:</label>
        <input
          type="text"
          value={nameModel}
          onChange={(e) => setNameModel(e.target.value)}
          className="configInp"
        />

        {/* -----------Button Add----------- */}
        <button type="submit" className="addConfig">
          Adicionar
        </button>

        {notification && <p>{notification}</p>}
      </form>
      <form>
        <div className="localDiv">
          <h2 className="titleconfig">Adicionar relação Entidade/Unidade:</h2>
          {/* -----------Entity----------- */}
          <label className="configlb">Entidade:</label>
          <input
            type="text"
            /* value={nameModel} */
            onChange={(e) => setNameModel(e.target.value)}
            className="configInp"
          />
          {/* -----------Unit----------- */}
          <label className="configlb">Unidade:</label>
          <input
            type="text"
            /* value={nameModel} */
            onChange={(e) => setNameModel(e.target.value)}
            className="configInp"
          />
        </div>
      </form>
    </div>
  );
};

export default Config;
