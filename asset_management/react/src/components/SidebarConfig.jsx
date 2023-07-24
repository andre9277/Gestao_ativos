import React, { useState } from "react";
import Configuration from "../views/Configuration";
import "../styles/SidebarConfig.css";

const SidebarConfig = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="sidebar-config">
      <div>
        <button onClick={() => handleOptionClick("Categorias")} className="">
          Categoria
        </button>
        <button onClick={() => handleOptionClick("Marcas")}>Marca</button>
        <button onClick={() => handleOptionClick("Modelos")}>Modelo</button>
        <button onClick={() => handleOptionClick("Modelos")}>Fornecedor</button>
        <button onClick={() => handleOptionClick("Modelos")}>Entidade</button>
        <button onClick={() => handleOptionClick("Modelos")}>Unidade</button>
      </div>
      <div className="sid-cnf">
        {selectedOption && <Configuration selectedOption={selectedOption} />}
      </div>
    </div>
  );
};

export default SidebarConfig;

//https://stackblitz.com/edit/react-simple-crud?file=index.js
