import React from "react";
import { Link } from "react-router-dom";

export const MenuItem = ({ name, menuId }) => {
  return (
    <li className="nav-item">
      <a
        className="nav-link collapsed"
        href="#"
        data-toggle="collapse"
        data-target={`#${menuId}`}
        aria-expanded="true"
        aria-controls={menuId}
      >
        <i className="fas fa-fw fa-cog"></i>
        <span>{name}</span>
      </a>
      <div
        id={menuId}
        className="collapse"
        aria-labelledby="headingTwo"
        data-parent="#accordionSidebar"
      >
        <div className="bg-white py-2 collapse-inner rounded">
          {/* <h6 className="collapse-header">{Name}</h6> */}
          <Link to="/pesquisativos">
            <button className="collapse-item">Pesquisar Ativos</button>
          </Link>
          <a className="collapse-item" href="cards.html">
            Alterar Ativos
          </a>
          <a className="collapse-item" href="cards.html">
            Eliminar Ativos
          </a>
          <a className="collapse-item" href="cards.html">
            Adicionar Ativo
          </a>
        </div>
      </div>
    </li>
  );
};

export default MenuItem;
