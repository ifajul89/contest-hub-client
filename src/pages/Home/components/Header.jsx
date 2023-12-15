/* eslint-disable react/no-unescaped-entities */
import { TbDirectionSign } from "react-icons/tb";
import GreenHoodieGuy from "../../../assets/greenHoodie.png";
import YellowTShirtLady from "../../../assets/yellowTShirtLady.png";
import { FaCheck } from "react-icons/fa6";
import { WiDirectionLeft } from "react-icons/wi";
import { useState } from "react";
import SearchedContests from "./SearchedContests";

const Header = () => {
    const [search, setSearch] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        const form = e.target;
        const search = form.search.value;
        setSearch(search);
        document
            .getElementById("searchResult")
            .scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div>
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row justify-around lg:items-center md:py-10 px-3 md:px-0 gap-3 mb-5">
                    <div className="space-y-5">
                        <h3 className="text-4xl lg:text-6xl font-bold">
                            Create Your
                            <br />
                            Contest With
                            <br />
                            <span className="flex items-center">
                                Us
                                <TbDirectionSign />
                            </span>
                        </h3>
                        <h5 className="md:text-lg">
                            We're thrilled to have you on board, ready to
                            explore
                            <br />
                            the endless possibilities of creativity with
                            ContestHub
                        </h5>
                        <form
                            onSubmit={handleSearch}
                            className="flex w-full border-2 lg:w-min p-1 rounded-xl"
                        >
                            <input
                                name="search"
                                className="input rounded-r-none w-full lg:w-[300px]"
                                placeholder="Search Contest"
                                type="text"
                            />
                            <input
                                className="btn rounded-l-none bg-[#FBC146] hover:bg-[#dba93d] font-bold"
                                type="submit"
                                value="Search"
                            />
                        </form>
                    </div>
                    <div className="lg:w-1/2 flex relative h-72 md:h-[600px] lg:h-[500px]">
                        <div
                            className="bg-[#E6B8A4] border border-gray-900 p-4 w-40 md:w-60 rounded-t-full absolute bottom-0 right-2 sm:right-10 z-10
                "
                        >
                            <div className="bg-[#9BD3D0] border border-gray-900 h-full flex items-end rounded-t-full">
                                <img src={GreenHoodieGuy} alt="" />
                                <div className="border-2 border-gray-900 rounded-full bg-white p-3 absolute -bottom-4 -right-4">
                                    <FaCheck className="text-2xl text-[#FBC146]"></FaCheck>
                                </div>
                            </div>
                        </div>
                        <div className="bg-[#9BD3D0] border border-gray-900 p-4 w-40 md:w-60 rounded-t-full absolute top-0 left-0 sm:left-10 xl:left-32">
                            <div className="bg-[#E6B8A4] border border-gray-900 pt-5 px-5 rounded-t-full">
                                <img src={YellowTShirtLady} alt="" />
                            </div>
                        </div>
                        <div className="absolute flex text-4xl md:text-6xl bottom-0 left-0 md:left-10 xl:left-32">
                            <WiDirectionLeft></WiDirectionLeft>
                            <WiDirectionLeft></WiDirectionLeft>
                        </div>
                    </div>
                </div>
            </div>
            {search.length > 0 && (
                <SearchedContests search={search}></SearchedContests>
            )}
        </div>
    );
};

export default Header;
