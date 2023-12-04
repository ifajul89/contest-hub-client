import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SingleContest from "../Home/components/SingleContest";

const AllContest = () => {
    const axiosPublic = useAxiosPublic();

    const { data: allContests, isPending } = useQuery({
        queryKey: ["allContests"],
        queryFn: async () => {
            const res = await axiosPublic.get("/contests");
            return res.data;
        },
    });

    if (isPending) {
        return (
            <div className="w-full h-20 flex justify-center items-center">
                <span className="loading loading-infinity loading-lg"></span>
            </div>
        );
    }
    return (
        <div className="container mx-auto py-5">
            <div className="flex justify-center flex-wrap gap-5 md:gap-10">
                {allContests.map((contest) => (
                    <SingleContest
                        key={contest._id}
                        contest={contest}
                    ></SingleContest>
                ))}
            </div>
        </div>
    );
};

export default AllContest;
