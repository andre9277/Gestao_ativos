import React from "react";

const MenuItemSimple = ({ Titulo, Icon }) => {
  return (
    <li className="nav-item">
      <a className="nav-link" href="charts.html">
        <i className={`fas fa-fw ${Icon}`}></i>
        <span>{Titulo}</span>
      </a>
    </li>
  );
};

export default MenuItemSimple;
