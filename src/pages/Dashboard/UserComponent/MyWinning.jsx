/* eslint-disable react/no-unescaped-entities */
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import FullScreenLoading from "../../../components/FullScreenLoading";
import { Link } from "react-router-dom";

const MyWinning = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: myWinnings, isPending } = useQuery({
        queryKey: ["myWinnings"],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/my-winning-contests/${user?.email}`
            );
            return res.data;
        },
    });

    if (isPending) {
        return <FullScreenLoading></FullScreenLoading>;
    }

    return (
        <div className="p-5">
            <div className="flex justify-center text-lg md:text-2xl font-bold gap-5  md:gap-10 pb-10">
                <h3>My Winning Contests</h3>
                <h3>Total Wins: {myWinnings.length}</h3>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        ,
                        <tbody>
                            {myWinnings.map((contest) => (
                                <tr key={contest._id}>
                                    <td>
                                        <div className="w-16">
                                            <img
                                                className="rounded-lg"
                                                src={contest.contestImage}
                                                alt="User Image"
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <p>{contest.contestName}</p>
                                    </td>
                                    <td>
                                        <span className="border-2 border-[#E6B8A4] px-3 py-1 rounded-full">
                                            {contest.contestCategory}
                                        </span>
                                    </td>
                                    <td>
                                        <Link
                                            className="btn rounded-full btn-sm bg-[#E6B8A4] border-0 hover:bg-[#CCA491]"
                                            to={`/contest-details-page/${contest._id}`}
                                        >
                                            See Details
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {myWinnings.length === 0 && (
                        <h3 className="font-bold text-gray-500 md:text-xl italic text-center mt-14">
                            You Haven't Won Any Contest
                        </h3>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyWinning;
