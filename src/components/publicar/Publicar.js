import React, {useRef, useState} from "react";
import "./publicar.css"
import axios from "axios";

export default function Publicar({user}) {

    const desc = useRef();
    const [file,setFile] = useState(null);

    const submitHandler = async (e) => {
        e.preventDefault();
        const nuevoPost = {
            userId: user?._id,
            desc: desc.current.value
        }

        if (file) {
            const base64 = await convertBase64(file);
            console.log(base64)
            nuevoPost.img = base64;
        }

        const headers = {
            "authorization": localStorage.getItem("social-app-token")
        }

        try {
            await axios.post("http://localhost:5000/api/posts/", nuevoPost, {
                headers: headers
            });
            window.location.reload();
        } catch (e) {}
    }

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            let lector = new FileReader();
            lector.readAsDataURL(file);
            lector.onload = () => {
                resolve(lector.result)
            }

            lector.onerror = (error) => {
                reject(error)
            }
        })
    }

    return(
        <div className="publicar">
            <div className="title-post">
                <p>Publica algo</p>
            </div>
            <div className="write-post-container">
                <div className="write-post">
                    <img className="profile-post" src={user?.profilePicture} alt=""/>
                    <div className="share-container">
                        <input type="text" placeholder={"En que estas pensando " + user?.username + "?"} className="input-publicar" ref={desc}/>
                    </div>
                </div>
                {file && (
                    <div className="shareImgContainer">
                        <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
                        <i className="far fa-window-close shareCancelImg" onClick={() => setFile(null)}></i>
                    </div>
                )}
                <form onSubmit={submitHandler} className="shareOption">
                    <label htmlFor="file" className="subirOption">
                        <i className="fal fa-image"></i>
                        <span>Foto o vídeo</span>
                        <input
                            style={{ display: "none" }}
                            type="file"
                            id="file"
                            accept=".png,.jpeg,.jpg"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </label>
                    <button type="submit" className="share-button">Publicar</button>
                </form>
            </div>
        </div>
    )
}