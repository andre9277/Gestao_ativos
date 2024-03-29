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
import { Link } from "react-router-dom";
import axiosClient from "../axios-client.js";
import { createRef } from "react";
import { useStateContext } from "../context/ContextProvider.jsx";
import { useState, useEffect } from "react";
import img_logo2 from "../assets/hbb_braga.jpg";
import img_logo from "../assets/logo_wh-rebg.png";

import { MDBContainer, MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";

export default function Login() {
  const emailRef = createRef();
  const passwordRef = createRef();
  const { setUser, setToken } = useStateContext();
  const [message, setMessage] = useState(null);

  //Displays the message for 5 seconds:
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [message]);

  //On login submit:
  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = {};
    //Email that the user input
    const userInput = emailRef.current.value;
    //password or pin input
    const password = passwordRef.current.value;

    // Check if userInput matches email format
    if (/^\S+@\S+\.\S+$/.test(userInput)) {
      payload.email = userInput;
    } else {
      payload.mec = userInput;
    }

    // Check if the password is a 6-digit PIN
    if (/^\d{6}$/.test(password)) {
      payload.pin = password;
    } else {
      payload.password = password;
    }

    if (!payload.email && !payload.mec) {
      setMessage("Por favor, insira o email ou número MEC");
      return;
    }

    if (!payload.pin && !payload.password) {
      setMessage("Por favor, insira a password ou PIN");
      return;
    }

    //Request for the Login
    axiosClient
      .post("/login", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        const response = err.response;

        if (response && response.status === 422) {
          setMessage("Atenção! Verifique se introduziu os dados corretamente!");
        }
      });
  };

  return (
    <div className="back-col-login">
      <div className="back-col-login2">
        <MDBContainer fluid>
          <div className="logo-div-hb">
            <MDBRow>
              <MDBCol sm="3">
                <img
                  src={img_logo}
                  alt="Login image logo"
                  className="logo-whbg"
                  style={{ width: "134px", height: "150px" }}
                />
                <div className="d-flex flex-row ps-3 pt-3">
                  <h1 className="title-lg">
                    Sistema Integrado de Gestão de Ativos
                  </h1>
                </div>

                <form onSubmit={onSubmit} className="login-temp">
                  {message && (
                    <div className="alert">
                      <p>{message}</p>
                    </div>
                  )}
                  <div className="login-main-box">
                    <MDBInput
                      wrapperClass="mb-4 mx-5 w-200"
                      label="Endereço de email / número MEC"
                      id="formControlLg"
                      size="lg"
                      ref={emailRef}
                    />
                    <MDBInput
                      wrapperClass="mb-4 mx-5 w-200"
                      label="Password / Pin"
                      id="formControlLg"
                      type="password"
                      size="lg"
                      ref={passwordRef}
                      autoComplete="false"
                    />
                    <div className="space"></div>

                    <button className="btn-login-main ">Log in</button>
                    <div className="space"></div>
                    <p className="small mb-5 pb-lg-3 ms-5">
                      <Link to="/forgotPassword" className="small">
                        Esqueceu-se da password?
                      </Link>
                    </p>
                  </div>
                </form>
                <div className="footer-copyR">
                  V1.0.0 © 2023. Hospital de Braga - Serviço de Sistemas de
                  Informação
                </div>
              </MDBCol>

              <MDBCol sm="9" className="d-none d-sm-block px-0">
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
