import React from "react";

const MenuItemSimple = ({ titulo, icon }) => {
  return (
    <li className="nav-item">
      <a className="nav-link" href="charts.html">
        <i className={`fas fa-fw ${icon}`}></i>
        <span>{titulo}</span>
      </a>
    </li>
  );
};

export default MenuItemSimple;
