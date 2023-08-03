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
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client.js";
import { useEffect } from "react";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import Footer from "./Footer";
import SideBarGuest from "./SideBarGuest";
import ManutLayout from "./ManutLayout";
import SideBarSi from "./SideBarSi";

export default function DefaultLayout() {
  //data shared globally that handles the information about the user, token and notification
  const { user, token, setUser, setToken, notification } = useStateContext();

  //If the token does not exist, redirect the user to the login page
  if (!token) {
    return <Navigate to="/login" />;
  }

  //If he role of the user is 3, that means he is from "Manutenção", then a different component is present to the user
  if (user.role_id === 3) {
    return <ManutLayout />;
  }

  //Allows the user to leave his account
  const onLogout = (ev) => {
    ev.preventDefault();

    axiosClient.post("/logout").then(() => {
      setUser({});
      setToken(null);
    });

    axiosClient.post("/log", { message: "Record created" });
  };

  //Gets the data of all the users
  useEffect(() => {
    axiosClient.get("/user").then(({ data }) => {
      setUser(data);
    });
  }, []);

  return (
    <div id="defaultLayout">
      {/*if the role of the user is 3, "Manutencao", then it displays different sidebar options */}
      {user.role_id === 3 ? (
        <SideBarGuest />
      ) : user.role_id === 2 ? (
        <SideBarSi />
      ) : (
        <SideBar />
      )}
      {/* The TopBar, footer and Outlet is always the same for every user with any role
       */}{" "}
      <div className="content">
        <TopBar user={user} onLogout={onLogout} />

        <Outlet />

        {/* Notification when a user is created/updated or deleted */}
        {notification && <div className="notification">{notification}</div>}
        <Footer />
      </div>
    </div>
  );
}
