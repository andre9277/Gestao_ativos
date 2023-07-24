import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const Configuration = ({ selectedOption }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "" });

  const handleAdd = () => {
    // Implement the add functionality here
    console.log("Add button clicked for", selectedOption);
    setModalIsOpen(true);
  };

  const handleEdit = () => {
    // Implement the edit functionality here
    console.log("Edit button clicked for", selectedOption);
    setModalIsOpen(true);
  };

  const handleDelete = () => {
    // Implement the delete functionality here
    console.log("Delete button clicked for", selectedOption);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here, you can add your specific logic to handle the form submission and data addition.
    // For example, if you are adding a new item, you can call an API or update the state with the new item.
    console.log("Form submitted:", formData);
    closeModal(); // Close the modal after form submission
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div>
      <button onClick={handleAdd}>Adicionar</button>
      <button onClick={handleEdit}>Editar</button>
      <button onClick={handleDelete}>Apagar</button>

      {/* Add Modal */}
      <Modal show={modalIsOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{`Adicionar ${selectedOption}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Your add modal content goes here */}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>
            {/* Add more form fields as needed */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close Modal
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Add {selectedOption}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Configuration;

