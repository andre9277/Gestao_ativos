import React, { useState } from "react";
import axiosClient from "../axios-client.js";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosClient.post("/api/forgot-password", { email });
      setMessage("Verifique o seu email");
    } catch (error) {
      setMessage("Erro!");
    }
  };

  return (
    <div>
      <h2>Esqueceu-se da password?</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Insira o seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default ForgotPassword;
