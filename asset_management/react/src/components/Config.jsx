import React, { useState, useEffect } from "react";
import "../styles/Config.css";
import axiosClient from "../axios-client";

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

  useEffect(() => {
    Promise.all([axiosClient.get("/combinedData")]).then((responses) => {
      setCats(responses[0].data.cats);
      //setEnts(responses[0].data.ents);
      //setUnits(responses[0].data.units);
      setBrands(responses[0].data.brands);
      //setModelos(responses[0].data.models);
      //setSupplier(responses[0].data.suppliers);
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

  return (
    <div className="form-brd-mdl">
      <h1>Configurações</h1>

      {/* Add a new Category only */}
      <div id="container-config">
        <form className="frm-cats">
          <label htmlFor="category" className="lb-cats">
            Categoria:
          </label>
          <input
            type="text"
            id="category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            autoComplete="off"
          />
          <button id="btnAdd" onClick={handleAddCategory}>
            Adicionar
          </button>

          <label htmlFor="list" className="lb-cats">
            Lista de categorias:
          </label>
          <select id="list" name="list" multiple className="slc-cat">
            {cats.map((category) => (
              <option key={category.name} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <button id="btnRemove" onClick={handleRemoveCategory}>
            Remover Categoria Selecionada
          </button>
        </form>
      </div>

      <div id="container-config">
        <form className="frm-cats">
          <label htmlFor="brand">Marca:</label>
          <input
            type="text"
            value={newBrand}
            onChange={(e) => setNewBrand(e.target.value)}
            autoComplete="off"
          />
          <button id="btnAdd" onClick={handleAddBrand}>
            Adicionar
          </button>

          <label htmlFor="brand">Lista de marcas:</label>
          <select id="brand" name="brand" multiple>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>

          <button id="btnRemove" onClick={handleRemoveBrand}>
            Remover Marca Selecionada
          </button>
        </form>
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
