/* eslint-disable react/no-unescaped-entities */
import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import FullScreenLoading from "../../../components/FullScreenLoading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyProfile = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: myParticipated, isPending: isMyParticipatedLoading } =
        useQuery({
            queryKey: ["myParticipated"],
            enabled: !!user,
            queryFn: async () => {
                const res = await axiosSecure.get(
                    `/registered-contests/${user.email}?data=all}`
                );
                return res.data;
            },
        });

    const { data: myWinnings, isPending: isMyWinningsLoading } = useQuery({
        queryKey: ["myWinnings"],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/my-winning-contests/${user?.email}`
            );
            return res.data;
        },
    });

    if (isMyParticipatedLoading || isMyWinningsLoading) {
        return <FullScreenLoading></FullScreenLoading>;
    }

    const winPercentage = (myWinnings.length / myParticipated.length) * 100;

    return (
        <div className="p-10">
            <div className="flex w-full items-center gap-5">
                <div className="w-1/6 bg-[#E6B8A4] p-3 rounded-2xl border border-gray-900">
                    <img
                        className="border border-gray-900 rounded-xl w-full"
                        src={user.photoURL}
                        alt=""
                    />
                </div>
                <div className="space-y-2">
                    <h3 className="font-extrabold text-4xl">
                        {user.displayName}
                    </h3>
                    <h3 className="text-gray-500">ID: {user.uid}</h3>
                    <h3 className="text-xl">Email: {user.email}</h3>
                    <h3>Last Sign In: {user.metadata.lastSignInTime}</h3>
                </div>
            </div>
            <div className="divider"></div>
            <div className="flex flex-col md:flex-row gap-10">
                <div className="md:w-1/2 text-lg space-y-5">
                    <p>
                        Hey{" "}
                        <span className="text-[#E6B8A4] font-extrabold">
                            {user.displayName}
                        </span>
                        ,
                    </p>
                    <p>
                        {" "}
                        Welcome to the ContestHub crew! We've noticed you've
                        rocked{" "}
                        <span className="text-[#E6B8A4] font-extrabold">
                            {myParticipated?.length}
                        </span>{" "}
                        contests with us – major kudos! You're not just a
                        contestant; you're a contender, a champ in the making.
                        And guess what? We've got wind of your victories –
                        you've won{" "}
                        <span className="text-[#E6B8A4] font-extrabold">
                            {myWinnings?.length}
                        </span>{" "}
                        contests!
                    </p>
                    <p>
                        But hey, the fun doesn't stop there. More contests mean
                        more fun, more skills unlocked, and more chances to
                        crush it. Let's turn up the heat! Keep your eyes peeled
                        for exclusive perks and surprises – we've got some sweet
                        rewards for our go-getters, and you're on that list!
                    </p>
                </div>
                <div className="flex flex-col gap-5 text-xl font-bold justify-center items-center md:w-1/2">
                    <div className="flex gap-10">
                        <h3>My Participation: {myParticipated?.length}</h3>
                        <h3>My Winning: {myWinnings?.length}</h3>
                    </div>
                    <div className="bg-gray-200 rounded-full">
                        <div
                            className="radial-progress"
                            style={{
                                "--value": `${winPercentage}`,
                                "--size": "20rem",
                                "--thickness": "2rem",
                            }}
                            role="progressbar"
                        >
                            Win Percentage: {winPercentage}%
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
