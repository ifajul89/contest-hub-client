/* eslint-disable react/no-unescaped-entities */
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import SingleContest from "./SingleContest";
import { HiMiniArrowTrendingDown } from "react-icons/hi2";

const PopularContest = () => {
    const axiosPublic = useAxiosPublic();

    const { data: contests, isPending } = useQuery({
        queryKey: ["contests"],
        queryFn: async () => {
            const res = await axiosPublic.get("/top-contests");
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
        <div className="bg-white">
            <div className="container mx-auto py-5 md:py-10">
                <div className="flex items-end justify-center gap-5 md:pb-7">
                    <div className="text-center space-y-2 py-3">
                        <h3 className="text-lg md:text-3xl font-bold">
                            Our Popular Contests
                        </h3>
                        <p className="text-xs md:text-base">
                            Unleash Your Creativity: Explore, Join, Triumph in
                            the Most Popular Contests on ContestHub's Dynamic
                            Platform
                        </p>
                    </div>
                    <HiMiniArrowTrendingDown className="hidden md:inline-block text-7xl text-gray-500" />
                </div>
                <div className="flex justify-center flex-wrap gap-5 md:gap-10">
                    {contests.map((contest) => (
                        <SingleContest
                            key={contest._id}
                            contest={contest}
                        ></SingleContest>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PopularContest;
