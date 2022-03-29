import React, {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import authService from "../../services/AuthService";
import axios from "axios";

export default function RecoverPassword() {
    const [user, setUser] = useState(false);
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [hideForm, setHideForm] = useState(false);
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const URL = "http://34.197.106.43:443/api";

    useEffect(() => {
        authService.verificarToken().then(result => setUser(result));
        if (user) {
            window.location.assign("/inicio")
        }
    },[user])

    const handleSubmit = async (event) => {
        event.preventDefault();
        await axios.put(URL+`/verifications/recover-password-email?email=${email}`,{},{}).then(({data}) => {

            if (data.error) {
                setError(data.error)
            } else {
                setError(data.message);
                setHideForm(true);
                const codigo = document.querySelector(".code");
                codigo.value = "";
            }
        });
    }

    const changePassword = async (event) => {
        event.preventDefault();
        console.log(code)
        await axios.put(URL+`/verifications/reset-password?email=${email}&code=${code}&password=${password}&confirmPassword=${confirmPassword}`,
            {},{}).then(({data}) => {
            if (data.error) {
                setError(data.error)
            } else {
                setError(data.message);
            }
        })
    }
    return (
        <>
            {
                hideForm == false ?
                <div className="login">
                    <div className="blur">
                        <div className="login-card">
                            <h3>Recuperar contraseña</h3>
                            <span>{error}</span>
                            <form onSubmit={handleSubmit} className="login-form">
                                <div className="form-inputs">
                                    <input type="email" placeholder="Correo Unab" onChange={(e) => setEmail(e.target.value)}/>
                                </div>
                                <button type="submit">
                                    Enviar código
                                </button>
                            </form>
                            <p>¿Aún no tienes una cuenta? <Link to="/registro">Registrate</Link></p>
                            <Link to="/login">¿Ya tienes una cuenta?</Link>
                        </div>
                    </div>
                </div>
                :
                    <div className="login">
                        <div className="blur">
                            <div className="login-card">
                                <h3>Ingrese su código</h3>
                                <span>{error}</span>
                                <form onSubmit={changePassword} className="login-form">
                                    <div className="form-inputs">
                                        <input className="code" type="text" placeholder="Código" onChange={(e) => setCode(e.target.value)} />
                                        <input type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} />
                                        <input type="password" placeholder="Confirmar contraseña" onChange={(e) => setConfirmPassword(e.target.value)} />
                                    </div>
                                    <button type="submit">
                                        Cambiar contraseña
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
            }

        </>
    )
}