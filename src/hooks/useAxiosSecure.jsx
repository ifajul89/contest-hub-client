import axios from "axios";

const axiosSecure = axios.create({
    baseURL: "b8a12-server-side-bluebird089.vercel.app",
});

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;
