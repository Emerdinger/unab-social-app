import React from "react";
import "./friends.css"

export default function Friends({friend}) {

    return (
        <div className="friend-card">
            <img src={friend.profilePicture} alt=""/>
            <span>{friend.username}</span>
        </div>
    )
}