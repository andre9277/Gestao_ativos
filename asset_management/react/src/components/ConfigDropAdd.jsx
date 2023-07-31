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

const ConfigDropAdd = ({
  Title,
  id,
  setData,
  setNewData,
  handleAdd,
  error,
  successMessage,
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleFormSubmit = (event) => {
    event.preventDefault(); // Prevent form submission and page refresh
    handleAdd(); // Trigger the handleAdd function to save the data
    handleCloseModal(); // Close the modal after saving data
  };

  return (
    <div id="container-config">
      <form className="frm-cats">
        <label htmlFor={id} className="lb-cats">
          {Title}
        </label>
        <p></p>
        <label className="sub-title">
          Introduza o nome da(o) {Title} que deseja adicionar:
        </label>
        <div className="addLbBtn">
          <input
            type="text"
            value={setData}
            onChange={(e) => setNewData(e.target.value)}
            autoComplete="off"
            className="inpt-configs"
          />
          <button id="btnAdd" type="button" onClick={handleShowModal}>
            {/* Open the modal when the user clicks this button */}
            <i
              className="fa fa-plus fa-lg"
              aria-hidden="true"
              title="Adicionar"
            ></i>
          </button>
        </div>
        {error && <p className="errorMessag">{error}</p>}
        {successMessage && <p className="successMessag">{successMessage}</p>}
      </form>
      {/* The Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title> Confirmação</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Add content inside the modal here */}
          {/* For example, you can display some information related to the Title */}
          <p> Tem a certeza que pretende adicionar a {Title} ?</p>
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

export default ConfigDropAdd;
