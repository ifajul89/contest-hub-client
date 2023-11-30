import { TbDirectionSign } from "react-icons/tb";

const Header = () => {
    return (
        <div className="py-10">
            <div className="space-y-5">
                <h3 className="text-6xl font-bold">
                    Create Your
                    <br />
                    Contest With
                    <br />
                    <span className="flex items-center">
                        Us
                        <TbDirectionSign />
                    </span>
                </h3>
                <h5 className="text-lg">
                    We're thrilled to have you on board, ready to explore
                    <br />
                    the endless possibilities of creativity with ContestHub
                </h5>
                <form className="flex border-2 w-min p-1 rounded-xl">
                    <input
                        className="input rounded-r-none"
                        placeholder="Search Contest"
                        type="text"
                    />
                    <input
                        className="btn rounded-l-none bg-[#FBC146] font-bold"
                        type="submit"
                        value="Search"
                    />
                </form>
            </div>
            <div></div>
        </div>
    );
};

export default Header;
