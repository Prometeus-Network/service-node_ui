import Axios from "axios";

const _axiosInstance = Axios.create({
    baseURL: process.env.REACT_APP_SERVICE_NODE_API_BASE_URL || "http://localhost:3001"
});

export const axiosInstance = _axiosInstance;
