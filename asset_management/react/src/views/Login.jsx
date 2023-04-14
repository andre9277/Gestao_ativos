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
import logo_hb from "../assets/logo_hb.jpg";

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
    <div id="layoutAuthentication">
      <div id="layoutAuthentication_content">
        <main className="mn-lg">
          <div className="container">
            <div className="row justify-content-center login-p">
              <img src={logo_hb} alt="HB logo" className="ig-login" />
              <div className="col-lg-5">
                <div className="card shadow-lg border-0 rounded-lg mt-5 login-pp">
                  <div className="card-header">
                    <h3 className="text-center my-4">Login</h3>
                  </div>

                  <div className="form">
                    <form onSubmit={onSubmit}>
                      {message && (
                        <div className="alert">
                          <p>{message}</p>
                        </div>
                      )}
                      <label htmlFor="inputEmail">Endereço de email</label>
                      <div className="form-floating mb-1">
                        <input
                          ref={emailRef}
                          className="form-control"
                          id="inputEmail"
                          type="email"
                          placeholder="name@example.com"
                        />
                      </div>
                      <label htmlFor="inputPassword">Password</label>
                      <div className="form-floating mb-1">
                        <input
                          ref={passwordRef}
                          className="form-control"
                          id="inputPassword"
                          type="password"
                          placeholder="Password"
                          autoComplete="false"
                        />
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
                        <Link to="/forgotpass" className="small">
                          Forgot Password?
                        </Link>
                        <button className="btn btn-block">Login</button>
                        <Link to="/signup">Signup </Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
