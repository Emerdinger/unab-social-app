import React, {useEffect, useState} from "react";
import "./home.css"
import Navbar from "../../components/navbar/Navbar";
import Feed from "../../components/feed/Feed";
import Leftbar from "../../components/leftbar/Leftbar";
import Rightbar from "../../components/rightbar/Rightbar";
import authService from "../../services/AuthService";
import axios from "axios";

export default function Home() {
    const [user, setUser] = useState(true);
    const [dataUser, setDataUser] = useState({});

    useEffect(() => {
        authService.verificarToken().then(result => setUser(result));
        const headers = {
            "authorization": localStorage.getItem("social-app-token")
        }
        const datosUsuario = async () => {
            const res = await axios.get("http://34.197.106.43:443/api/users/userData", {
                headers: headers
            });
            setDataUser(res.data);
        }
        if (user === true){
            datosUsuario();
        } else {
            window.location.assign("/login")
        }
    },[user])

    return (
        <>
            <Navbar userProfilePicture={dataUser.profilePicture} username={dataUser.username} />
            <div className="homeContainer">
                <div className="left">
                    <Leftbar user={dataUser} />
                </div>
                <Feed userId={dataUser._id} user={dataUser}/>
                <div className="right">
                    <Rightbar user={dataUser} />
                </div>
            </div>
        </>
    )
}