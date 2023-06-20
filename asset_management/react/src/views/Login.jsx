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
import { Link } from "react-router-dom";
import axiosClient from "../axios-client.js";
import { createRef } from "react";
import { useStateContext } from "../context/ContextProvider.jsx";
import { useState } from "react";

import img_logo from "../assets/hb_logo.png";
import img_logo2 from "../assets/logo_new_hb.png";

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";

export default function Login() {
  const emailRef = createRef();
  const passwordRef = createRef();
  const { setUser, setToken } = useStateContext();
  const [message, setMessage] = useState(null);

  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    axiosClient
      .post("/login", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setMessage(response.data.message);
        }
      });
  };

  return (
    <div className="back-col-login">
      <div className="back-col-login2">
        <MDBContainer fluid>
          <div className="logo-div-hb">
            <MDBRow>
              <MDBCol sm="4">
                <div className="d-flex flex-row ps-5 pt-5">
                  <h1 className="title-lg">
                    Sistema de Integração e Gestão de Ativos
                  </h1>
                </div>

                <form onSubmit={onSubmit} className="login-temp">
                  {message && (
                    <div className="alert">
                      <p>{message}</p>
                    </div>
                  )}
                  <div className="d-flex flex-column justify-content-center h-custom-2 w-75 pt-4">
                    <h3
                      className="fw-normal mb-3 ps-5 pb-3"
                      style={{ letterSpacing: "1px" }}
                    >
                      Log in
                    </h3>
                    <MDBInput
                      wrapperClass="mb-4 mx-5 w-100"
                      label="Endereço de email"
                      id="formControlLg"
                      type="email"
                      size="lg"
                      ref={emailRef}
                    />
                    <MDBInput
                      wrapperClass="mb-4 mx-5 w-100"
                      label="Password"
                      id="formControlLg"
                      type="password"
                      size="lg"
                      ref={passwordRef}
                      autoComplete="false"
                    />

                    <MDBBtn
                      className="mb-4 px-5 mx-5 w-100"
                      color="info"
                      size="lg"
                    >
                      Log in
                    </MDBBtn>
                    <p className="small mb-5 pb-lg-3 ms-5">
                      <Link to="/forgotpass" className="small">
                        Esqueceu-se da password?
                      </Link>
                      {"   "}Não tem uma conta?{" "}
                      <Link to="/signup">Registe-se aqui!</Link>
                    </p>
                  </div>
                </form>
              </MDBCol>

              <MDBCol sm="8" className="d-none d-sm-block px-0">
                <img
                  src={img_logo2}
                  alt="Login image"
                  className="w-100-new"
                  style={{ objectFit: "cover", objectPosition: "left" }}
                />
              </MDBCol>
            </MDBRow>
          </div>
        </MDBContainer>
      </div>
    </div>
  );
}
