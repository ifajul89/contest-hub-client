import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/error/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import AllContest from "../pages/AllContest/AllContest";
import ContestDetails from "../pages/ContestDetails/ContestDetails";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/login",
                element: <Login></Login>,
            },
            {
                path: "/sign-up",
                element: <SignUp></SignUp>,
            },
            {
                path: "/all-contest",
                element: <AllContest></AllContest>,
            },
            {
                path: "/contest-details-page/:id",
                element: <ContestDetails></ContestDetails>,
                loader: ({ params }) =>
                    fetch(`http://localhost:5000/contests/${params.id}`),
            },
        ],
    },
]);

export default router;
