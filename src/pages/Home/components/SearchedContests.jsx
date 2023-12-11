/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import SingleContest from "./SingleContest";

const SearchedContests = ({ search }) => {
    console.log(search);
    const axiosPublic = useAxiosPublic();
    const { data: searchedContest, isPending } = useQuery({
        queryKey: ["searchedContest", search],
        queryFn: async () => {
            const res = await axiosPublic.get(
                `/searched-contests?search=${search}`
            );
            return res.data;
        },
    });

    if (isPending) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <span className="loading loading-infinity loading-lg"></span>
            </div>
        );
    }

    return (
        <div id="searchResult" className="bg-white pt-5 md:pt-10 px-3 md:mx-0">
            <div className="container mx-auto border-2 border-[#9BD3D0] p-5 md:pb-7 rounded-2xl">
                <div className="flex items-end justify-center gap-5 md:pb-7">
                    <div className="text-center space-y-2 py-3">
                        <h3 className="text-lg md:text-3xl font-bold">
                            Search Result Of :{" "}
                            <span className="border-2 rounded-lg px-2">
                                {search}
                            </span>
                        </h3>
                    </div>
                </div>
                <div className="flex justify-center flex-wrap gap-5 md:gap-10">
                    {searchedContest.length === 0 && (
                        <h3 className="font-normal md:text-xl md:mb-10">
                            <i>Sorry Nothing Was Found</i>
                        </h3>
                    )}
                    {searchedContest.length > 0 &&
                        searchedContest.map((contest) => (
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

export default SearchedContests;
