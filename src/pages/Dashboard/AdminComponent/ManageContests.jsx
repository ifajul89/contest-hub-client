import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaCheckDouble } from "react-icons/fa6";
import Swal from "sweetalert2";

const ManageContests = () => {
    const axiosSecure = useAxiosSecure();

    const {
        data: contests,
        isPending,
        refetch,
    } = useQuery({
        queryKey: ["contests"],
        queryFn: async () => {
            const res = await axiosSecure.get("/contests");
            return res.data;
        },
    });

    if (isPending) {
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <span className="loading loading-infinity loading-lg"></span>
            </div>
        );
    }

    const handleDeleteItem = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/contests/${id}`).then((res) => {
                    if (res.data.deletedCount > 0) {
                        refetch();
                    }
                });
            }
        });
    };

    return (
        <div className="p-5">
            <div className="flex justify-center text-2xl gap-10 pb-10">
                <h3>Manage Users</h3>
                <h3>Total Users: {contests?.length}</h3>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Delete</th>
                                <th>Confirm</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contests.map((contest) => (
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
                                        <button
                                            onClick={() =>
                                                handleDeleteItem(contest._id)
                                            }
                                            className="btn btn-ghost"
                                        >
                                            <FaRegTrashAlt className="text-lg text-red-600"></FaRegTrashAlt>
                                        </button>
                                    </td>
                                    <td>
                                        {contest.contestStatus === "pending" ? (
                                            <button className="btn btn-ghost">
                                                <FaCheck className="text-lg text-green-600"></FaCheck>
                                            </button>
                                        ) : (
                                            <button className="btn btn-ghost">
                                                <FaCheckDouble className="text-lg text-green-600"></FaCheckDouble>
                                            </button>
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

export default ManageContests;
