import Axios from "axios";

export const axiosInstance = Axios.create({
    baseURL: process.env.REACT_APP_SERVICE_NODE_API_BASE_URL as string || "http://192.168.0.156:3002"
});

