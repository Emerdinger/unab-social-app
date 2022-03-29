import React, {useEffect, useState} from "react";
import "./login.css"
import authService from "../../services/AuthService";
import axios from "axios";
import {Link} from "react-router-dom";

export default function Login() {
    const [user, setUser] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const URL = "http://34.197.106.43:443/api";

    useEffect(() => {
        authService.verificarToken().then(result => setUser(result));
        if (user) {
            window.location.assign("/inicio")
        }
    },[user])

    const handleSubmit = async (event) => {
        event.preventDefault();
        const body = {
            email,
            password
        }
        await axios.post(URL+"/users/login",body,{}).then(({data}) => {

            if (data.error) {
                setError(data.error)
            } else {
                localStorage.setItem("social-app-token", "Bearer " + data.token);
                window.location.assign("/inicio");
            }
        });
    }
    return (
        <>
            <div className="login">
                <div className="blur">
                    <div className="login-card">
                        <h3>Inicia Sesión</h3>
                        <span>{error}</span>
                        <form onSubmit={handleSubmit} className="login-form">
                            <div className="form-inputs">
                                <input type="email" placeholder="Correo Unab" onChange={(e) => setEmail(e.target.value)}/>
                                <input type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                            <button type="submit">
                                Iniciar sesión
                            </button>
                        </form>
                        <p>¿Aún no tienes una cuenta? <Link to="/registro">Registrate</Link></p>
                        <Link to="/recover">¿Olvidaste tú contraseña?</Link>
                    </div>
                </div>
            </div>
        </>
    )
}