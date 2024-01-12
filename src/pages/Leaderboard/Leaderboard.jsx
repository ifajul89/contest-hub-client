import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import FullScreenLoading from "../../components/FullScreenLoading";

const Leaderboard = () => {
    const axiosPublic = useAxiosPublic();

    const { data: leaderboard, isPending: isLeaderboardPending } = useQuery({
        queryKey: ["leaderboard"],
        queryFn: async () => {
            const res = await axiosPublic.get("/leaderboard");
            return res.data;
        },
    });

    if (isLeaderboardPending) {
        <FullScreenLoading></FullScreenLoading>;
    }

    return (
        <div className="container mx-auto p-3 md:p-10 min-h-[80vh] ">
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="text-center">
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Win Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboard?.map((user) => (
                            <tr className="text-center" key={user._id}>
                                <td className="flex justify-center">
                                    <img
                                        className="w-16 rounded-xl"
                                        src={user.userImage}
                                        alt=""
                                    />
                                </td>
                                <td>
                                    <p>{user.userName}</p>
                                </td>
                                <td>
                                    <p>{user.userEmail}</p>
                                </td>
                                <td>
                                    <p>{user.winCount}</p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Leaderboard;
