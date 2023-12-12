import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SingleContest from "../Home/components/SingleContest";
import { useState } from "react";

const AllContest = () => {
    const axiosPublic = useAxiosPublic();
    const [searchTag, setSearchTag] = useState("All");

    const { data: allIndexedContests, isPending } = useQuery({
        queryKey: ["allContests", searchTag],
        queryFn: async () => {
            const res = await axiosPublic.get(`/contests?search=${searchTag}`);
            return res.data;
        },
    });

    const { data: allContests, isPending: allContestLoading } = useQuery({
        queryKey: ["allContest"],
        queryFn: async () => {
            const res = await axiosPublic.get("/contests?search=All");
            return res.data;
        },
    });

    if (isPending) {
        return (
            <div className="w-full h-80 flex justify-center items-center">
                <span className="loading loading-infinity loading-lg"></span>
            </div>
        );
    }

    if (allContestLoading) {
        return (
            <div className="w-full h-80 flex justify-center items-center">
                <span className="loading loading-infinity loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-5">
            <div className="flex flex-wrap md:text-lg justify-center items-center gap-1 md:gap-3 mb-3 md:my-5">
                <h3>Search:</h3>
                <button
                    onClick={() => setSearchTag("All")}
                    className="bg-[#9BD3D0] hover:bg-[#76A19E] rounded-full px-2 md:px-3 md:py-1 text-white"
                >
                    All
                </button>
                {allContests.map((contest) => (
                    <button
                        onClick={() => setSearchTag(contest.contestCategory)}
                        className={`bg-[#9BD3D0] hover:bg-[#76A19E] rounded-full px-2 md:px-3 md:py-1 text-white ${
                            contest.contestCategory === searchTag && "activeSearchTag"
                        }`}
                        key={contest._id}
                    >
                        {contest.contestCategory}
                    </button>
                ))}
            </div>

            <div className="flex justify-center flex-wrap gap-5 md:gap-10">
                {allIndexedContests.map((contest) => (
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
