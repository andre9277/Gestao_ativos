import React from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "../axios";
import { useAuth } from "../Contexts/AuthContext";

const Login = () => {
    const { setUser, csrfToken } = useAuth();
    const [error, setError] = React.useState(null);

    // login user
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = e.target.elements;
        const body = {
            email: email.value,
            password: password.value,
        };
        await csrfToken();
        try {
            const resp = await axios.post("/login", body);
            if (resp.status === 200) {
                setUser(resp.data.user);
                return <Navigate to="/profile" />;
            }
        } catch (error) {
            if (error.response.status === 401) {
                setError(error.response.data.message);
            }
        }
    };
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
                                    <div>{error}</div>
                                    <div className="card-body">
                                        <form onSubmit={handleSubmit}>
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
