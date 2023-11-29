import { Outlet } from "react-router-dom";

const Main = () => {
    return (
        <div>
            <h3 className="text-2xl text-center">Main Element</h3>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;
