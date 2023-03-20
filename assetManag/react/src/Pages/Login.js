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
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
                <main>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-5">
                                <div className="card shadow-lg border-0 rounded-lg mt-5">
                                    <div className="card-header">
                                        <h3 className="text-center font-weight-light my-4">
                                            Login
                                        </h3>
                                    </div>
                                    <div className="card-body">
                                        <form>
                                            <div className="form-floating mb-3">
                                                <input
                                                    className="form-control"
                                                    id="inputEmail"
                                                    type="email"
                                                    placeholder="name@example.com"
                                                />
                                                <label htmlFor="inputEmail">
                                                    Email address
                                                </label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input
                                                    className="form-control"
                                                    id="inputPassword"
                                                    type="password"
                                                    placeholder="Password"
                                                    autoComplete="false"
                                                />
                                                <label htmlFor="inputPassword">
                                                    Password
                                                </label>
                                            </div>
                                            <div className="form-check mb-3">
                                                <input
                                                    className="form-check-input"
                                                    id="inputRememberPassword"
                                                    type="checkbox"
                                                    value=""
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="inputRememberPassword"
                                                >
                                                    Remember Password
                                                </label>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                                <Link
                                                    to="/resetpass"
                                                    className="small"
                                                >
                                                    Forgot Password?
                                                </Link>
                                                <Link
                                                    to="/dashboard"
                                                    className="btn btn-primary"
                                                >
                                                    Login
                                                </Link>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="card-footer text-center py-3">
                                        <div className="small">
                                            <Link to="/signup">
                                                Need an account? Sign up!
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

export default Login;
