import React from "react";
import { Link } from "react-router-dom";
import axios from "../axios";
import { useAuth } from "../Contexts/AuthContext";

const Register = () => {
    const { setUser } = useAuth();
    const [nameError, setNameError] = React.useState("");
    const [emailError, setEmailError] = React.useState("");
    const [passwordError, setPasswordError] = React.useState("");

    // register user
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, cpassword } = e.target.elements;
        const body = {
            name: name.value,
            email: email.value,
            password: password.value,
            password_confirmation: cpassword.value,
        };
        try {
            const resp = await axios.post("/register", body);
            if (resp.status === 200) {
                setUser(resp.data.user);
                return <Navigate to="/profile" />;
            }
        } catch (error) {
            if (error.response.status === 422) {
                console.log(error.response.data.errors);
                if (error.response.data.errors.name) {
                    setNameError(error.response.data.errors.name[0]);
                } else {
                    setNameError("");
                }
                if (error.response.data.errors.email) {
                    setEmailError(error.response.data.errors.email[0]);
                } else {
                    setEmailError("");
                }
                if (error.response.data.errors.password) {
                    setPasswordError(error.response.data.errors.password[0]);
                } else {
                    setPasswordError("");
                }
            }
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
                                            Create Account
                                        </h3>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={handleSubmit}>
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <div className="form-floating mb-3 mb-md-0">
                                                        <input
                                                            name="name"
                                                            className="form-control"
                                                            id="inputFirstName"
                                                            type="text"
                                                            placeholder="Enter your first name"
                                                        />
                                                        {nameError}
                                                        <label htmlFor="inputFirstName">
                                                            First name
                                                        </label>
                                                    </div>
                                                </div>
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
                                                />
                                                {emailError}
                                                <label htmlFor="inputEmail">
                                                    Email address
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
                                                            name="password"
                                                        />
                                                        {passwordError}
                                                        <label htmlFor="inputPassword">
                                                            Password
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-floating mb-3 mb-md-0">
                                                        <input
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
