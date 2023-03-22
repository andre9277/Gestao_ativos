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
import React, { useState } from "react";
import "../Styles/styles.css";
import { Link } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //Enviar um request ao servidor utilizando o fetch - Através de uma função assincrona
    const submit = async (e) => {
        e.preventDefault();

        try {
            //obter resposta do servidor
            const response = await fetch("http://localhost:8000/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            });

            const content = await response.json();
            console.log(content);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
                <main>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-7">
                                <div className="card shadow-lg border-0 rounded-lg mt-5">
                                    <div className="card-header">
                                        <h3 className="text-center font-weight-light my-4">
                                            Criar Conta
                                        </h3>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={submit} action="/">
                                            <div className="form-floating mb-3">
                                                <input
                                                    className="form-control"
                                                    id="inputFirstName"
                                                    type="text"
                                                    placeholder="Enter your first name"
                                                    onChange={(e) =>
                                                        setName(e.target.value)
                                                    }
                                                />
                                                <label htmlFor="inputFirstName">
                                                    Nome Completo
                                                </label>
                                                {/* <div className="col-md-6">
                                                    <div className="form-floating">
                                                        <input
                                                        
                                                            className="form-control"
                                                            id="inputLastName"
                                                            type="text"
                                                            placeholder="Enter your last name"
                                                        />
                                                        <label htmlFor="inputLastName">
                                                            Last name
                                                        </label>
                                                    </div>
                                                </div> */}
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input
                                                    className="form-control"
                                                    id="inputEmail"
                                                    type="email"
                                                    placeholder="name@example.com"
                                                    onChange={(e) =>
                                                        setEmail(e.target.value)
                                                    }
                                                />
                                                <label htmlFor="inputEmail">
                                                    Endereço de email
                                                </label>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <div className="form-floating mb-3 mb-md-0">
                                                        <input
                                                            className="form-control"
                                                            id="inputPassword"
                                                            type="password"
                                                            placeholder="Create a password"
                                                            autoComplete="false"
                                                            onChange={(e) =>
                                                                setPassword(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                        <label htmlFor="inputPassword">
                                                            Password
                                                        </label>
                                                    </div>
                                                </div>
                                                {/* <div className="col-md-6">
                                                    <div className="form-floating mb-3 mb-md-0">
                                                        <input
                                                            className="form-control"
                                                            id="inputPasswordConfirm"
                                                            type="password"
                                                            placeholder="Confirm password"
                                                            autoComplete="false"
                                                        />
                                                        <label htmlFor="inputPasswordConfirm">
                                                            Confirme a Password
                                                        </label>
                                                    </div>
                                                </div> */}
                                            </div>

                                            <div className="mt-4 mb-0">
                                                <div className="d-grid">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary btn-block"
                                                    >
                                                        Criar conta
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="card-footer text-center py-3">
                                        <div className="small">
                                            <Link to="/">
                                                Tem uma conta? Realize login
                                                aqui!
                                            </Link>
                                        </div>
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

export default Register;
