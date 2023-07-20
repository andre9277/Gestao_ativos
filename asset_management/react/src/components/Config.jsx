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

  //Gets the categories for the user to add
  useEffect(() => {
    axiosClient.get("/categories").then((response) => {
      setCats(response.data);
      /* console.log(response); */
    });
  }, []);

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

  /*   //Add a new category to the database
  const handleAddNewCategory = async (event) => {
    event.preventDefault();
    if (newCategory.trim() === "") {
      return;
    }

    try {
      const response = await axiosClient.post("/categoriesAdd", {
        name: newCategory.trim(),
      });

      setCats([...cats, response.data]);
      setNotification("Categoria Adicionada com sucesso!");
      setNewCategory("");
    } catch (err) {
      if (err.response && err.response.status === 422) {
        setErrors(err.response.data.errors);
      } else {
        console.error("Erro ao adicionar a categoria", err);
      }
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await axiosClient.delete(`/categoriesDel/${categoryId}`);
      // Optionally, you can refresh the category list after deletion:
      axiosClient.get("/categories").then((response) => {
        setCats(response.data);
      });
    } catch (err) {
      console.error("Erro ao apgar a categoria", err);
    }
  }; */

  const handleAddCategory = (event) => {
    event.preventDefault();
    if (newCategory.trim() === "") {
      return;
    }

    // Check if the category already exists in the list
    if (categories.some((category) => category === newCategory.trim())) {
      alert("Category already exists.");
      return;
    }

    setCategories((prevCategories) => [...prevCategories, newCategory.trim()]);
    setNewCategory("");
  };

  const handleRemoveCategory = () => {
    const selectedOptions = document.getElementById("list").selectedOptions;
    const categoryToRemove = [...selectedOptions].map((option) => option.value);

    if (categoryToRemove.length === 0) {
      alert("Please select a category to remove.");
      return;
    }

    setCategories((prevCategories) =>
      prevCategories.filter((category) => !categoryToRemove.includes(category))
    );
  };

  return (
    <div className="form-brd-mdl">
      <h1>Configurações</h1>

      {/* Add a new Category only */}
      <div id="container">
        <form>
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            placeholder="Enter a category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            autoComplete="off"
          />
          <button id="btnAdd" onClick={handleAddCategory}>
            Add
          </button>

          <label htmlFor="list">Category List:</label>
          <select id="list" name="list" multiple>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>

          <button id="btnRemove" onClick={handleRemoveCategory}>
            Remove Selected Category
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

        {/* -----------Supplier----------- */}
        <label className="configlb">Fornecedor:</label>
        <input
          type="text"
          /*  value={nameModel} */
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
          <h2 className="titleconfig">Localização:</h2>
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
