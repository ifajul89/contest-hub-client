import { CgMenuMotion } from "react-icons/cg";
import { Link, NavLink, Outlet } from "react-router-dom";
import useUserRole from "../../hooks/useUserRole";
import { IoMdArrowRoundBack } from "react-icons/io";

const Dashboard = () => {
    const [userRole, userRoleLoading] = useUserRole();

    if (userRoleLoading) {
        return (
            <div className="w-full h-20 flex justify-center items-center">
                <span className="loading loading-infinity loading-lg"></span>
            </div>
        );
    }

    const navItems = (
        <>
            <Link
                className="btn btn-circle btn-sm text-lg text-white border-none bg-black bg-opacity-30 hover:bg-black hover:bg-opacity-40"
                to="/"
            >
                <IoMdArrowRoundBack />
            </Link>
            {userRole.role === "admin" && (
                <>
                    <h3 className="font-bold text-2xl py-3 px-1">
                        Admin Penal
                    </h3>
                    <li>
                        <NavLink to="/dashboard/home">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/manage-user">
                            Manage User
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/manage-contest">
                            Manage Contest
                        </NavLink>
                    </li>
                </>
            )}
            {userRole.role === "creator" && (
                <>
                    <h3 className="font-bold text-2xl py-2 px-1">
                        Creator Penal
                    </h3>
                    <li>
                        <NavLink to="/dashboard/home">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/add-contest">
                            Add A Contest
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/my-created-contest">
                            My Created Contest
                        </NavLink>
                    </li>
                </>
            )}
            {userRole.role == "user" && (
                <>
                    <h3 className="font-bold text-2xl py-2 px-1">User Penal</h3>
                    <li>
                        <NavLink to="/dashboard/home">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/my-participated">
                            My Participated
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/my-winning">My Winning</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/my-profile">My Profile</NavLink>
                    </li>
                </>
            )}
        </>
    );

    return (
        <div className="flex">
            <div className="absolute z-50 md:relative">
                <ul
                    className={`menu hidden md:block p-4 w-60 min-h-screen h-full ${
                        userRole.role === "admin" && "bg-[#9BD3D0]"
                    } ${userRole.role === "creator" && "bg-[#FBC146]"} ${
                        userRole.role === "user" && "bg-[#E6B8A4]"
                    }`}
                >
                    {navItems}
                </ul>
                <div className="drawer md:hidden">
                    <input
                        id="my-drawer"
                        type="checkbox"
                        className="drawer-toggle"
                    />
                    <div className="drawer-content">
                        <label
                            htmlFor="my-drawer"
                            className="btn btn-circle btn-sm drawer-button text-xl text-white border-none bg-black bg-opacity-30 hover:bg-black hover:bg-opacity-40 m-2"
                        >
                            <CgMenuMotion />
                        </label>
                    </div>
                    <div className=" md:hidden drawer-side">
                        <label
                            htmlFor="my-drawer"
                            aria-label="close sidebar"
                            className="drawer-overlay"
                        ></label>
                        <ul className="menu w-48 min-h-full bg-[#9BD3D0] text-base-content flex-col">
                            {navItems}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;
