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
import React, { useState, useEffect } from "react";
import "../styles/styles.css";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client.js";

const ForgotPass = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosClient.post("/forgot-password", { email });
      setMessage("Verifique o seu email");
    } catch (error) {
      setMessage("Email inválido, tente novamente!");
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div id="layoutAuthentication">
      <div id="layoutAuthentication_content">
        <main>
          <div className="container">
            <div className="justify-content-center">
              <div className="col-lg-5">
                <div className="carddd shadow-lg border-0 rounded-lg mt-5">
                  <div className="card-header">
                    <h3 className="text-center font-weight-light my-4">
                      Recuperação da Password
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="small mb-3 text-muted">
                      Insira o seu endereço de email. Um link será enviado para
                      recuperar a sua password.
                    </div>
                    <form onSubmit={handleSubmit} className="reset-pass-forms">
                      <div className=" mb-3">
                        <label className="rec-pass">Endereço de email:</label>
                      </div>
                      <div>
                        <input
                          className="inp-res-pass"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />

                        <button type="submit" className="btn-rec-pass">
                          Recuperar Password
                        </button>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                        <Link to="/" className="small">
                          Login
                        </Link>
                      </div>
                    </form>
                    {message && (
                      <div>
                        {message === "Verifique o seu email" ? (
                          <div className="ms-rec-pass-conf">{message}</div>
                        ) : (
                          <div className="ms-rec-pass">{message}</div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ForgotPass;
