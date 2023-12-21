import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import { Link } from "react-router-dom";

const MyCreatedContests = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    const { data: myCreatedContest, isPending } = useQuery({
        queryKey: ["myCreatedContest"],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/my-created-contests?creator=${user.email}`
            );
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

    return (
        <div className="p-5">
            <div className="flex justify-center text-2xl gap-10 pb-10">
                <h3>My Created Contests</h3>
                <h3>Total Contests: {myCreatedContest.length}</h3>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Submission</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myCreatedContest.map((contest) => (
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
                                        {contest.contestStatus === "pending" ? (
                                            <p className="font-bold text-gray-600">
                                                Pending
                                            </p>
                                        ) : (
                                            <p className="font-bold text-green-700">
                                                Confirmed
                                            </p>
                                        )}
                                    </td>
                                    <td>
                                        {contest.participantsCount === 0 ? (
                                            <p className="font-bold text-gray-600">
                                                No Submission Yet
                                            </p>
                                        ) : (
                                            <Link
                                                to={`/dashboard/my-created-contest/${contest._id}`}
                                                className="btn bg-[#FBC146] hover:bg-[#dba93d] border-none"
                                            >
                                                See Submission
                                            </Link>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyCreatedContests;
