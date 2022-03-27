import React from "react";
import "./leftbar.css"

export default function Leftbar({user}) {
    return (
        <div className="leftbar">
            <div className="position-fixed">
                <div className="user-card">
                    <img src={user.profilePicture} alt=""/>
                    <div className="info">
                        <span className="username">{user.username}</span>
                        <span className="email">{user.email}</span>
                    </div>
                </div>
                <div className="options-bar">
                    <div className="option">
                        <i className="fas fa-th"></i>
                        <span>Inicio</span>
                    </div>
                    <div className="option">
                        <i className="fas fa-users"></i>
                        <span>Amigos</span>
                    </div>
                    <div className="option">
                        <i className="fas fa-image"></i>
                        <span>Fotos</span>
                    </div>
                    <div className="option">
                        <i className="fas fa-users-class"></i>
                        <span>Grupos</span>
                    </div>
                </div>
            </div>
        </div>
    )
}