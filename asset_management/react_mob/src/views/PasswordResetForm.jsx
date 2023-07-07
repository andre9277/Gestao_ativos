import React, { useState } from "react";
import axiosClient from "../axios-client.js";
import { useParams } from "react-router-dom";
/* import "../styles/styles.css";
 */
const PasswordResetForm = () => {
  const { token } = useParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await axiosClient.post("/reset-password", {
        email,
        password,
        password_confirmation: confirmPassword,
        token,
      });

      if (response.data.message) {
        setMessage(response.data.message);
      }
      // Handle additional logic based on the response
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div id="layoutAuthentication">
      <div id="layoutAuthentication_content">
        <main>
          <div className="container">
            <div className="justify-content-center">
              <div className="col-lg-5">
                <div className="card shadow-lg border-0 rounded-lg mt-5">
                  <div className="card-header">
                    <h3 className="text-center font-weight-light my-4">
                      Recuperação da Password
                    </h3>
                  </div>
                  <div className="card-body">
                    <form
                      onSubmit={handleSubmit}
                      className="password-reset-form"
                    >
                      <div className="form-group-reset">
                        <label htmlFor="email" className="form-label">
                          Email:
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="inp-res-pass-rec"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>

                      <div className="form-group-reset">
                        <label htmlFor="password" className="form-label">
                          Nova password:
                        </label>
                        <input
                          type="password"
                          id="password"
                          className="inp-res-pass-rec"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>

                      <div className="form-group-reset">
                        <label htmlFor="confirmPassword" className="form-label">
                          Confirmação nova password:
                        </label>
                        <input
                          type="password"
                          id="confirmPassword"
                          className="inp-res-pass-rec"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                      </div>

                      <button type="submit" className="btn-rec-pass">
                        Recuperar Password
                      </button>

                      {message && <p>{message}</p>}
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
};

export default PasswordResetForm;
