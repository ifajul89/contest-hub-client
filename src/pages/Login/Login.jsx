import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

const Login = () => {
    const { googleLogIn } = useContext(AuthContext);

    const handleGoogleLogin = () => {
        googleLogIn().then((res) => {
            const user = res.user;
            console.log(user);
        });
    };

    return (
        <div className="flex bg-[#FAF3E1]">
            <div className="w-3/5 h-screen bg-[#9BD3D0] rounded-r-md p-10 flex flex-col justify-center gap-5 text-white relative">
                <Link
                    to="/"
                    className="btn rounded-full bg-[#76A19E] border-0 text-lg text-white hover:bg-[#638785] absolute top-10 left-10"
                >
                    <IoMdArrowRoundBack />
                    Go Back To Home
                </Link>
                <div className="space-y-5">
                        <h4 className="text-2xl">Hello User,</h4>
                        <h3 className="text-7xl font-bold">Please Log In!</h3>
                    <p className="text-xl">
                        Step into the world where ideas flourish, and innovation
                        takes center stage! Your login to ContestHub is your
                        ticket to a realm where creativity meets recognition.
                    </p>
                </div>
                <p className="absolute bottom-10 left-10 right-10">
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <b>Pro Tip: </b>Don't forget to check out our "Contest of
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    the Month" for a chance to showcase your talent and win
                    exciting prizes!
                </p>
            </div>
            <div className="w-2/5">
                <button onClick={handleGoogleLogin} className="btn">
                    Login With Google
                </button>
            </div>
        </div>
    );
};

export default Login;
