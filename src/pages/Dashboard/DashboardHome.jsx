/* eslint-disable react/no-unescaped-entities */
import { useContext } from "react";
import FullScreenLoading from "../../components/FullScreenLoading";
import useUserRole from "../../hooks/useUserRole";
import { AuthContext } from "../../provider/AuthProvider";
import { NavLink } from "react-router-dom";

const DashboardHome = () => {
    const [userRole, userRoleLoading] = useUserRole();
    const { user } = useContext(AuthContext);

    if (userRoleLoading) {
        return <FullScreenLoading></FullScreenLoading>;
    }

    const adminNavigation = (
        <>
            <NavLink
                className="btn text-lg font-bold bg-[#9BD3D0]"
                to="/dashboard/home"
            >
                Home
            </NavLink>
            <NavLink
                className="btn text-lg font-bold bg-[#9BD3D0]"
                to="/dashboard/manage-user"
            >
                Manage User
            </NavLink>
            <NavLink
                className="btn text-lg font-bold bg-[#9BD3D0]"
                to="/dashboard/manage-contest"
            >
                Manage Contest
            </NavLink>
        </>
    );

    const creatorNavigation = (
        <>
            <NavLink
                className="btn text-lg font-bold bg-[#FBC146]"
                to="/dashboard/home"
            >
                Home
            </NavLink>
            <NavLink
                className="btn text-lg font-bold bg-[#FBC146]"
                to="/dashboard/add-contest"
            >
                Add A Contest
            </NavLink>
            <NavLink
                className="btn text-lg font-bold bg-[#FBC146]"
                to="/dashboard/my-created-contest"
            >
                My Created Contest
            </NavLink>
        </>
    );

    const userNavigation = (
        <>
            <NavLink
                className="btn text-lg font-bold bg-[#E6B8A4]"
                to="/dashboard/home"
            >
                Home
            </NavLink>
            <NavLink
                className="btn text-lg font-bold bg-[#E6B8A4]"
                to="/dashboard/my-participated"
            >
                My Participated
            </NavLink>
            <NavLink
                className="btn text-lg font-bold bg-[#E6B8A4]"
                to="/dashboard/my-winning"
            >
                My Winning
            </NavLink>
            <NavLink
                className="btn text-lg font-bold bg-[#E6B8A4]"
                to="/dashboard/my-profile"
            >
                My Profile
            </NavLink>
        </>
    );

    return (
        <div className="p-5 md:p-20 min-h-[90vh] flex flex-col justify-center items-center  gap-2 md:gap-5">
            <img
                className="w-48 border-8 rounded-full"
                src={user?.photoURL}
                alt="user image"
            />
            <h3 className="text-xl md:text-4xl">
                Hello <span className="font-bold">{user?.displayName},</span>
            </h3>
            <div className="flex gap-5">
                {userRole?.role === "admin" && adminNavigation}
                {userRole?.role === "creator" && creatorNavigation}
                {userRole?.role === "user" && userNavigation}
            </div>
            <p className="text-center text-xl">
                Welcome to our dashboard, your gateway to a seamless and
                intuitive experience! We're thrilled to have you here, ready to
                explore the myriad possibilities our platform offers. Navigate
                effortlessly, discover insights, and make the most of your
                journey with us. Enjoy the ride!
            </p>
        </div>
    );
};

export default DashboardHome;
