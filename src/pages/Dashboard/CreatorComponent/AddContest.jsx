/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../provider/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddContest = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const [colorCode, setColorCode] = useState("");
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const [selectValue, setSelectValue] = useState("");

    const handleSelectChange = (e) => {
        setSelectValue(e.target.value);
    };

    const onSubmit = (data) => {
        const diceResult = Math.floor(Math.random() * 3) + 1;

        if (diceResult === 1) {
            setColorCode("yellow");
        } else if (diceResult === 2) {
            setColorCode("blue");
        } else {
            setColorCode("pink");
        }

        const futureDate = moment().add(7, "days");

        const newContest = {
            contestName: data.contestName,
            contestImage: data.contestImage,
            contestCategory: selectValue,
            participationFee: 20,
            participantsCount: 0,
            contestStatus: "pending",
            shortDescription: data.shortDescription,
            taskSubmission: data.taskSubmission,
            winnerName: null,
            winnerImage: null,
            contestPrize: data.contestPrize,
            prizeMoney: data.prizeMoney,
            colorCode: colorCode,
            creatorName: user.displayName,
            creatorImage: user.photoURL,
            contestDeadline: futureDate.format("YYYY-MM-DD HH:mm:ss"),
        };

        axiosSecure.post("/contests", newContest).then((res) => {
            if (res.data.insertedId) {
                reset();
                Swal.fire({
                    title: "Success",
                    text: "Contests Added Successfully",
                    icon: "success",
                });
                navigate("/dashboard/home");
            }
        });
    };

    return (
        <div className="p-3 md:p-10">
            <div className="text-center text-gray-900 md:px-10 mb-5 space-y-1 md:space-y-3">
                <h3 className="text-2xl md:text-5xl font-bold">
                    Add A Contest
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600">
                    Unlock a world of creativity and talent by hosting your
                    contest on Contest Hub! <br /> Connect with a diverse
                    community eager to showcase their skills and make your
                    contest a catalyst for innovation and excitement.
                </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Contest Name</span>
                    </label>
                    <input
                        type="text"
                        {...register("contestName", { required: true })}
                        placeholder="Type Your Contest Name"
                        className="input input-bordered rounded-full"
                    />
                    {errors.contestName && (
                        <span className="text-red-500 mt-2">
                            This field can't be empty
                        </span>
                    )}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Contest Image</span>
                    </label>
                    <input
                        type="text"
                        {...register("contestImage", { required: true })}
                        placeholder="Type Your Contest Image URL"
                        className="input input-bordered rounded-full"
                    />
                    {errors.contestImage && (
                        <span className="text-red-500 mt-2">
                            This field can't be empty
                        </span>
                    )}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Contest Description</span>
                    </label>
                    <textarea
                        type="text"
                        {...register("shortDescription", { required: true })}
                        placeholder="Type Your Contest Description"
                        className="textarea textarea-bordered rounded-xl"
                    />
                    {errors.shortDescription && (
                        <span className="text-red-500 mt-2">
                            This field can't be empty
                        </span>
                    )}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Contest Prize</span>
                    </label>
                    <input
                        type="text"
                        {...register("contestPrize", { required: true })}
                        placeholder="Contest Prize"
                        className="input input-bordered rounded-full"
                    />
                    {errors.contestPrize && (
                        <span className="text-red-500 mt-2">
                            This field can't be empty
                        </span>
                    )}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Prize Money</span>
                    </label>
                    <input
                        type="number"
                        {...register("prizeMoney", { required: true })}
                        placeholder="What to do in the Contest"
                        className="input input-bordered rounded-full"
                    />
                    {errors.prizeMoney && (
                        <span className="text-red-500 mt-2">
                            This field can't be empty
                        </span>
                    )}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Task Submission</span>
                    </label>
                    <input
                        type="text"
                        {...register("taskSubmission", { required: true })}
                        placeholder="Task Submission"
                        className="input input-bordered rounded-full"
                    />
                    {errors.taskSubmission && (
                        <span className="text-red-500 mt-2">
                            This field can't be empty
                        </span>
                    )}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">
                            Contest Tag / Category
                        </span>
                    </label>
                    <select
                        onChange={handleSelectChange}
                        className="select select-bordered rounded-full"
                    >
                        <option value="" disabled>
                            Select Contest Tag
                        </option>
                        <option value="Business Contest">
                            Business Contest
                        </option>
                        <option value="Medical Contest">Medical Contest</option>
                        <option value="Article Writing">Article Writing</option>
                        <option value="Gaming">Gaming</option>
                    </select>
                </div>
                <div className="form-control mt-6">
                    <input
                        className="btn bg-[#FBC146] hover:bg-[#dba93d]  rounded-full text-white border-0 font-bold"
                        type="submit"
                        value="Add Your Contest"
                    />
                </div>
            </form>
        </div>
    );
};

export default AddContest;
