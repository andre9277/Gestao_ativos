import React, { useState, useEffect } from "react";
import "../styles/Config.css";
import axiosClient from "../axios-client";
import ConfigDropdown from "./ConfigDropdown";
import ConfigDropMdl from "./ConfigDropMdl";

const Config = () => {
  const [nameBrand, setNameBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [newCategory, setNewCategory] = useState("");
  const [cats, setCats] = useState([]);
  const [errors, setErrors] = useState([]);
  const [notification, setNotification] = useState("");

  const [relations, setRelations] = useState([]);

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

  //for the units
  const [units, setUnits] = useState([]);
  const [newUnit, setNewUnit] = useState("");

  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedEnt, setSelectedEnt] = useState("");

  const [selectedEntity, setSelectedEntity] = useState(""); // Selected entity
  const [selectedUnit, setSelectedUnit] = useState(""); // Selected unit

  const showNotification = (message, duration = 5000) => {
    setNotification(message);
    setTimeout(() => {
      setNotification("");
    }, duration);
  };

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
  /* 
  #---------------------------------------# */
  //---------------handle the submit of the category/brand relation
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Check if a brand is selected from the dropdown or if a new brand name is provided
      let brandId;
      if (selectedBrand) {
        brandId = selectedBrand;
      } else {
        // Add the new brand
        const brand = {
          name: nameBrand,
        };
        const brandResponse = await axiosClient.post("/brandsAdd", brand);
        brandId = brandResponse.data.id;
      }

      // Add the category-brand relation
      const categoryBrand = {
        category_id: selectedCategory,
        brand_id: brandId,
      };
      await axiosClient.post("/categoryBrands", categoryBrand);

      showNotification("Relação categoria/marca adicionados com sucesso!");
      // Handle success or navigate to a different page
      fetchRelations();
    } catch (err) {
      if (err.response && err.response.status === 422) {
        setErrors(err.response.data.errors);
      } else {
        console.error("Erro! Verifique os campos preenchidos!", err);
      }
    }
  };

  // Fetch the relations between category and brand from the backend API
  const fetchRelations = async () => {
    try {
      const response = await axiosClient.get("/category-brands");
      setRelations(response.data);
    } catch (error) {
      console.error("Error fetching relations", error);
    }
  };

  // Function to handle the removal of a relation
  const handleRemoveRelation = async (relationId) => {
    try {
      // Make a DELETE request to your backend API for relation removal
      await axiosClient.delete(`/category-brandsDel/${relationId}`);

      // Fetch the updated relations data and update the list
      fetchRelations();
    } catch (err) {
      console.error("Error removing relation", err);
    }
  };

  /*#---------------------------------------# */
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
          Title={"Marca"}
          id="brand"
          setData={newBrand}
          setNewData={setNewBrand}
          handleAdd={handleAddBrand}
          tag="brand"
          datas={brands}
          handleDel={handleRemoveBrand}
        />

        {/*----------------- Add a new Model only------------------- */}
        <ConfigDropMdl
          Title="Modelo"
          id="model"
          setData={newModel}
          setNewData={setNewModel}
          handleAdd={handleAddModel}
          tag="model"
          datas={models}
          handleDel={handleRemoveModel}
          brands={brands}
          selectedBrand={selectedBrand}
          handleBrandChange={handleBrandChange}
          maintb="Marca"
        />
      </div>
      <div className="config-gp-two">
        {/*----------------- Add a new Supplier only------------------- */}
        <ConfigDropdown
          Title="Fornecedor"
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
        {/*----------------- Add a new Unit only------------------- */}
        <ConfigDropMdl
          Title="Unidade"
          id="unit"
          setData={newUnit}
          setNewData={setNewUnit}
          handleAdd={handleAddUnit}
          tag="unit"
          datas={units}
          handleDel={handleRemoveUnit}
          brands={ents}
          selectedBrand={selectedEnt}
          handleBrandChange={handleEntChange}
          maintb="Entidade"
        />
      </div>
      {/* ---------Add a Category, Brand--------- */}

      <div className="config-ss">
        {/* -------------------------------------------------------------- */}
        <div id="container-config">
          <form onSubmit={handleSubmit}>
            <h4 className="titleconfig">Adicionar relação Categoria/Marca:</h4>

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

            <button type="submit" className="addConfig">
              Adicionar
            </button>

            {/* List of relations */}
            <div id="container-config-rel">
              <h5>Relações Categoria - Marca</h5>
              <ul className="relations-list">
                {relations.map((relation) => (
                  <li key={relation.id}>
                    {`${
                      cats.find((cat) => cat.id === relation.category_id)
                        ?.name || "Categoria desconhecida"
                    } - ${
                      brands.find((brand) => brand.id === relation.brand_id)
                        ?.name || "Marca desconhecida"
                    }`}
                    <button
                      type="button"
                      onClick={() => handleRemoveRelation(relation.id)}
                      className="btn-rel-br"
                    >
                      Remover
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </form>

          {notification && <p>{notification}</p>}
        </div>
        {/* -------------------------------------------------------------- */}
        {/* ---------Add a Entity, Unit--------- */}

        <div id="container-config">
          <form onSubmit={handleSubmit}>
            <h4 className="titleconfig">Adicionar relação Entidade/Unidade:</h4>

            {/* Entity */}
            <label className="configlb">Entidade:</label>
            <select
              name="entity"
              id="entity"
              value={selectedEntity}
              className="configSelect"
              onChange={(e) => setSelectedEntity(e.target.value)}
            >
              <option value=""></option>
              {ents.map((entity) => (
                <option key={entity.id} value={entity.id}>
                  {entity.name}
                </option>
              ))}
            </select>

            {/* Unit */}
            <label className="configlb">Unidade:</label>
            <select
              name="unit"
              id="unit"
              value={selectedUnit}
              className="configSelect"
              onChange={(e) => setSelectedUnit(e.target.value)}
            >
              <option value=""></option>
              {units.map((unit) => (
                <option key={unit.id} value={unit.id}>
                  {unit.name}
                </option>
              ))}
            </select>

            <button type="submit" className="addConfig">
              Adicionar
            </button>

            {/* List of relations */}
            <div id="container-config-rel">
              <h5>Relações Entidade - Unidade</h5>
              <ul className="relations-list">
                {relations.map((relation) => (
                  <li key={relation.id}>
                    {`${
                      ents.find((entity) => entity.id === relation.entity_id)
                        ?.name || "Entidade desconhecida"
                    } - ${
                      units.find((unit) => unit.id === relation.unit_id)
                        ?.name || "Unidade desconhecida"
                    }`}
                    <button
                      type="button"
                      onClick={() => handleRemoveRelation(relation.id)}
                      className="btn-rel-br"
                    >
                      Remover
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Config;
