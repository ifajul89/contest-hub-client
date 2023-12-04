import axios from "axios";

const axiosPublic = axios.create({
    baseURL: "b8a12-server-side-bluebird089.vercel.app",
});

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;
