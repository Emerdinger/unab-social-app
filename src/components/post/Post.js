import React, {useEffect, useRef, useState} from "react";
import "./post.css";
import {format} from "timeago.js";
import axios from "axios";

export default function Post({post, currentUser}) {

    const [user, setUser] = useState({})
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const desc = useRef();

    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id));
    }, [currentUser._id, post.likes]);

    useEffect(() => {
        if (isLiked === true) {
            const likeIcon = document.querySelector(`#P${post._id}`);
            likeIcon.classList.add("liked");
        }
    },[isLiked])

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`http://localhost:5000/api/users?userId=${post.userId}`)
            setUser(res.data);
        }
        fetchUser();
    }, [post.userId]);

    const handleEdit = async () => {
        const descripcion = document.querySelector(`#D${post._id}`);
        const editar = document.querySelector(`#E${post._id}`);
        const inputEdit = document.querySelector(`#I${post._id}`);
        if (editar.classList.contains("hide-edit")) {
            descripcion.classList.add("hide-edit");
            editar.classList.remove("hide-edit");
            inputEdit.value = post.desc;
        } else {
            descripcion.classList.remove("hide-edit");
            editar.classList.add("hide-edit");
            inputEdit.value = "";
        }

    }

    const handleDelete = async () => {
        const headers = {
            "authorization": localStorage.getItem("social-app-token")
        }
        await axios.delete("http://localhost:5000/api/posts/"+ post._id, {
            headers: headers
        });
        window.location.reload();
    }

    const likeHandler = () => {
        try {
            const headers = {
                "authorization": localStorage.getItem("social-app-token")
            }
            axios.put("http://localhost:5000/api/posts/" + post._id + "/like",{}, {
                headers: headers
            })
            setLike(isLiked ? like -1 : like + 1);
            setIsLiked(!isLiked);
        } catch (e) {}

        const likeIcon = document.querySelector(`#P${post._id}`);

        if (likeIcon.classList.contains("liked")) {
            likeIcon.classList.remove("liked");
        } else {
            likeIcon.classList.add("liked");
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const headers = {
                "authorization": localStorage.getItem("social-app-token")
            }
            axios.put("http://localhost:5000/api/posts/" + post._id,{
                desc: desc.current.value
            }, {
                headers: headers
            })
            window.location.reload();
        } catch (e) {}
    }

    return (
        <div className="post">
            <div className="post-info">
                <img src={user.profilePicture} alt=""/>
                <div className="user-date">
                    <p>{user.username}</p>
                    <span>{format(post.createdAt)}</span>
                </div>
                {
                    user._id === currentUser._id ? <div className="dropdown-container">
                        <i className="fas fa-ellipsis-h"></i>

                        <ul>
                            <li onClick={handleEdit}><i className="far fa-edit"></i> Editar</li>
                            <li onClick={handleDelete}><i className="far fa-trash-alt"> Eliminar</i></li>
                        </ul>
                    </div> : ""
                }
            </div>
            <div className="post-desc">
                <span id={"D"+post._id}>{post.desc}</span>
                <div id={"E"+post._id} className="editar-post hide-edit">
                    <form className="form-edit-post" onSubmit={handleSubmit}>
                        <textarea id={"I"+post._id} type="text" className="input-publicar" ref={desc}/>
                        <button>Editar</button>
                    </form>
                </div>
                <img className="postImg" src={post.img} alt="" />
            </div>
            <hr/>
            <div className="post-likes">
                <div className="comments">
                    <i className="fal fa-comment"></i> Comentarios
                </div>
                <div className="likes">
                    <i id={"P"+post._id} className="far fa-thumbs-up" onClick={likeHandler}></i> {like} Me gusta
                </div>
            </div>
        </div>
    )
}