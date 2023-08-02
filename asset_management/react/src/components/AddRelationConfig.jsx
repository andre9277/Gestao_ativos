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
import React from "react";
import { Modal, Button } from "react-bootstrap";

const AddRelationConfig = ({
  rel1,
  rel2,
  selectedAttri,
  setSelectedAttri,
  array1,
  selectedAttriSec,
  setSelectedAttriSec,
  array2,
  handleShowModal,
  error,
  successMessage,
  showModal,
  handleCloseModal,
  handleSubmit,
}) => {
  return (
    <div id="container-config">
      <form>
        <h4 className="titleconfig">
          Adicionar relação {rel1}/{rel2}:
        </h4>

        {/* Category*/}
        <label className="configlb">{rel1}:</label>
        <select
          name="category"
          id="category"
          value={selectedAttri}
          className="configSelect"
          onChange={(e) => setSelectedAttri(e.target.value)}
        >
          <option value=""></option>
          {array1.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        {/* Brand*/}
        <label className="configlb">Marca:</label>
        <div className="brd-cat-add">
          <select
            name="brand"
            id="brand"
            value={selectedAttriSec}
            className="configSelect"
            onChange={(e) => setSelectedAttriSec(e.target.value)}
          >
            <option value=""></option>
            {array2.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>

          <button
            type="button"
            className="addConfig-cat-br"
            onClick={handleShowModal}
          >
            <i
              className="fa fa-plus fa-lg"
              aria-hidden="true"
              title="Adicionar"
            ></i>
          </button>
        </div>
      </form>

      {error && <p className="errorMessag">{error}</p>}
      {successMessage && <p className="successMessag">{successMessage}</p>}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title> Confirmação</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            {" "}
            Tem a certeza que pretende adicionar {rel1}/{rel2}?
          </p>
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

export default AddRelationConfig;
