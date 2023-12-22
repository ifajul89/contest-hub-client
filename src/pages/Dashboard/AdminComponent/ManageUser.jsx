import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaCheck, FaRegTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { useState } from "react";

const ManageUser = () => {
    const axiosSecure = useAxiosSecure();
    const [selectValue, setSelectValue] = useState("");

    const {
        data: users,
        isPending,
        refetch,
    } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
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
                axiosSecure.delete(`/users/${id}`).then((res) => {
                    if (res.data.deletedCount > 0) {
                        refetch();
                    }
                });
            }
        });
    };

    const handleSelectChange = (e) => {
        setSelectValue(e.target.value);
    };

    const handleChangeRole = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you really want to change the role",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Confirm!",
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedUser = {
                    role: selectValue,
                };
                axiosSecure.patch(`/users/${id}`, updatedUser).then((res) => {
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
                <h3>Manage Users</h3>
                <h3>Total Users: {users?.length}</h3>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.map((user) => (
                                <tr key={user._id}>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img
                                                    src={user.userImage}
                                                    alt="User Image"
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p>{user.userName}</p>
                                    </td>
                                    <td>
                                        <p>{user.userEmail}</p>
                                    </td>
                                    <td>
                                        <form
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                handleChangeRole(user._id);
                                            }}
                                            className="flex"
                                        >
                                            <select
                                                onChange={handleSelectChange}
                                                defaultValue={user.role}
                                                className="select select-sm rounded-l-full select-bordered w-24"
                                            >
                                                <option value="admin">
                                                    Admin
                                                </option>
                                                <option value="creator">
                                                    Creator
                                                </option>
                                                <option value="user">
                                                    User
                                                </option>
                                            </select>
                                            <button className="btn btn-sm bg-green-700 hover:bg-green-800 border-none rounded-r-full">
                                                <FaCheck className="text-white"></FaCheck>
                                            </button>
                                        </form>
                                    </td>
                                    <th>
                                        <button
                                            onClick={() =>
                                                handleDeleteItem(user._id)
                                            }
                                            className="btn btn-sm md:btn-md btn-circle bg-red-700 hover:bg-red-800 border-none"
                                        >
                                            <FaRegTrashAlt className="text-white text-base md:text-lg"></FaRegTrashAlt>
                                        </button>
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageUser;
