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
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import Users from "./views/Users";
import ForgotPass from "./views/ForgotPass.jsx";
import Scan from "./views/Scan.jsx";
import Assets from "./views/Assets.jsx";
import AssetForm from "./views/AssetForm.jsx";
import AssetInfo from "./views/AssetInfo.jsx";
import AddAssetMovementForm from "./components/AddAssetMovementForm.jsx";
import PasswordResetForm from "./views/PasswordResetForm.jsx";

//The router object defines the routes and components that should be rendered when a user navigates to a specific path.
const router = createBrowserRouter([
  {
    //Profile  of the DefaultLayout:
    path: "/",
    element: <DefaultLayout />,
    children: [
      //path of default goes for the dashboard
      {
        path: "/",
        element: <Navigate to="/dashboard" />,
      },
      //path to dashboard
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      //path to the users
      {
        path: "/users",
        element: <Users />,
      },
      //path to the scan page
      {
        path: "/scan",
        element: <Scan />,
      },
      //path to the assets page
      {
        path: "/assets",
        element: <Assets />,
      },
      //path to add a new Asset
      {
        path: "/assets/new",
        element: <AssetForm key="assetCreate" />,
      },
      //path to AssetInformation
      {
        path: "/infoasset/:id",
        element: <AssetInfo />,
      },
      //path to AssetMovement
      {
        path: "/addAssetMovement",
        element: <AddAssetMovementForm />,
      },
    ],
  },
  //Profile of the GuestLayout, onlycan try to login
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      //path to login
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  //When user types one path with nothing expected it goes to the NotFound page
  {
    path: "*",
    element: <NotFound />,
  },
  //Path to forgotPassword
  {
    path: "/forgotPassword",
    element: <ForgotPass />,
  },
  //Path to ResetPassword
  {
    path: "/forgotPasswordForm/:token",
    element: <PasswordResetForm />,
  },
]);

export default router;
