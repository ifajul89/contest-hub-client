/* eslint-disable react/prop-types */
import { useState } from "react";
import { TbUsersGroup } from "react-icons/tb";

const SingleContest = ({ contest }) => {
    const { contestImage, contestName, participantsCount, shortDescription } =
        contest;

    const [showFullContent, setShowFullContent] = useState(false);

    const visibleContent = showFullContent
        ? shortDescription
        : shortDescription.slice(0, 50);

    const handleReadMore = () => {
        setShowFullContent(!showFullContent);
    };

    return (
        <div className="w-2/5 lg:w-1/4">
            <div className="bg-white border-2 border-gray-400 rounded-xl shadow-lg custom-shadow p-1 md:p-3 items-start gap-1 md:gap-2 flex flex-col">
                <img className="rounded-lg" src={contestImage} alt="" />
                <h2 className="text-sm md:text-2xl font-bold">{contestName}</h2>
                <h3 className="flex items-center text-xs md:text-base gap-1">
                    <TbUsersGroup /> Attempted Count: {participantsCount}
                </h3>
                <p className="h-full text-xs sm:text-sm md:text-base">
                    {visibleContent}{" "}
                    <button
                        className="text-[#9BD3D0] hover:underline"
                        onClick={handleReadMore}
                    >
                        {showFullContent ? "Show Less" : "...Read More"}
                    </button>{" "}
                </p>
                <button className="bg-[#E6B8A4] text-xs sm:text-base btn btn-sm rounded-full border-none hover:bg-[#B38F7F] text-white font-bold">
                    Details
                </button>
            </div>
        </div>
    );
};

export default SingleContest;
