import React, { useState } from "react";
import Configuration from "../views/Configuration";
import "../styles/SidebarConfig.css";

const SidebarConfig = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentModal, setCurrentModal] = useState(null); // New state to manage modals

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setCurrentModal(null); // Close the modal when switching between options
  };

  return (
    <div className="sidebar-config">
      <div>
        <button onClick={() => handleOptionClick("Categorias")} className="">
          Categoria
        </button>
        <button onClick={() => handleOptionClick("Marcas")}>Marca</button>
        {/*  <button onClick={() => handleOptionClick("Modelos")}>Modelo</button> */}
        <button onClick={() => handleOptionClick("Fornecedor")}>
          Fornecedor
        </button>
        <button onClick={() => handleOptionClick("Entidade")}>Entidade</button>
        {/*  <button onClick={() => handleOptionClick("Unidade")}>Unidade</button> */}
      </div>
      <div className="sid-cnf">
        {/* Pass the selectedOption and currentModal to the Configuration component */}
        {selectedOption && (
          <Configuration
            selectedOption={selectedOption}
            currentModal={currentModal}
            setCurrentModal={setCurrentModal}
          />
        )}
      </div>
    </div>
  );
};

export default SidebarConfig;

//https://stackblitz.com/edit/react-simple-crud?file=index.js
