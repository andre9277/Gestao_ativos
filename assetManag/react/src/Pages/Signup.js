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
import React, { useRef } from "react";
import "../Styles/styles.css";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../Contexts/ContextProvider.js";

const Register = () => {
    const nameFirstRef = useRef();
    const nameLastRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();

    //Guardar informação do utilizador e o token associado
    const { setUser, setToken } = useStateContext();

    const onSubmit = (ev) => {
        ev.preventDefault();

        const payload = {
            name_first: nameFirstRef.current.value,
            name_last: nameLastRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        };
        console.log(payload);

        //Fazer requests to the server:
        //...faz um post ao register e enviamos o payload também
        axiosClient
            .post("/signup", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    console.log(response.data.errors);
                }
            });
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
                                            Create Account
                                        </h3>
                                    </div>
                                    <div className="card-body">
                                        <form>
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <div className="form-floating mb-3 mb-md-0">
                                                        <input
                                                            ref={nameFirstRef}
                                                            className="form-control"
                                                            id="inputFirstName"
                                                            type="text"
                                                            placeholder="Enter your first name"
                                                        />
                                                        <label htmlFor="inputFirstName">
                                                            First name
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-floating">
                                                        <input
                                                            ref={nameLastRef}
                                                            className="form-control"
                                                            id="inputLastName"
                                                            type="text"
                                                            placeholder="Enter your last name"
                                                        />
                                                        <label htmlFor="inputLastName">
                                                            Last name
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input
                                                    ref={emailRef}
                                                    className="form-control"
                                                    id="inputEmail"
                                                    type="email"
                                                    placeholder="name@example.com"
                                                />
                                                <label htmlFor="inputEmail">
                                                    Email address
                                                </label>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <div className="form-floating mb-3 mb-md-0">
                                                        <input
                                                            ref={passwordRef}
                                                            className="form-control"
                                                            id="inputPassword"
                                                            type="password"
                                                            placeholder="Create a password"
                                                            autoComplete="false"
                                                        />
                                                        <label htmlFor="inputPassword">
                                                            Password
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-floating mb-3 mb-md-0">
                                                        <input
                                                            ref={
                                                                passwordConfirmationRef
                                                            }
                                                            className="form-control"
                                                            id="inputPasswordConfirm"
                                                            type="password"
                                                            placeholder="Confirm password"
                                                            autoComplete="false"
                                                        />
                                                        <label htmlFor="inputPasswordConfirm">
                                                            Confirm Password
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-4 mb-0">
                                                <div className="d-grid">
                                                    <Link
                                                        to="/"
                                                        className="btn btn-primary btn-block"
                                                        onSubmit={onSubmit}
                                                    >
                                                        Create Account
                                                    </Link>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="card-footer text-center py-3">
                                        <div className="small">
                                            <Link to="/">
                                                Have an account? Go to login
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
