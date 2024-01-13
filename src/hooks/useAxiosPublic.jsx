import axios from "axios";

const axiosPublic = axios.create({
    baseURL: "https://b8a12-server-side-bluebird089.vercel.app",
    withCredentials: true,
});

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;
