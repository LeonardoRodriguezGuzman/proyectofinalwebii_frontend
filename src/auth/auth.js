import axios from "axios";

const endPoint = 'http://localhost:8000/api/login';

const login = async (usuario, password) => {
    try {
        const response = await axios.post(endPoint, {usuario, password});
        localStorage.setItem('token', response.data.token);

        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const isAuthenticated = async () => {
    const token = localStorage.getItem('token');
    return !!token;
};

export { login, isAuthenticated };