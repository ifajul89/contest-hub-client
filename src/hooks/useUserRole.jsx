import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const useUserRole = () => {
    const axiosSecure = useAxiosSecure();
    const { user, loading } = useContext(AuthContext);

    const { data: userRole, isPending: userRoleLoading } = useQuery({
        queryKey: ["userRole"],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            return res.data;
        },
    });

    
    return [userRole, userRoleLoading];
};

export default useUserRole;
