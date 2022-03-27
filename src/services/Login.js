import axios from "axios";

const URL = "34.197.106.43:443/api/users/login";

const login = async credentials => {
    const {data} = await axios.post(URL, credentials);
    return data;
}

export default login;