import React, { useState } from "react";
import "../styles/sidebar.css";
import UserInfo from "./UserInfo";
import { Link } from "react-router-dom";

const Sidebar = ({ user, onLogout }) => {
  // to change burger classes
  const [burger_class, setBurgerClass] = useState("burger-bar unclicked");
  const [menu_class, setMenuClass] = useState("menu hidden");
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null); // State variable to track the selected option

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

  // Function to handle the option click and update the selected option
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    //Handles the sidebar closing when user clicks on one option
    setMenuClass("menu hidden");
    setBurgerClass("burger-bar unclicked");
    setMenuClass("menu hidden");
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
          <Link to={"/dashboard"}>
            <h1 className="title-topbar">SIGA</h1>
          </Link>
        </div>

        <div className="logout-div">
          <div className="scan-asset">
            <Link to="/scan">
              <i
                className="fa fa-barcode fa-2x"
                aria-hidden="true"
                alt="barcode"
              ></i>
            </Link>
          </div>

          <UserInfo user={user} onLogout={onLogout} />
        </div>
      </nav>

      <div className={menu_class}>
        <ul className="all-sd">
          <Link to={"/assets"}>
            <li
              className={`opt-sidebar ${
                selectedOption === "procurar" ? "selected" : ""
              }`}
              onClick={() => handleOptionClick("procurar")}
            >
              <i className="fa fa-search" aria-hidden="true"></i>
              <label className="lb-sd">&nbsp;&nbsp; Procurar</label>
            </li>
          </Link>
          <Link to={"/infoasset/2"}>
            <li
              className={`opt-sidebar-r ${
                selectedOption === "registar" ? "selected" : ""
              }`}
              onClick={() => handleOptionClick("registar")}
            >
              <i className="fa fa-pencil-alt" aria-hidden="true"></i>
              <label className="lb-sd">&nbsp;&nbsp; Registar</label>
            </li>
          </Link>
          <Link to={"/infoasset/2"}>
            <li
              className={`opt-sidebar-m ${
                selectedOption === "movimento" ? "selected" : ""
              }`}
              onClick={() => handleOptionClick("movimento")}
            >
              <i className="fa fa-exchange-alt" aria-hidden="true"></i>
              <label className="lb-sd">&nbsp;&nbsp; Movimento</label>
            </li>
          </Link>
          <Link to={"/infoasset/2"}>
            <li
              className={`opt-sidebar-p ${
                selectedOption === "perfil" ? "selected" : ""
              }`}
              onClick={() => handleOptionClick("perfil")}
            >
              <i className="fa fa-cog" aria-hidden="true"></i>
              <label className="lb-sd">&nbsp;&nbsp; Perfil</label>
            </li>
          </Link>
          <a onClick={onLogout}>
            <li className="opt-sidebar-leave">
              <i className="fa fa-sign-out-alt" aria-hidden="true"></i>
              <label className="lb-sd">&nbsp;&nbsp; Sair</label>
            </li>
          </a>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
