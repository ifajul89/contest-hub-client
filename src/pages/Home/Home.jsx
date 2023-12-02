import ContestWinner from "./components/ContestWinner/ContestWinner";
import Header from "./components/Header";
import PopularContest from "./components/PopularContest";

const Home = () => {
    return (
        <div>
            <Header></Header>
            <PopularContest></PopularContest>
            <ContestWinner></ContestWinner>
        </div>
    );
};

export default Home;
