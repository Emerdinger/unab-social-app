import React from "react";
import "./navbar.css"
import authService from "../../services/AuthService";

export default function Navbar({userProfilePicture, username}) {

    const hideMenu = (e) => {
        e.preventDefault();
        const hidebar = document.querySelector(".hidebar");
        if (hidebar.classList.contains('hide')) {
            hidebar.classList.remove('hide');
        } else {
            hidebar.classList.add('hide');
        }
    }

    const cerrarSesion = () => {
        authService.logOut();
        window.location.assign("/login");
    }

    return (
        <>
            <div className="navbar">
                <div className="navbar-brand">
                    <img src="https://images.vexels.com/media/users/3/137692/isolated/preview/e425fa1fe274a2267405829771f13a13-logotipo-simple-poligonal-geometrico.png" alt=""/>
                    <span>Social</span>
                </div>
                <div className="navbar-search">
                    <input type="text" placeholder="Buscar amigos"/>
                    <i className="fas fa-search"></i>
                </div>
                <div className="navbar-list">
                    <div className="navbar-right">
                        <ul>
                            <li className="nav-hover">
                                <i className="far fa-home"></i>
                            </li>
                            <li>
                                <i className="far fa-envelope"></i>
                            </li>
                            <li className="userProfile" onClick={hideMenu}>
                                <img src={userProfilePicture} alt=""/>
                                <span>{username}</span>
                            </li>
                            <li onClick={hideMenu}><i className="fas fa-bars bars-hide"></i></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="hidebar hide">
                <ul>
                    <li><i className="far fa-user-alt"></i> Mi perfil</li>
                    <li><i className="far fa-cog"></i> Configuración</li>
                    <li onClick={cerrarSesion}><i className="far fa-sign-out-alt"></i> Cerrar sesión</li>
                </ul>
            </div>
            <div className="navbar-mobile">
                <i className="fas fa-th"></i>
                <i className="fas fa-users"></i>
                <i className="fas fa-image"></i>
                <i className="fas fa-users-class"></i>
            </div>
        </>
    )
}