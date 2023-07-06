import React, { useState } from "react";
import "../styles/sidebar.css";
import UserInfo from "./UserInfo";

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
        <div className="logout-div">
          <UserInfo user={user} onLogout={onLogout} />
        </div>
      </nav>

      <div className={menu_class}>
        <ul>
          <li className="opt-sidebar">
            {" "}
            <i class="fa fa-search" aria-hidden="true">
              Procurar
            </i>
          </li>
          <li className="opt-sidebar">
            {" "}
            <i className="fa fa-exchange-alt" aria-hidden="true">
              {" "}
              Movimento{" "}
            </i>
          </li>
          <li className="opt-sidebar">
            {" "}
            <i class="fa fa-cog" aria-hidden="true">
              Configurações
            </i>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
