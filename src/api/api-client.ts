import Axios from "axios";

export const axiosInstance = Axios.create({
    baseURL: process.env.REACT_APP_SERVICE_NODE_API_BASE_URL as string
});

