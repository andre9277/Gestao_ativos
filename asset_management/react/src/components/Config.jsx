import React, { useState, useEffect } from "react";
import "../styles/Config.css";
import axiosClient from "../axios-client";

const Config = () => {
  const [nameBrand, setNameBrand] = useState("");
  const [nameModel, setNameModel] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
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

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="titleconfig">Ativos:</h2>
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
      {/* -----------Button Add----------- */}
      <button type="submit" className="addConfig">
        Adicionar
      </button>

      {notification && <p>{notification}</p>}
    </form>
  );
};

export default Config;
