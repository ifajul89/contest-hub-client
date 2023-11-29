import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="flex gap-1 flex-col h-screen w-full justify-center items-center">
            <h3 className="font-bold text-6xl">404</h3>
            <h3 className="font-semibold text-4xl">Not Found</h3>
            <Link to='/' className="btn">Back to Home</Link>
        </div>
    );
};

export default ErrorPage;