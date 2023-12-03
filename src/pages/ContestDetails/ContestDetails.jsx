import { TbUsersGroup } from "react-icons/tb";
import { useLoaderData } from "react-router-dom";

const ContestDetails = () => {
    const {
        contestName,
        contestImage,
        participantsCount,
        shortDescription,
        winnerName,
        winnerImage,
        colorCode,
        // Show Dynamic Deadline
    } = useLoaderData();

    return (
        <div
            className={`${colorCode === "yellow" && "bg-[#FBC146]"} ${
                colorCode === "blue" && "bg-[#9BD3D0]"
            } ${colorCode === "pink" && "bg-[#E6B8A4]"}`}
        >
            <div className="flex flex-col md:flex-row gap-5 items-center container mx-auto p-3 sm:p-5 md:p-10">
                <div className="md:w-2/3">
                    <img
                        className="w-full rounded-lg"
                        src={contestImage}
                        alt="Contest Image"
                    />
                </div>
                <div className="md:w-1/3 space-y-2 md:space-y-4">
                    <h2 className="text-2xl md:text-4xl font-bold">{contestName}</h2>
                    <h3 className="flex items-center gap-2 text-lg md:text-2xl">
                        <TbUsersGroup /> Attempted Count: {participantsCount}
                    </h3>
                    <h4 className="text-sm md:text-base">{shortDescription}</h4>
                    <div className="flex items-center gap-3">
                        <h3 className="md:text-xl font-bold">Winner Info:</h3>
                        <span className="flex gap-2 items-center p-2 border-2 border-gray-900 rounded-full">
                            <img
                                className="rounded-full w-10"
                                src={winnerImage}
                                alt=""
                            />
                            <h3 className="md:text-xl font-bold">{winnerName}</h3>
                        </span>
                    </div>
                    <p>{/* Dynamic Timer */}</p>
                    <button className="btn w-full rounded-full text-white border-none bg-gray-900 hover:bg-black">
                        Registration
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContestDetails;
