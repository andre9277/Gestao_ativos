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
import axiosClient from "../axios-client.js";
import { createRef } from "react";
import { useStateContext } from "../context/ContextProvider.jsx";
import { useState, useEffect } from "react";
import "../styles/Login.css";

import img_logo from "../assets/hb-logo.svg";

export default function Login() {
  const emailRef = createRef();
  const passwordRef = createRef();
  const { setUser, setToken } = useStateContext();
  const [message, setMessage] = useState(null);

  //Time displated of the error message
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {};
    const userInput = emailRef.current.value; //email of the user
    const password = passwordRef.current.value; //password of the user

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
    //Checks if there is one email and mec number
    if (!payload.email && !payload.mec) {
      setMessage("Por favor, insira o email ou número MEC");
      return;
    }

    //Checks if the is a pin and password
    if (!payload.pin && !payload.password) {
      setMessage("Por favor, insira a password ou PIN");
      return;
    }

    //does the login of the user
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
    <form className="form-login" onSubmit={handleSubmit}>
      <img
        src={img_logo}
        alt="Login image"
        className="w-100-new"
        style={{ objectFit: "cover", objectPosition: "left" }}
      />
      <h1 className="title-lg">Sistema Integrado de Gestão de Ativos</h1>
      <div className="space-mov-login"></div>
      {/* Email and mec. number Label */}
      <div className="mb-3">
        <label className="lb-lg">Endereço de email / Nº mec</label>
        <input className="form-control" ref={emailRef} />
      </div>
      {/* Pin label */}
      <div className="mb-3">
        <label className="lb-lg">Pin</label>
        <input type="password" className="form-control" ref={passwordRef} />
      </div>
      {/* Login Button */}
      <div className="d-grid">
        <button type="submit" className="btn-login">
          Log in
        </button>
      </div>
      {/* Forgot password link label */}
      <p className="lb-lg text-right">
        Esqueceu a sua{" "}
        <a href="/forgotPassword" className="link-pages">
          password?
        </a>
      </p>
      {message && (
        <div className="alert">
          <p>{message}</p>
        </div>
      )}
      {/* Footer */}
      <div className="footer-copyR">
        V1.0.0 © 2023. Hospital de Braga
        <p>Serviço de Sistemas de Informação</p>
      </div>
    </form>
  );
}
