import React, { useState } from "react";
import "../styles/sidebar.css";
import UserInfo from "./UserInfo";
import { Link } from "react-router-dom";

const Sidebar = ({ user, onLogout }) => {
  // to change burger classes
  const [burger_class, setBurgerClass] = useState("burger-bar unclicked");
  const [menu_class, setMenuClass] = useState("menu hidden");
  const [isMenuClicked, setIsMenuClicked] = useState(false);

  // toggle burger menu change
  const updateMenu = () => {
    if (!isMenuClicked) {
      setBurgerClass("burger-bar clicked");
      setMenuClass("menu visible");
    } else {
      setBurgerClass("burger-bar unclicked");
      setMenuClass("menu hidden");
    }
    setIsMenuClicked(!isMenuClicked);
  };

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <nav>
        <div className="burger-menu" onClick={updateMenu}>
          <div className={burger_class}></div>
          <div className={burger_class}></div>
          <div className={burger_class}></div>
        </div>
        <div>
          <h1 className="title-topbar">SIGA</h1>
        </div>

        <div className="logout-div">
          <div className="scan-asset">
            <Link to="/scan">
              <i className="fa fa-barcode fa-2x" aria-hidden="true"></i>
            </Link>
          </div>

          <UserInfo user={user} onLogout={onLogout} />
        </div>
      </nav>

      <div className={menu_class}>
        <ul className="all-sd">
          <li className="opt-sidebar">
            <i className="fa fa-search" aria-hidden="true"></i>
            <label className="lb-sd">&nbsp;&nbsp; Procurar</label>
          </li>
          <li className="opt-sidebar">
            <i class="fa fa-pencil-alt" aria-hidden="true"></i>
            <label className="lb-sd">&nbsp;&nbsp; Registar</label>
          </li>
          <li className="opt-sidebar">
            <i className="fa fa-exchange-alt " aria-hidden="true"></i>
            <label className="lb-sd">&nbsp;&nbsp; Movimento</label>
          </li>
          <li className="opt-sidebar">
            <i class="fa fa-cog" aria-hidden="true"></i>
            <label className="lb-sd">&nbsp;&nbsp; Perfil </label>
          </li>
          <li className="log-out-sd">
            <i class="fa fa-sign-out-alt" aria-hidden="true"></i>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
