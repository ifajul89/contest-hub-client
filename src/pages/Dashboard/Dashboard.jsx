import { TiThMenu } from "react-icons/ti";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
    const navItems = (
        <>
            <li>
                <NavLink to="/dashboard/home">Home</NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/manage-user">Manage User</NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/manage-contest">Manage Contest</NavLink>
            </li>
        </>
    );

    return (
        <div className="flex">
            <div>
                <ul className="menu hidden md:block p-4 w-60 min-h-screen bg-[#9BD3D0]">
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
                        <ul className="menu w-40 min-h-full bg-[#9BD3D0] text-base-content">
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
