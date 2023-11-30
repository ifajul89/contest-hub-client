import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const PopularContest = () => {
    const axiosPublic = useAxiosPublic();

    const { data: contest } = useQuery({
        queryKey: ["contests"],
        queryFn: async () => {
            const res = await axiosPublic.get("/contests");
            return res.data;
        },
    });

    console.log(contest);

    return (
        <div className="container mx-auto bg-white">
            Popular contest:{contest.length}
            <div></div>
        </div>
    );
};

export default PopularContest;
