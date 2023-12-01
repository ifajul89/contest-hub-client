import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import PopularSingleContest from "./PopularSingleContest";

const PopularContest = () => {
    const axiosPublic = useAxiosPublic();

    const { data: contests, isPending } = useQuery({
        queryKey: ["contests"],
        queryFn: async () => {
            const res = await axiosPublic.get("/top-contests");
            return res.data;
        },
    });

    console.log(contests);

    if (isPending) {
        return <span className="loading loading-infinity loading-lg"></span>;
    }

    return (
        <div className="bg-white">
            <div className="container mx-auto">
                <div className="flex justify-center flex-wrap gap-10">
                    {contests.map((contest) => (
                        <PopularSingleContest
                            key={contest.key}
                            contest={contest}
                        ></PopularSingleContest>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PopularContest;
