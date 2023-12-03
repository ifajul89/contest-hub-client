/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import "keen-slider/keen-slider.min.css";
import "./BestContestCreator.css";
import { FaFacebook } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";

export default function BestContestCreator({ creators }) {
    return (
        <div className="">
            {creators.map((creator, index) => (
                <div
                    key={creator._id}
                    className={`flex pt-5 ${
                        index === 1 && "flex-row-reverse"
                    } w-full items-center justify-center gap-3 md:gap-10 ${
                        index === 0 && "bg-[#FBC146]"
                    } ${index === 1 && "bg-[#9BD3D0]"} ${
                        index === 2 && "bg-[#E6B8A4]"
                    }`}
                >
                    <div
                        className={`w-3/5 md:w-2/5 space-y-1 sm:space-y-3 ${
                            index === 1 ? "text-left" : "text-right"
                        }`}
                    >
                        <h3 className="text-sm sm:text-2xl lg:text-4xl font-bold text-white">
                            "{creator.creatorName}"
                        </h3>
                        <p className="text-white font-medium text-xs md:text-base lg:text-xl">
                            <b>Contest Name: </b>
                            {creator.contestName}
                        </p>
                        <p className="text-white font-medium text-xs sm:text-sm md:text-base">
                            "{creator.shortDescription}"
                        </p>
                        <div
                            className={`flex text-white sm:text-3xl gap-2 ${
                                index === 1 ? "justify-start" : "justify-end"
                            }`}
                        >
                            <FaFacebook />
                            <BsTwitterX></BsTwitterX>
                            <BsInstagram></BsInstagram>
                        </div>
                    </div>
                    <div className="">
                        <img src={creator.creatorImage} alt="Creator Image" />
                    </div>
                </div>
            ))}
        </div>
    );
}
