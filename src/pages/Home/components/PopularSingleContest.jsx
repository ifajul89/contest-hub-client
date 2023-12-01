/* eslint-disable react/prop-types */
import { TbUsersGroup } from "react-icons/tb";

const PopularSingleContest = ({ contest }) => {
    const { contestImage, contestName, participantsCount, shortDescription } =
        contest;

    return (
        <div className="w-1/4">
            <div className="bg-white border-2 border-gray-400 rounded-lg shadow-lg custom-shadow p-3 flex flex-col items-start gap-2 h-full">
                <img className="rounded-lg" src={contestImage} alt="" />
                <h2 className="text-2xl font-bold flex-1">{contestName}</h2>
                <h3 className="flex items-center gap-1">
                    <TbUsersGroup /> Attempted Count: {participantsCount}
                </h3>
                <p className="h-full flex-1">{shortDescription}</p>
                <button className="bg-[#E6B8A4] btn btn-sm rounded-full border-none hover:bg-[#B38F7F] text-white font-bold">
                    Details
                </button>
            </div>
        </div>
    );
};

export default PopularSingleContest;
