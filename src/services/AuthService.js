import axios from "axios";

const URL = "http://34.197.106.43:443/api";

const loggedIn = () => {
    return !!localStorage.getItem("social-app-token");
}

const logOut = () => {
    localStorage.removeItem("social-app-token");
}

const verificarToken = async () => {
    const headers = {
        "authorization": localStorage.getItem("social-app-token")
    }

    try {
        const { data } = await axios.get(URL+"/users/verificar",{
            headers: headers
        });
        return data;
    } catch (e) {
        return false;
    }
}

const authService = {
    loggedIn,
    logOut,
    verificarToken
}

export default authService;