import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import Logo from "../../assets/logo.png";
import { FaBars } from "react-icons/fa6";

const Navbar = () => {
    const { user, logOutUser } = useContext(AuthContext);

    const handleLogout = () => {
        logOutUser().then((result) => {
            console.log(result);
        });
    };

    const navItem = (
        <>
            <li>
                <NavLink className="px-2 py-1 block" to="/">
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink className="px-2 py-1 block" to="/all-contest">
                    All Contest
                </NavLink>
            </li>
        </>
    );

    return (
        <div>
            <div className="navbar bg-transparent container mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-sm btn-square lg:hidden"
                        >
                            <FaBars  className="text-xl"/>
                        </div>
                        <ul className="dropdown-content mt-3 z-[1] p-3 shadow bg-base-100 rounded-box space-y-2 w-32">
                            {navItem}
                        </ul>
                    </div>
                    <Link
                        to="/"
                        className="text-sm md:text-2xl font-extrabold flex items-center"
                    >
                        <img className="w-10" src={Logo} alt="Logo" />
                        <span className="hidden sm:inline-block">
                            Contest Hub
                        </span>
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu-horizontal px-1">{navItem}</ul>
                </div>
                <div className="navbar-end">
                    {user ? (
                        <details className="dropdown dropdown-end">
                            <summary className="m-1 btn btn-circle btn-ghost p-0 hover:bg-transparent">
                                <img
                                    className="rounded-full w-11 border-2 border-[#33362F]"
                                    src={user?.photoURL}
                                    alt="Profile"
                                />
                            </summary>
                            <ul className="p-3 space-y-2 shadow dropdown-content z-[1] bg-base-100 rounded-box w-40">
                                <li className="text-center text-gray-500 text-xl">
                                    {user?.displayName}
                                </li>
                                <Link
                                    to="/dashboard/home"
                                    className="btn btn-sm w-full"
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="btn btn-sm w-full"
                                >
                                    Log Out
                                </button>
                            </ul>
                        </details>
                    ) : (
                        <Link
                            to="/login"
                            className="btn bg-[#33362F] btn-sm md:btn-md text-white rounded-2xl hover:bg-black"
                        >
                            Log In
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
