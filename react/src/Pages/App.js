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


All the changes made to enable the implementation of the desired development tools were made by André Ferreira.
*/

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ForgotPass from "./ForgotPass";
import Login from "./Login";
import NotFound from "./NotFound";
import Register from "./Register";
import Ativos from "./Ativos";
import Dashboard from "./Dashboard";
import "../Styles/styles.css";
import Layout from "../Components/Layout";
import ContextProvider from "../Contexts/ContextProvider";
import AddAtivo from "./AddAtivo";

const App = () => {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route path="/ativos" element={<Ativos />} />
            <Route path="/addAtivo" element={<AddAtivo />} />
          </Route>
          <Route path="/" element={<Login />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/register" element={<Register />} />
          <Route path="/resetpass" element={<ForgotPass />} />
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  );
};

export default App;
