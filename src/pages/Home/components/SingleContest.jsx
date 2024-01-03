/* eslint-disable react/prop-types */
import { useState } from "react";
import { TbUsersGroup } from "react-icons/tb";
import { Link } from "react-router-dom";

const SingleContest = ({ contest }) => {
    const {
        _id,
        contestImage,
        contestName,
        contestCategory,
        participantsCount,
        shortDescription,
    } = contest;

    const [showFullContent, setShowFullContent] = useState(false);

    const visibleContent = showFullContent
        ? shortDescription
        : shortDescription.slice(0, 50);

    const handleReadMore = () => {
        setShowFullContent(!showFullContent);
    };

    return (
        <div className="px-5 md:px-0 md:w-2/5 lg:w-1/4">
            <div className="bg-white border-2 border-gray-400 rounded-xl shadow-lg custom-shadow p-3 items-start gap-1 md:gap-2 flex flex-col">
                <img className="rounded-lg" src={contestImage} alt="" />
                <h2 className="md:text-2xl font-bold">{contestName}</h2>
                <span className="bg-[#9BD3D0] text-white px-2 rounded-full">
                    {contestCategory}
                </span>
                <h3 className="flex items-center md:text-base gap-1">
                    <TbUsersGroup /> Attempted Count: {participantsCount}
                </h3>
                <p className="h-full sm:text-sm md:text-base">
                    {visibleContent}{" "}
                    <button
                        className="text-[#9BD3D0] hover:underline"
                        onClick={handleReadMore}
                    >
                        {showFullContent ? "Show Less" : "...Read More"}
                    </button>{" "}
                </p>
                <Link
                    to={`/contest-details-page/${_id}`}
                    className="bg-[#E6B8A4] text-xs sm:text-base btn btn-sm rounded-full border-none hover:bg-[#B38F7F] text-white font-bold"
                >
                    Details
                </Link>
            </div>
        </div>
    );
};

export default SingleContest;
