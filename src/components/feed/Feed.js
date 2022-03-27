import React, {useEffect, useState} from "react";
import axios from "axios";
import Publicar from "../publicar/Publicar";
import Post from "../post/Post";
import "./feed.css"

export default function Feed({username, userId, user}) {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            if (username != null){
                console.log("j")
                const res = await axios.get("http://localhost:5000/api/posts/perfil/" + username)
                setPosts(
                    res.data.sort((p1,p2) => {
                        return new Date(p2.createdAt) - new Date(p1.createdAt);
                    })
                )
            } else {
                if (userId != null) {
                    const res = await axios.get("http://localhost:5000/api/posts/timeline/" + userId);
                    setPosts(
                        res.data.sort((p1, p2) => {
                            return new Date(p2.createdAt) - new Date(p1.createdAt);
                        })
                    )
                }
            }
        };
        fetchPosts();
    },[username, userId])

    return (
        <div className="feed">
            <div className="feedWrapper">
                {(!username || username === user.username) && <Publicar user={user} />}
                {posts.map((p) => (
                    <Post key={p._id} post={p} currentUser={user}/>
                ))}
            </div>
        </div>
    )
}