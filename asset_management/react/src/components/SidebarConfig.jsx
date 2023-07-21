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
        <button onClick={() => handleOptionClick("Categorias")}>
          Categorias
        </button>
        <button onClick={() => handleOptionClick("Marcas")}>Marcas</button>
        <button onClick={() => handleOptionClick("Modelos")}>Modelos</button>
      </div>
      {selectedOption && <Configuration selectedOption={selectedOption} />}
    </div>
  );
};

export default SidebarConfig;
