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
*/
import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "../styles/Config.css";

const ConfigDropEdit = ({
  Title,
  tag,
  datas,
  selectedData, // Data object that is currently selected for editing
  handleDataSelection, // Function to handle the selection of data for editing
  editedValue, // The edited value in the input field
  setEditedValue, // Function to update the edited value
  handleDataUpdate, // Function to handle the data update on the server
  error,
  successMessage,
}) => {
  //keeps track of the show modal variable
  const [showModal, setShowModal] = useState(false);

  //Function that handles the close modal
  const handleCloseModal = () => setShowModal(false);
  //function that handles the show modal
  const handleShowModal = () => setShowModal(true);

  //Function that allows the data submit
  const handleSubmit = (event) => {
    event.preventDefault();
    handleDataUpdate(); // Call the handleDataUpdate function on form submission
    handleCloseModal();
    setEditedValue("");
  };

  return (
    <div id="container-config">
      <form className="frm-cats-edit">
        <label htmlFor={tag} className="lb-cats">
          {Title === "Fornecedor" ? (
            <>Lista de {Title}es:</>
          ) : (
            <>Lista de {Title}s:</>
          )}
        </label>
        <p></p>
        <label className="sub-title">
          Selecione um(a) {Title} para editar:
        </label>
        <select
          id={tag}
          name={tag}
          multiple
          className="slc-cat"
          onChange={handleDataSelection}
        >
          {/* Iterates trough all the data */}
          {datas.map((data) => (
            <option key={data.id} value={data.name}>
              {data.name}
            </option>
          ))}
        </select>
        <p></p>

        {selectedData && (
          <div>
            <label htmlFor="editValue" className="lb-cats-edit">
              Editar valor:
            </label>
            <p></p>
            <div className="addLbBtn">
              <input
                type="text"
                id="editValue"
                value={editedValue}
                onChange={(e) => setEditedValue(e.target.value)}
                className="slc-cat-edit"
              />
              <button type="button" id="btnAdd" onClick={handleShowModal}>
                <i
                  className="fa fa-plus fa-lg"
                  aria-hidden="true"
                  title="Adicionar"
                ></i>
              </button>
            </div>
          </div>
        )}
      </form>
      {error && <p className="alert">{error}</p>}
      {successMessage && <p className="good">{successMessage}</p>}
      {/* The Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title> Confirmação</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p> Pretende guardar todas as alterações?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={(e) => handleSubmit(e)}>
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

export default ConfigDropEdit;
