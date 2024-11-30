import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // Lógica para enviar los datos al backend (si aplica)
    alert("Registro exitoso");
    navigate("/login"); // Redirigir al login después de registrarse
  };

  return (
    <div className="container">
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label htmlFor="usuario" className="form-label">
            Usuario
          </label>
          <input
            type="text"
            id="usuario"
            className="form-control"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="clave" className="form-label">
            Clave
          </label>
          <input
            type="password"
            id="clave"
            className="form-control"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Registrar
        </button>
      </form>
    </div>
  );
};

export default Register;
