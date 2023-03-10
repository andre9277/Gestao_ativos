import React from "react";
import { Link } from "react-router-dom";

const MenuItemSimple = ({ titulo, icon, origem }) => {
  return (
    <li className="nav-item">
      <Link to={`/${origem}`}>
        <a className="nav-link">
          <i className={`fas fa-fw ${icon}`}></i>
          <span>{titulo}</span>
        </a>
      </Link>
    </li>
  );
};

export default MenuItemSimple;
