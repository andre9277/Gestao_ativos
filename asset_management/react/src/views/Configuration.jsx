import React from "react";

const Configuration = ({ selectedOption }) => {
  const handleAdd = () => {
    // Implement the add functionality here
    console.log("Add button clicked for", selectedOption);
  };

  const handleEdit = () => {
    // Implement the edit functionality here
    console.log("Edit button clicked for", selectedOption);
  };

  const handleDelete = () => {
    // Implement the delete functionality here
    console.log("Delete button clicked for", selectedOption);
  };

  return (
    <div>
      <button onClick={handleAdd}>Adicionar {selectedOption}</button>
      <button onClick={handleEdit}>Editar {selectedOption}</button>
      <button onClick={handleDelete}>Apagar {selectedOption}</button>
    </div>
  );
};

export default Configuration;
