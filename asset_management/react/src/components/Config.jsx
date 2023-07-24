import React, { useState, useEffect } from "react";
import "../styles/Config.css";
import ConfigDropdown from "./ConfigDropdown";
import "../styles/Config.css"; // Create a CSS file to style the dropdown
import axiosClient from "../axios-client";

const options = ["Categoria", "Marca", "Entidade", "Fornecedor"];

const Config = () => {
  const [newCategory, setNewCategory] = useState("");
  const [cats, setCats] = useState([]);
  useEffect(() => {
    Promise.all([axiosClient.get("/combinedData")]).then((responses) => {
      setCats(responses[0].data.cats);
      /*   setEnts(responses[0].data.ents);
      setUnits(responses[0].data.units);
      setBrands(responses[0].data.brands);
      setModels(responses[0].data.models);
      setSuppliers(responses[0].data.suppliers); */
    });
  }, []);

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

  // Previous state variables
  const [selectedOption, setSelectedOption] = useState("");
  const [showNextOptions, setShowNextOptions] = useState(false);
  const [showNextOptionsSecondSet, setShowNextOptionsSecondSet] =
    useState(false);

  // New state variables to save user selections
  const [selectedFirstOption, setSelectedFirstOption] = useState("");
  const [selectedNextOption, setSelectedNextOption] = useState("");

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

  const additionalOptions = ["add", "edit", "delete"];

  return (
    <div className="form-brd-mdl">
      <h1>Configurações</h1>
      {!showNextOptions && (
        <div className="checkbox-dropdown-container">
          {options.map((option, index) => (
            <label key={index} className="checkbox-label">
              <input
                type="checkbox"
                checked={selectedOption === option}
                onChange={() => handleOptionToggle(option)}
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
              />
              {option}
            </label>
          ))}
        </div>
      )}
      {showNextOptionsSecondSet && showNextOptions ? (
        <div>
          {selectedFirstOption === "Categoria" &&
            selectedNextOption === "add" && (
              <ConfigDropdown
                Title={selectedFirstOption}
                id="category"
                setData={newCategory}
                setNewData={setNewCategory}
                handleAdd={handleAddCategory}
                tag="list"
                datas={cats}
                handleDel={handleRemoveCategory}
              />
            )}
          <div>
            <button onClick={handleBackButtonClick}>Back</button>
            <button onClick={handleCloseButtonClick}>Close</button>
          </div>
        </div>
      ) : (
        <button onClick={handleNextButtonClick}>Next</button>
      )}
    </div>
  );
};

export default Config;
