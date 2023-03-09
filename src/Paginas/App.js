import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideBar from "../Componentes/SideBar";
import TopBar from "../Componentes/TopBar";
import ForgotPass from "./ForgotPass";
import Login from "./Login";
import NotFound from "./NotFound";
import Register from "./Register";
import Table from "./Table";
import Footer from "../Componentes/Footer";
import Logout from "../Componentes/Logout";
import Dashboard from "./Dashboard";
import "./styles.css";

const App = () => {
  return (
    <BrowserRouter>
      <body>
        <div id="wrapper">
          <SideBar />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <TopBar />
              <Routes>
                <Route exact path="/dashboard" element={<Dashboard />} />
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/resetpass" element={<ForgotPass />} />
                <Route path="/pesquisativos" element={<Table />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </div>
        <Logout />
      </body>
    </BrowserRouter>
  );
};

export default App;
