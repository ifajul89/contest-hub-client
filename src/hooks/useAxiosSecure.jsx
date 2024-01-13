import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const axiosSecure = axios.create({
    baseURL: "https://b8a12-server-side-bluebird089.vercel.app",
    withCredentials: true,
});

const useAxiosSecure = () => {
    const { logOutUser } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.interceptors.response.use(
            (res) => {
                return res;
            },
            (error) => {
                console.log("error in the interceptor", error.response);
                if (
                    error.response.status === 401 ||
                    error.response.status === 403
                ) {
                    logOutUser().then(() => {
                        Swal.fire({
                            title: "Something Went Wrong",
                            text: "Pease Login",
                            icon: "warning",
                        });
                        navigate("/login");
                    });
                }
            }
        );
    }, [logOutUser, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;
