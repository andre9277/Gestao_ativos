import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import axiosClient from "../axios-client";

const DeleteRelationConfig = ({
  rel1,
  rel2,
  handleShowModal,
  array1,
  array2,
  error,
  successMessage,
  showModal,
  handleCloseModal,
  setError,
  clearErrorAfterTimeout,
  setSuccessMessage,
  clearSuccessMessageAfterTimeout,
}) => {
  const [selectedValue, setSelectedValue] = useState([]);
  const [relations, setRelations] = useState([]);
  useEffect(() => {
    fetchRelations();
  }, []);

  const fetchRelations = async () => {
    try {
      const response = await axiosClient.get("/category-brands");
      setRelations(response.data);
    } catch (error) {
      setError("Atenção! Erro ao carregar todas as relações.");
      clearErrorAfterTimeout(5000);
    }
  };

  const handleRemoveSelectedRelation = async (event) => {
    event.preventDefault();
    try {
      if (!selectedValue) {
        setError("Atenção! Selecione uma relação para remover.");
        clearErrorAfterTimeout(5000);
        return;
      }
      // Find the relation ID based on the selected text
      const selectedRelationId = findRelationIdBySelectedText(selectedValue);

      // Make a DELETE request to your backend API for relation removal
      await axiosClient.delete(`/category-brandsDel/${selectedRelationId}`);
      setSuccessMessage("Relação Categoria/Marca removida com sucesso!");
      clearSuccessMessageAfterTimeout(5000);

      // Fetch the updated relations data and update the list
      fetchRelations();
      // Clear the selection after removing the relation
      setSelectedValue("");
    } catch (err) {
      setError("Atenção! Erro ao remover a relação selecionada.");
      clearErrorAfterTimeout(5000);
    }
    handleCloseModal();
  };

  // Helper function to find the relation ID based on the selected text
  const findRelationIdBySelectedText = (selectedText) => {
    const selectedRelation = relations.find((relation) => {
      const category =
        array1.find((cat) => cat.id === relation.category_id)?.name ||
        "Categoria desconhecida";
      const brand =
        array2.find((brand) => brand.id === relation.brand_id)?.name ||
        "Marca desconhecida";
      const relationText = `${category} - ${brand}`;
      return relationText === selectedText;
    });

    return selectedRelation ? selectedRelation.id : null;
  };
  const handleSelect = (e) => {
    const selectedOption = e.target.value;
    setSelectedValue(selectedOption); // Store the selected text directly
  };

  return (
    <div id="container-config">
      <form>
        <p></p>
        {/* List of relations */}
        <div id="container-config-rel" className="relations-container">
          <p></p>
          <label htmlFor={"selected-value"} className="lb-cats">
            Lista de {rel1} - {rel2}:
          </label>
          <select
            id={"selected-value"}
            name={"selected-value"}
            className="slc-cat"
            onChange={handleSelect}
            value={selectedValue}
            multiple
          >
            {relations.map((relation) => (
              <option key={relation.id}>
                {" "}
                {`${
                  array1.find((cat) => cat.id === relation.category_id)?.name ||
                  "Categoria desconhecida"
                } - ${
                  array2.find((brand) => brand.id === relation.brand_id)
                    ?.name || "Marca desconhecida"
                }`}
              </option>
            ))}
          </select>

          {selectedValue.length !== 0 && (
            <div>
              <label htmlFor="selected-value" className="lb-cats">
                Apagar valor:
              </label>
              <div className="brd-cat-delete">
                <p id="selected-value">{selectedValue}</p>
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
              </div>
            </div>
          )}
        </div>
      </form>
      {error && <p className="errorMessag">{error}</p>}
      {successMessage && <p className="successMessag">{successMessage}</p>}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title> Confirmação</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p> Tem a certeza que pretende eliminar Categoria/Marca?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={(e) => handleRemoveSelectedRelation(e)}
          >
            Confirmar
          </Button>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeleteRelationConfig;
