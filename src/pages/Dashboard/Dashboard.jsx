import { TiThMenu } from "react-icons/ti";
import { Link, NavLink, Outlet } from "react-router-dom";
import useUserRole from "../../hooks/useUserRole";

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
            {userRole.role === "admin" && (
                <>
                    <li>
                        <h3 className="font-bold text-xl underline">
                            Admin Penal
                        </h3>
                    </li>
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
                    <li>
                        <h3 className="font-bold text-xl underline">
                            Creator Penal
                        </h3>
                    </li>
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
                    <li>
                        <h3 className="font-bold text-xl underline">
                            User Penal
                        </h3>
                    </li>
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
            <li>
                <NavLink to="/">Web Home</NavLink>
            </li>
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
                            className="btn btn-ghost drawer-button text-2xl"
                        >
                            <TiThMenu></TiThMenu>
                        </label>
                    </div>
                    <div className=" md:hidden drawer-side">
                        <label
                            htmlFor="my-drawer"
                            aria-label="close sidebar"
                            className="drawer-overlay"
                        ></label>
                        <ul className="menu w-40 min-h-full bg-[#9BD3D0] text-base-content flex-col">
                            {navItems}
                            <Link to="/" className="btn rounded-full">
                                Go Back To Home
                            </Link>
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
