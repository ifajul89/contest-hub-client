import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";

const MyCreatedContests = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useContext(AuthContext);

    const {data: myCreatedContest } = useQuery({
        queryKey: ["myCreatedContest"],
        queryFn: async() =>{
            const res = axiosSecure.get(`/my-created-contests?creator=${user.email}`);
            return res.data;
        }
    })

    return (
        <div>

        </div>
    );
};

export default MyCreatedContests;