import Axios from "axios";

const _axiosInstance = Axios.create({
    baseURL: process.env.REACT_APP_SERVICE_NODE_API_BASE_URL as string || "http://localhost:3001"
});

const _dataMartAxiosInstance = Axios.create({
    baseURL: process.env.REACT_APP_DATA_MART_API_BASE_URL as string || "http://192.168.0.156:3005"
});

export const axiosInstance = _axiosInstance;

export const dataMartAxiosInstance = _dataMartAxiosInstance;
