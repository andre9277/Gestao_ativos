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
*/ import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const ConfigDropdown = ({
  Title,
  id,
  error,
  successMessage,
  datas,
  tag,
  handleDel,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedValue, setSelectedValue] = useState(""); // New state to store the selected value

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleFormSubmit = (event) => {
    event.preventDefault(); // Prevent form submission and page refresh
    handleDel(); // Trigger the handleAdd function to save the data
    setSelectedValue(""); // Clear the selectedValue after deleting
    handleCloseModal(); // Close the modal after saving data
  };

  const handleSelectChange = (event) => {
    const selectedId = event.target.value;
    const selectedData = datas.find(
      (data) => data.id === parseInt(selectedId, 10)
    );
    setSelectedValue(selectedData ? selectedData.name : "");
  };

  return (
    <div id="container-config">
      <form className="frm-cats">
        <label htmlFor={tag} className="lb-cats">
          {Title === "Fornecedor" ? (
            <>Lista de {Title}es:</>
          ) : (
            <>Lista de {Title}s:</>
          )}
        </label>
        <p></p>
        <label className="sub-title">
          Selecione um(a) {Title} para apagar:
        </label>
        <select
          id={tag}
          name={tag}
          multiple
          className="slc-cat"
          onChange={handleSelectChange} // Call handleSelectChange when the selection changes
        >
          {datas.map((data) => (
            <option key={data.id} value={data.id}>
              {data.name}
            </option>
          ))}
        </select>
        <p></p>
        {/* Display the selected value inside a label tag */}
        {selectedValue && (
          <div>
            <label htmlFor="selectedValue" className="lb-cats">
              Apagar valor:
            </label>
            <p></p>
            <div className="brd-cat-delete">
              <p id="selected-value">{selectedValue}</p>
              <button type="button" id="btnRemove" onClick={handleShowModal}>
                <i
                  className="fa fa-trash fa-lg"
                  aria-hidden="true"
                  title="Apagar"
                ></i>
              </button>
            </div>
          </div>
        )}
      </form>
      {error && <p className="alert">{error}</p>}
      {successMessage && <p className="good">{successMessage}</p>}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmação</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Tem a certeza que pretende eliminar a {Title}
            <strong> {selectedValue}</strong>?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={(e) => handleFormSubmit(e)}>
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

export default ConfigDropdown;
