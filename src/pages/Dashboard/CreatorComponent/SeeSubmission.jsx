import { useLoaderData } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

const SeeSubmission = () => {
    const registerDetails = useLoaderData();
    const [{ contestId }] = registerDetails;
    const axiosSecure = useAxiosSecure();

    const {
        data: contestDetails,
        refetch,
        isPending,
    } = useQuery({
        queryKey: ["contestDetails"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/contests/${contestId}`);
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

    console.log("Contest Details", contestDetails);
    console.log("Winner Email", contestDetails.winnerEmail);

    const handleMakeWinner = (id, name, email, image) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make Winner!",
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedContest = {
                    winnerName: name,
                    winnerEmail: email,
                    winnerImage: image,
                };
                axiosSecure
                    .patch(`/my-created-contests/${id}`, updatedContest)
                    .then((res) => {
                        console.log(res.data);
                        if (res.data.modifiedCount > 0) {
                            refetch();
                        }
                    });
            }
        });
    };

    return (
        <div className="p-5">
            <div className="flex justify-center text-2xl gap-10 pb-10">
                <h3>Contest Submission</h3>
                <h3>Total Contestant: {registerDetails.length}</h3>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Make Winner</th>
                            </tr>
                        </thead>
                        <tbody>
                            {registerDetails.map((registerDetail) => (
                                <tr key={registerDetail._id}>
                                    <td>
                                        <div className="avatar">
                                            <div className="w-16 mask mask-squircle">
                                                <img
                                                    className="rounded-lg"
                                                    src={
                                                        registerDetail.registerImage
                                                    }
                                                    alt="User Image"
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p>{registerDetail.registerName}</p>
                                    </td>
                                    <td>
                                        <p>{registerDetail.registerEmail}</p>
                                    </td>
                                    <td>
                                        {contestDetails.winnerName === null &&
                                        contestDetails.winnerImage === null ? (
                                            <button
                                                onClick={() =>
                                                    handleMakeWinner(
                                                        registerDetail.contestId,
                                                        registerDetail.registerName,
                                                        registerDetail.registerEmail,
                                                        registerDetail.registerImage
                                                    )
                                                }
                                                className="btn text-white bg-green-700 hover:bg-green-800 border-none"
                                            >
                                                Declare Winner
                                            </button>
                                        ) : (
                                            <>
                                                {registerDetail.registerEmail ===
                                                contestDetails.winnerEmail ? (
                                                    <p className="text-green-700 font-bold">
                                                        Winner
                                                    </p>
                                                ) : (
                                                    <button
                                                        disabled
                                                        className="btn text-white bg-green-700 hover:bg-green-800 border-none"
                                                    >
                                                        Declare Winner
                                                    </button>
                                                )}
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {registerDetails.length === 0 && (
                        <h3 className="font-bold text-gray-600 text-xl text-center italic my-10">
                            No Registration Yet
                        </h3>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SeeSubmission;
