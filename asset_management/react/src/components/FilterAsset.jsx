import React, { useState } from "react";

const FilterAsset = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown-containerr">
      <div className="dropdown-headerr" onClick={toggleDropdown}>
        <i className="fa fa-filter fa-lg" aria-hidden="true"></i>
      </div>

      {isOpen && (
        <div className="dropdown-menuu">
          <div className="dropdown-optionn">Option 1</div>
          <div className="dropdown-option">Option 2</div>
          <div className="dropdown-option">Option 3</div>
          <div className="dropdown-option">Option 4</div>
        </div>
      )}
    </div>
  );
};

export default FilterAsset;
