/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import "keen-slider/keen-slider.min.css";
import "./BestContestCreator.css";
import { FaFacebook } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { HiMiniArrowTrendingDown } from "react-icons/hi2";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

export default function BestContestCreator({ creators }) {
    return (
        <div className="bg-[#FBC146]">
            <div className="flex items-end justify-center gap-5 pt-2 md:py-2 container mx-auto text-white">
                <div className="text-center md:py-3">
                    <h3 className="text-lg md:text-4xl font-bold underline">
                        Best Contest Creators
                    </h3>
                </div>
                <HiMiniArrowTrendingDown className="hidden md:inline-block text-5xl" />
            </div>
            {creators.map((creator, index) => (
                <div  data-aos="fade-right"
                    key={creator._id}
                    className={`flex px-3 md:px-0 pt-5 ${
                        index === 1 && "flex-row-reverse"
                    } w-full items-center justify-center gap-3 md:gap-10 ${
                        index === 0 && "bg-[#FBC146]"
                    } ${index === 1 && "bg-[#9BD3D0]"} ${
                        index === 2 && "bg-[#E6B8A4]"
                    }`}
                >
                    <div
                        data-aos="fade-right"
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
                    <div className="w-1/2 md:w-1/5">
                        <img
                            className="w-full"
                            src={creator.creatorImage}
                            alt="Creator Image"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
