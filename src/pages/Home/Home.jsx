import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import BestContestCreator from "./components/BestContestCreator/BestContestCreator";
import ContestWinner from "./components/ContestWinner/ContestWinner";
import Header from "./components/Header";
import PopularContest from "./components/PopularContest";

const Home = () => {
    const axiosPublic = useAxiosPublic();

    const { data: creators = [], isLoading } = useQuery({
        queryKey: ["creators"],
        queryFn: async () => {
            const res = await axiosPublic.get("/top-winner");
            return res.data;
        },
    });

    return (
        <div>
            <Header></Header>
            <PopularContest></PopularContest>
            <ContestWinner></ContestWinner>
            {!isLoading && <BestContestCreator creators={creators}></BestContestCreator>}
        </div>
    );
};

export default Home;
