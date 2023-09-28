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
import { createBrowserRouter, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard.jsx";
import DefaultLayout from "./components/DefaultLayout.jsx";
import GuestLayout from "./components/GuestLayout.jsx";
import Login from "./views/Login.jsx";
import NotFound from "./views/NotFound.jsx";
import Users from "./views/Users.jsx";
import UserForm from "./views/UserForm.jsx";
import ForgotPass from "./views/ForgotPass.jsx";
import Assets from "./views/Assets.jsx";
import AssetForm from "./views/AssetForm.jsx";
import Allocations from "./views/Allocations.jsx";
import ManutLayout from "./components/ManutLayout.jsx";
import ReportPage from "./views/ReportPage.jsx";
import AssetInfo from "./views/AssetInfo.jsx";
import Import from "./views/Import.jsx";
import AddAssetMovementForm from "./components/AddAssetMovementForm.jsx";
import PasswordResetForm from "./views/PasswordResetForm.jsx";
import Config from "./components/Config.jsx";
import AssetRep from "./components/AssetRep.jsx";
import AssetObs from "./components/AssetObs.jsx";

//The router object defines the routes and components that should be rendered when a user navigates to a specific path.
const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      //Default path to the dashboard:
      {
        path: "/",
        element: <Navigate to="/dashboard" />,
      },
      //Path access to the dashboard
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      //Path access to the users
      {
        path: "/users",
        element: <Users />,
      },
      //Path access to the configurations
      {
        path: "/config",
        element: <Config />,
      },
      //Path access to the user form Create
      {
        path: "/users/new",
        element: <UserForm key="userCreate" />,
      },
      //Path access to the user form Update
      {
        path: "/users/:id",
        element: <UserForm key="userUpdate" />,
      },
      //Path access to the assets page
      {
        path: "/assets",
        element: <Assets />,
      },
      //Path access to the assetsForm update
      {
        path: "/assets/:id",
        element: <AssetForm key="assetUpdate" />,
      },
      //Path access to the assetsForm create
      {
        path: "/assets/new",
        element: <AssetForm key="assetCreate" />,
      },
      //Path access to the allocations page
      {
        path: "/allocations",
        element: <Allocations />,
      },
      //Path to the report page
      {
        path: "/report",
        element: <ReportPage />,
      },
      //Path to the asset information
      {
        path: "/infoasset/:id",
        element: <AssetInfo />,
      },
      //Path to the import page
      {
        path: "/import",
        element: <Import />,
      },
      //Path to the page Asset Movement Forms
      {
        path: "/addAssetMovement",
        element: <AddAssetMovementForm />,
      },
      //Path to the asset Report table page
      {
        path: "/assetsRep",
        element: <AssetRep />,
      },
      //Path to the asset "obsoleto" table page
      {
        path: "/assetsObs",
        element: <AssetObs />,
      },
    ],
  },
  //path for users with no permissions:
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      //path to login page
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  //any path that is not listed here, it goes to NotFound page
  {
    path: "*",
    element: <NotFound />,
  },
  //path to ForgotPassword
  {
    path: "/forgotpass",
    element: <ForgotPass />,
  },
  //Path to ForgotPassword
  {
    path: "/forgotPassword",
    element: <ForgotPass />,
  },
  //path to forgotPasswordForms
  {
    path: "/forgotPasswordForm/:token",
    element: <PasswordResetForm />,
  },

  //Layout for the user "Manutenção"
  {
    path: "/",
    element: <ManutLayout />,
    children: [
      //By default it goes to the dashboard
      {
        path: "/",
        element: <Navigate to="/dashboard" />,
      },
      //path to the dashboard
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      //Path to ForgotPassword
      {
        path: "/forgotPassword",
        element: <ForgotPass />,
      },
    ],
  },
]);

export default router;
