import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import ForgotPass from "./ForgotPass";
import Login from "./Login";
import MainPage from "./MainPage";
import NotFound from "./NotFound";
import PesquisaAtivos from "./PesquisaAtivos";
import Register from "./Register";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/resetpass" element={<ForgotPass />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/pesquisativos" element={<PesquisaAtivos />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
