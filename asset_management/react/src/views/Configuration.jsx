import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import ConfigDropdown from "../components/ConfigDropdown";
import axiosClient from "../axios-client";
import ConfigDropAdd from "../components/ConfigDropAdd";

const Configuration = ({ selectedOption, currentModal, setCurrentModal }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [showAddForm, setShowAddForm] = useState(false); // State to control showing the add form
  const [showDelForm, setShowDelForm] = useState(false);
  const handleAdd = (event) => {
    // Implement the add functionality here
    console.log("Add button clicked for", selectedOption);
    // Call the appropriate handleAdd function based on the selected option
    switch (selectedOption) {
      case "Categorias":
        handleAddCategory(event);
        break;
      case "Marcas":
        handleAddBrand(event);
        break;
      case "Fornecedor":
        handleAddSupplier(event);
        break;
      case "Entidade":
        handleAddEntity(event);
        break;
      // Add other cases for different options if needed
      default:
        console.warn(
          "No specific handleAdd function found for:",
          selectedOption
        );
    }
    setShowAddForm(true); // Show the add form when clicking the "Adicionar" button
    setModalIsOpen(true);
  };

  const handleDel = (event) => {
    console.log("Delete button clicked for", selectedOption);

    // Call the appropriate handleDelete function based on the selected option
    switch (selectedOption) {
      case "Categorias":
        handleRemoveCategory(event);
        break;
      case "Marcas":
        handleRemoveBrand(event);
        break;
      case "Fornecedor":
        handleRemoveSupplier(event);
        break;
      case "Entidade":
        handleRemoveEntity(event);
        break;
      default:
        console.warn(
          "No specific handleDelete function found for:",
          selectedOption
        );
    }

    setModalIsOpen(true);
    setShowDelForm(true); // Show the add form when clicking the "Adicionar" button
  };

  const handleEdit = () => {
    // Implement the edit functionality here
    console.log("Edit button clicked for", selectedOption);
    setModalIsOpen(true);
  };

  /*  const handleDelete = () => {
    // Implement the delete functionality here
    console.log("Delete button clicked for", selectedOption);
    setModalIsOpen(true);
  }; */

  const closeModal = () => {
    setModalIsOpen(false);
    setShowAddForm(false); // Hide the add form when closing the modal
    setShowDelForm(false);
  };

  //----------------------------------------------------

  const [newCategory, setNewCategory] = useState("");
  const [cats, setCats] = useState([]);
  useEffect(() => {
    Promise.all([axiosClient.get("/combinedData")]).then((responses) => {
      setCats(responses[0].data.cats);
      setEnts(responses[0].data.ents);
      /*  setUnits(responses[0].data.units); */
      setBrands(responses[0].data.brands);
      /*  setModels(responses[0].data.models);*/
      setSuppliers(responses[0].data.suppliers);
    });
  }, []);

  //--------------------Category--------------------------------
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

  //------------Brands--------------------------
  //for the brands
  const [brands, setBrands] = useState([]);
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

  //------------------------Supplier--------------
  //for the suppliers
  const [suppliers, setSuppliers] = useState([]);
  const [newSupplier, setNewSupplier] = useState("");
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

  //----------------------Entity----------------------
  //for entities
  const [ents, setEnts] = useState([]);
  const [newEntity, setNewEntity] = useState("");
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
    <div>
      <button onClick={handleAdd}>Adicionar</button>
      <button onClick={handleEdit}>Editar</button>
      <button onClick={handleDel}>Apagar</button>

      {/* Add Modal */}
      <Modal show={modalIsOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          {showAddForm && (
            <Modal.Title>{`Adicionar ${selectedOption}`}</Modal.Title>
          )}
          {showDelForm && (
            <Modal.Title>{`Remover ${selectedOption}`}</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          {/* Categories */}
          {selectedOption === "Categorias" &&
            showAddForm && ( // Conditionally render the ConfigDropdown when showAddForm is true
              <ConfigDropAdd
                Title={selectedOption}
                setData={newCategory}
                setNewData={setNewCategory}
              />
            )}
          {showDelForm && selectedOption === "Categorias" && (
            <ConfigDropdown
              Title={selectedOption} // Use selectedOption as the Title
              tag="list"
              datas={cats}
            />
          )}
          {/*Brands*/}
          {selectedOption === "Marcas" &&
            showAddForm && ( // Conditionally render the ConfigDropdown when showAddForm is true
              <ConfigDropAdd
                Title={selectedOption}
                setData={newBrand}
                setNewData={setNewBrand}
              />
            )}
          {showDelForm && selectedOption === "Marcas" && (
            <ConfigDropdown Title={selectedOption} tag="brand" datas={brands} />
          )}

          {/*Supplier*/}
          {selectedOption === "Fornecedor" &&
            showAddForm && ( // Conditionally render the ConfigDropdown when showAddForm is true
              <ConfigDropAdd
                Title={selectedOption}
                setData={newSupplier}
                setNewData={setNewSupplier}
              />
            )}
          {showDelForm && selectedOption === "Fornecedor" && (
            <ConfigDropdown
              Title={selectedOption}
              tag="sup"
              datas={suppliers}
            />
          )}
          {/*Entituty*/}
          {selectedOption === "Entidade" &&
            showAddForm && ( // Conditionally render the ConfigDropdown when showAddForm is true
              <ConfigDropAdd
                Title={selectedOption}
                setData={newEntity}
                setNewData={setNewEntity}
              />
            )}
          {showDelForm && selectedOption === "Entidade" && (
            <ConfigDropdown Title={selectedOption} tag="ent" datas={ents} />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Voltar
          </Button>
          {showAddForm && (
            <Button variant="primary" onClick={(e) => handleAdd(e)}>
              Adicionar
            </Button>
          )}
          {!showAddForm && showDelForm && (
            <Button variant="danger" onClick={(e) => handleDel(e)}>
              Eliminar
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Configuration;
