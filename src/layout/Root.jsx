import { Outlet } from "react-router-dom";

const Root = () => {
    return (
        <div>
            <h3 className="text-2xl text-center">Root Element</h3>
            <Outlet></Outlet>
        </div>
    );
};

export default Root;