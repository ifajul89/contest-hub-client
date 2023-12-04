import { TiThMenu } from "react-icons/ti";
import { Link, NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
    const navItems = (
        <>
            <li>
                <h3 className="font-bold text-xl underline">Admin Penal</h3>
            </li>
            <li>
                <NavLink to="/dashboard/home">Home</NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/manage-user">Manage User</NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/manage-contest">Manage Contest</NavLink>
            </li>
            <li>
                <NavLink to="/">Web Home</NavLink>
            </li>
        </>
    );

    return (
        <div className="flex">
            <div className="absolute z-50 md:relative">
                <ul className="menu hidden md:block p-4 w-60 min-h-screen h-full bg-[#9BD3D0]">
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
