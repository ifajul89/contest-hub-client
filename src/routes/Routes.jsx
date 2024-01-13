import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/error/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import AllContest from "../pages/AllContest/AllContest";
import ContestDetails from "../pages/ContestDetails/ContestDetails";
import PurchasePage from "../pages/PurchasePage/PurchasePage";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../pages/Dashboard/Dashboard";
import ManageContests from "../pages/Dashboard/AdminComponent/ManageContests";
import ManageUser from "../pages/Dashboard/AdminComponent/ManageUser";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import AddContest from "../pages/Dashboard/CreatorComponent/AddContest";
import MyCreatedContests from "../pages/Dashboard/CreatorComponent/MyCreatedContests";
import SeeSubmission from "../pages/Dashboard/CreatorComponent/SeeSubmission";
import MyWinning from "../pages/Dashboard/UserComponent/MyWinning";
import MyProfile from "../pages/Dashboard/UserComponent/MyProfile";
import MyParticipated from "../pages/Dashboard/UserComponent/MyParticipated";
import Leaderboard from "../pages/Leaderboard/Leaderboard";

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
                path: "/leaderboard",
                element: <Leaderboard></Leaderboard>,
            },
            {
                path: "/contest-details-page/:id",
                element: <ContestDetails></ContestDetails>,
                loader: ({ params }) =>
                    fetch(`https://b8a12-server-side-bluebird089.vercel.app/contests/${params.id}`),
            },
            {
                path: "/purchase/:id",
                element: (
                    <PrivateRoute>
                        <PurchasePage></PurchasePage>
                    </PrivateRoute>
                ),
                loader: ({ params }) =>
                    fetch(`https://b8a12-server-side-bluebird089.vercel.app/contests/${params.id}`),
            },
        ],
    },
    {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: "home",
                element: <DashboardHome></DashboardHome>,
            },
            {
                path: "manage-user",
                element: <ManageUser></ManageUser>,
            },
            {
                path: "manage-contest",
                element: <ManageContests></ManageContests>,
            },
            {
                path: "add-contest",
                element: <AddContest></AddContest>,
            },
            {
                path: "my-created-contest",
                element: <MyCreatedContests></MyCreatedContests>,
            },
            {
                path: "my-created-contest/:id",
                element: <SeeSubmission></SeeSubmission>,
            },
            {
                path: "my-participated",
                element: <MyParticipated></MyParticipated>,
            },
            {
                path: "my-winning",
                element: <MyWinning></MyWinning>,
            },
            {
                path: "my-profile",
                element: <MyProfile></MyProfile>,
            },
        ],
    },
]);

export default router;
