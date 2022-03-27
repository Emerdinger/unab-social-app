import React, {useEffect, useState} from "react";
import "./rightbar.css"
import Friends from "../friends/Friends";
import axios from "axios";

export default function Rightbar({user}) {

    const [friends, setFriends] = useState([]);

    useEffect(() => {
        if (user._id != null){
            const fetchFriends = async () => {
                const res = await axios.get("http://localhost:5000/api/users/amigos/"+user._id);
                setFriends(res.data);
            }
            fetchFriends();
        }
    },[user])

    return (
        <div className="rightbar">
            <div className="position-fixed">
                <div className="amigos">
                    <p className="amigos-title">Amigos</p>
                    {
                        friends?.map((f) =>(
                            <Friends key={f} friend={f} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}