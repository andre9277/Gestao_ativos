/* The MIT License (MIT)

Copyright (c) 2013-2023 Start Bootstrap LLC

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. 

You may obtain a copy of the license at:

      https://github.com/StartBootstrap/startbootstrap-sb-admin-2


Project developed under the EstágiAP XXI Program.
Advisor: Emanuel Gonçalves
Autor: André Ferreira
Local: Hospital de Braga, EPE
Department: Serviço de Sistema de Informação

All the changes made to enable the implementation of the desired development tools were made by André Ferreira.
*/
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
          <Link to={"/assets/new"}>
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
          <Link to={"/addAssetMovement"}>
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
