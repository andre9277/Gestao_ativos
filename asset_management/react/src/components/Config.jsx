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

  useEffect(() => {
    axiosClient.get("/categories").then((response) => {
      setCats(response.data);
      /* console.log(response); */
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const brand = {
      name: nameBrand,
    };

    try {
      const response = await axiosClient.post("/brandsAdd", brand);
      const brandId = response.data.id;

      const categoryBrand = {
        category_id: selectedCategory,
        brand_id: brandId,
      };

      await axiosClient.post("/categoryBrands", categoryBrand);

      setNotification("Marca adicionado com sucesso!");
      // Handle success or navigate to a different page
    } catch (err) {
      if (err.response && err.response.status === 422) {
        setErrors(err.response.data.errors);
      } else {
        console.error("Erro ao adicionar a marca", err);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="titleconfig">Ativos:</h2>
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
      <label className="configlb">Marca:</label>
      <input
        type="text"
        value={nameBrand}
        onChange={(e) => setNameBrand(e.target.value)}
        className="configInp"
      />

      <label className="configlb">Modelo:</label>
      <input
        type="text"
        value={nameModel}
        onChange={(e) => setNameModel(e.target.value)}
        className="configInp"
      />

      <label className="configlb">Fornecedor:</label>
      <input
        type="text"
        value={nameModel}
        onChange={(e) => setNameModel(e.target.value)}
        className="configInp"
      />

      <div className="localDiv">
        <h2 className="titleconfig">Localização:</h2>
        <label className="configlb">Entidade:</label>
        <input
          type="text"
          value={nameModel}
          onChange={(e) => setNameModel(e.target.value)}
          className="configInp"
        />

        <label className="configlb">Unidade:</label>
        <input
          type="text"
          value={nameModel}
          onChange={(e) => setNameModel(e.target.value)}
          className="configInp"
        />
      </div>

      <button type="submit" className="addConfig">
        Adicionar
      </button>

      {notification && <p>{notification}</p>}
    </form>
  );
};

export default Config;
