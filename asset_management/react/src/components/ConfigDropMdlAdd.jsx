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

const ConfigDropMdlAdd = ({
  Title,
  id,
  setData,
  setNewData,
  handleAdd,
  brands, // Array of brands
  selectedBrand, // Currently selected brand
  handleBrandChange, // Function to handle brand selection
  maintb,
  error,
  successMessage,
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAdd(); // Call the handleDataUpdate function on form submission
    handleCloseModal();
  };

  return (
    <div id="container-config">
      <form className="frm-cats-mdl">
        {/* Brand selection dropdown */}
        <label htmlFor="brandSelect" className="lb-cats">
          {maintb}:
        </label>
        <p></p>
        <label className="sub-title">Selecione um(a) {maintb}:</label>
        <select
          id="brandSelect"
          name="brandSelect"
          value={selectedBrand}
          onChange={handleBrandChange}
          className="configSelect"
        >
          <option value=""></option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>
        <label htmlFor={id} className="lb-cats">
          {Title}
        </label>
        <p></p>
        <label className="sub-title">
          {" "}
          Introduza o nome da(o) {Title} que deseja adicionar:
        </label>
        <div className="brd-cat-delete">
          <input
            type="text"
            value={setData}
            onChange={(e) => setNewData(e.target.value)}
            autoComplete="off"
            className="inp-mdl"
          />

          <button type="button" id="btnAddd" onClick={handleShowModal}>
            <i
              className="fa fa-plus fa-lg"
              aria-hidden="true"
              title="Adicionar"
            ></i>
          </button>
        </div>
      </form>
      {error && <p className="alert">{error}</p>}
      {successMessage && <p className="good">{successMessage}</p>}

      {/* The Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title> Confirmação</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Add content inside the modal here */}
          {/* For example, you can display some information related to the Title */}
          <p> Tem a certeza que pretende adicionar a(o) {Title} ?</p>
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

export default ConfigDropMdlAdd;
