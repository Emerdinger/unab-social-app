import React, {useEffect, useState} from "react";
import authService from "../../services/AuthService";
import {Link} from "react-router-dom";
import "./register.css"
import axios from "axios";

export default function Register() {
    const [user, setUser] = useState(false);
    const [error, setError] = useState("");
    const [username, setUsername] = useState("");
    const [nombres, setNombres] = useState("");
    const [correo, setCorreo] = useState("");
    const [telefono, setTelefono] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const URL = "34.197.106.43:443/api";


    useEffect(() => {
        authService.verificarToken().then(result => setUser(result));
        if (user) {
            window.location.assign("/inicio")
        }
    }, [user])

    const handleSubmit = async (event) => {
        event.preventDefault();

        const body = {
            username,
            fullName: nombres,
            email: correo,
            confirmPassword,
            password,
            mobile: telefono,
            birthday: document.querySelector("#birthday").value,
            gender: document.querySelector("#genero").value
        }
        await axios.post(URL+"/users/registro",body,{}).then(({data}) => {
            if (data.code) {
                setError(data.message);
            } else {
                window.location.assign("/login")
            }
        })
    }

    return (
        <>
            <div className="registro">
                <div className="blur">
                    <div className="registro-card">
                        <h3>Registro</h3>
                        <p className="text-info">Solo se puede registrar si cuenta con un correo UNAB.</p>
                        <span>{error}</span>
                        <form onSubmit={handleSubmit} className="registro-form">
                            <div className="form-inputs">
                                <div className="data">
                                    <input type="text" value={username}
                                           onChange={(event) => setUsername(event.target.value)}
                                           placeholder="Nombre de usuario"/>
                                    <input type="text" value={nombres}
                                           onChange={(event) => setNombres(event.target.value)}
                                           placeholder="Nombres y apellidos"/>
                                </div>
                                <div className="data">
                                    <input type="email" value={correo}
                                           onChange={(event) => setCorreo(event.target.value)} placeholder="Correo"/>
                                    <input type="number" value={telefono}
                                           onChange={(event) => setTelefono(event.target.value)}
                                           placeholder="Teléfono"/>
                                </div>
                                <div className="data">
                                    <input type="password" value={password}
                                           onChange={(event) => setPassword(event.target.value)}
                                           placeholder="Contraseña"/>
                                    <input type="password" value={confirmPassword}
                                           onChange={(event) => setConfirmPassword(event.target.value)}
                                           placeholder="Confirmar contraseña"/>
                                </div>
                                <div className="data">
                                    <input id="birthday" type="date"/>
                                    <input id="genero" list="generos" placeholder="Genero"/>
                                    <datalist id="generos">
                                        <option value="Hombre"/>
                                        <option value="Mujer"/>
                                        <option value="Indefinido"/>
                                    </datalist>
                                </div>
                            </div>
                            <button type="submit">
                                Registrarse
                            </button>
                        </form>
                        <p>Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link></p>
                        <Link to="/recuperar-contraseña">¿Olvidaste tú contraseña?</Link>
                    </div>
                </div>
            </div>
        </>
    )
}