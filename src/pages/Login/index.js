import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Ícones de olho
import "./index.css";
import logo from "./logo.png";

function Log() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Estado para alternar visibilidade da senha
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "rede" && password === "pescados2024@") {
      setError("");
      window.open("/view", "_blank");
      navigate("/operator");
    } else {
      setError("Usuário ou senha incorretos. Tente novamente.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <img src={logo} alt="Logo" className="logo" />
        <h1>LOGIN</h1>
        <div className="input-group">
          <label>Usuário:</label>
          <input
            name="username"
            placeholder="Nome de Usuário ou Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Senha:</label>
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"} // Alterna entre texto e senha
              placeholder="Digite sua Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)} // Alterna o estado da senha
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
        </div>

        {error && <p className="error-message">{error}</p>}

        <div className="buttondiv">
          <button className="login-btn" onClick={handleLogin}>
            Acessar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Log;
