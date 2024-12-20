import React,{ useState ,useEffect } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";

import { useNavigate } from "react-router-dom";
    
    const Login = () => {
      const [usuario, setUsuario] = useState("");
      const [clave, setClave] = useState("");
      const navigate = useNavigate();
    
      const handleLogin = (e) => {
        e.preventDefault();
        // Aquí podrías hacer una petición a tu backend para autenticar al usuario
        if (usuario === "admin" && clave === "password") {
          alert("Login exitoso");
          navigate("/crud1"); // Redirige a la primera sección de CRUD
        } else {
          alert("Credenciales incorrectas");
        }
      };
    return (
      <>
        <div className="container">
            <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                            <div className="d-flex justify-content-center py-4">

                            </div>
                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className="pt-4 pb-2">
                                        <h1 className="card-title text-center pb-0 fs-4">Acceso a la cuenta</h1>
                                        <p className="text-center small">Escribe el nombre usuario y la clave para ingresar</p>
                                    </div>
                                    <form className="row g-3 needs-validation" method="post" id="LoginForm" action="">
                                        <div className="col-12">
                                            <label htmlFor="usuario">
                                                Usuario:
                                            </label>
                                            <div className="input-group has-validation">
                                                <input type="text" name="usuario" className="form-control" id="usuario"
                                                       required/>
                                                <div className="invalid-feedback">Escribe tu Usuario</div>
                                            </div>
                                        </div>
                                            <div className="col-12">
                                                <label htmlFor="clave">
                                                    Clave:
                                                </label>
                                                <div className="input-group has-validation">
                                                    <input type="password" name="clave" className="form-control"
                                                           id="clave"
                                                           required/>
                                                    <div className="invalid-feedback">Escribe tu Clave</div>
                                                </div>
                                            </div>
                                        <div className="col-12">
                                            <input className="btn btn-primary w-100" type="submit" value="Entrar" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
      </>
    );
}

export default Login;