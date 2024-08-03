import axios from "axios";

const baseURL =
    // eslint-disable-next-line no-undef
    process.env.NODE_ENV === "production" ? "https://indigohack-backend-hackuser83.apps.arolab37nonprod.goindigo.in" : "http://localhost:1337/api/v1";

let axiosInstance = axios.create({
    baseURL: baseURL, // Replace with your API base URL
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
