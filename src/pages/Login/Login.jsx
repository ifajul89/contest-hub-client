import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const Login = () => {
    const { createUser, updateUser } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        // reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        createUser(data.email, data.password).then((result) => {
            const user = result.user;
            console.log(user);
            updateUser(data.name, data.photoURL)
                .then(() => {
                    const userInfo = {
                        userName: data.name,
                        userEmail: data.email,
                        role: "user",
                    };
                    axiosPublic.post("/users", userInfo).then((res) => {
                        if (res.data.insertedId) {
                            console.log("user added to the database");
                            // reset();
                            Swal.fire({
                                title: "Success",
                                text: "Signed Up Successfully",
                                icon: "success",
                            });
                            navigate("/");
                        }
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    };

    return (
        <div className="flex flex-col lg:flex-row bg-[#FAF3E1]">
            <div className="lg:w-3/5 h-20 lg:h-screen bg-[#9BD3D0] rounded-b-sm lg:rounded-r-md lg:p-10 flex flex-col justify-center items-center lg:items-start gap-5 text-white relative">
                <Link
                    to="/"
                    className="btn btn-sm lg:btn-md lg:rounded-full bg-[#76A19E] hover:bg-[#638785] border-0 lg:text-lg text-white absolute top-6 left-2 lg:top-10 lg:left-10"
                >
                    <IoMdArrowRoundBack />
                    <span className="hidden lg:inline-block">
                        Go Back To Home
                    </span>
                </Link>
                <div className="lg:space-y-5">
                    <h4 className="text-2xl hidden lg:inline-block">
                        Hello User,
                    </h4>
                    <h3 className="text-xl lg:text-7xl font-bold">
                        Please Log In
                    </h3>
                    <p className="text-xl hidden lg:inline-block">
                        Step into the world where ideas flourish, and innovation
                        takes center stage! Your login to ContestHub is your
                        ticket to a realm where creativity meets recognition.
                    </p>
                </div>
                <p className="absolute bottom-10 left-10 right-10 hidden lg:inline-block">
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <b>Pro Tip: </b>Don't forget to check out our "Contest of
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    the Month" for a chance to showcase your talent and win
                    exciting prizes!
                </p>
            </div>
            <div className="lg:w-2/5 p-3 lg:p-10 flex py-10 items-center">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            {...register("email", { required: true })}
                            name="email"
                            placeholder="Type Your Email"
                            className="input input-bordered rounded-full"
                        />
                        {errors.email && (
                            <span className="text-red-500">
                                Email is required
                            </span>
                        )}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            {...register("password", {
                                required: true,
                                minLength: 6,
                                maxLength: 20,
                                pattern:
                                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                            })}
                            name="password"
                            placeholder="Type Your Password"
                            className="input input-bordered rounded-full"
                        />
                        {errors.password?.type === "required" && (
                            <span className="text-red-500">
                                Password is required
                            </span>
                        )}
                        {errors.password?.type === "minLength" && (
                            <span className="text-red-500">
                                Password Must Be 6 Character or Long
                            </span>
                        )}
                        {errors.password?.type === "maxLength" && (
                            <span className="text-red-500">
                                Password Should not have more that 20 Character
                            </span>
                        )}
                        {errors.password?.type === "pattern" && (
                            <span className="text-red-500">
                                Password must have one lower case, one upper
                                case, one number, and one special character
                            </span>
                        )}
                    </div>
                    <div className="form-control mt-6">
                        <input
                            className="btn bg-[#9BD3D0] rounded-full text-white border-0 font-bold"
                            type="submit"
                            value="Log In"
                        />
                    </div>
                    <div className="text-center mt-5">
                        <p>
                            New Here? Please{" "}
                            <Link
                                className="text-[#9BD3D0] duration-300 hover:underline"
                                to="/sign-up"
                            >
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
