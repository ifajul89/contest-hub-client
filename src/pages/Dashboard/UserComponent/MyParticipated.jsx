/* eslint-disable react/no-unescaped-entities */
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import moment from "moment";
import { Link } from "react-router-dom";

const MyParticipated = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    const { data: myParticipated, isPending } = useQuery({
        queryKey: ["myCreatedContest"],
        enabled: !!user,
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/registered-contests/${user.email}`
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

    const currentDate = moment();

    return (
        <div className="p-5">
            <div className="flex justify-center text-2xl gap-10 pb-10">
                <h3>My Created Contests</h3>
                <h3>Total Contests: {myParticipated.length}</h3>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Deadline</th>
                                <th>Submission</th>
                            </tr>
                        </thead>
                        ,
                        <tbody>
                            {myParticipated.map((contest) => (
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
                                        {currentDate <
                                        moment(contest.contestDeadline) ? (
                                            <>
                                                <div>
                                                    Date:{" "}
                                                    {moment(
                                                        contest.contestDeadline
                                                    ).format("YYYY-MM-DD")}
                                                </div>
                                                <div>
                                                    Time:{" "}
                                                    {moment(
                                                        contest.contestDeadline
                                                    ).format("HH:mm:ss")}
                                                </div>
                                            </>
                                        ) : (
                                            <p>Times Up</p>
                                        )}
                                    </td>
                                    <td>
                                        {currentDate <
                                        moment(contest.contestDeadline) ? (
                                            <>
                                                <Link
                                                    to={`/contest-details-page/${contest.contestId}`}
                                                    className="btn bg-[#FBC146] hover:bg-[#dba93d] border-none rounded-full btn-sm"
                                                >
                                                    Register Again
                                                </Link>
                                            </>
                                        ) : (
                                            <button
                                                disabled
                                                className="btn bg-[#FBC146] hover:bg-[#dba93d] border-none rounded-full btn-sm"
                                            >
                                                Register Again
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {myParticipated.length === 0 && (
                        <h3 className="font-bold text-gray-500 md:text-xl italic text-center mt-14">
                            Haven't Perticipated Yet
                        </h3>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyParticipated;
