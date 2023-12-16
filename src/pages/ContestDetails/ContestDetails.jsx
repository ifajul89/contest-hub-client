import { TbUsersGroup } from "react-icons/tb";
import { Link, useLoaderData } from "react-router-dom";
import moment from "moment";
import { useEffect, useState } from "react";

const ContestDetails = () => {
    const {
        _id,
        contestName,
        contestImage,
        participantsCount,
        shortDescription,
        winnerName,
        winnerImage,
        colorCode,
        contestDeadline,
    } = useLoaderData();

    const [daysLeft, setDaysLeft] = useState("");
    const [hoursLeft, setHoursLeft] = useState("");
    const [minutesLeft, setMinutesLeft] = useState("");
    const [secondsLeft, setSecondsLeft] = useState("");

    const [timesUp, setTimesUp] = useState(true);

    const deadLine = moment(contestDeadline);

    const getTimeRemaining = () => {
        const currentTime = moment();
        const duration = moment.duration(deadLine.diff(currentTime));
        return {
            days: Math.floor(duration.asDays()),
            hours: duration.hours(),
            minutes: duration.minutes(),
            seconds: duration.seconds(),
        };
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeRemaining(getTimeRemaining());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining());

    useEffect(() => {
        if (
            timeRemaining.days <= 0 &&
            timeRemaining.hours <= 0 &&
            timeRemaining.minutes <= 0 &&
            timeRemaining.seconds <= 0
        ) {
            handleTimerEnd();
        }
    }, [timeRemaining]);

    useEffect(() => {
        setDaysLeft(timeRemaining.days);
        setHoursLeft(timeRemaining.hours);
        setMinutesLeft(timeRemaining.minutes);
        setSecondsLeft(timeRemaining.seconds);
    }, [
        timeRemaining.days,
        timeRemaining.hours,
        timeRemaining.minutes,
        timeRemaining.seconds,
    ]);

    const handleTimerEnd = () => {
        setTimesUp(false);
    };

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
                    <h2 className="text-2xl md:text-4xl font-bold">
                        {contestName}
                    </h2>
                    <h3 className="flex items-center gap-2 text-lg md:text-2xl">
                        <TbUsersGroup /> Attempted Count: {participantsCount}
                    </h3>
                    <h4 className="text-sm md:text-base">{shortDescription}</h4>
                    {timesUp === true ? (
                        <>
                            <h3 className="text-xl md:text-2xl font-extrabold">
                                Times Left :
                            </h3>
                            <div className="flex text-lg md:text-xl font-bold items-center gap-5">
                                <div className="text-center">
                                    <p>{daysLeft}</p>
                                    <p>Day</p>
                                </div>
                                <div className="text-center">
                                    <p>{hoursLeft}</p>
                                    <p>Hour</p>
                                </div>
                                <div className="text-center">
                                    <p>{minutesLeft}</p>
                                    <p>Minute</p>
                                </div>
                                <div className="text-center">
                                    <p>{secondsLeft}</p>
                                    <p>Second</p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center gap-3">
                            <h3 className="md:text-xl font-bold">
                                Winner Info:
                            </h3>
                            <span className="flex gap-2 items-center p-2 border-2 border-gray-900 rounded-full">
                                <img
                                    className="rounded-full w-10"
                                    src={winnerImage}
                                    alt=""
                                />
                                <h3 className="md:text-xl font-bold">
                                    {winnerName}
                                </h3>
                            </span>
                        </div>
                    )}
                    {timesUp === true ? (
                        <Link
                            to={`/purchase/${_id}`}
                            className="btn w-full rounded-full text-white border-none bg-gray-900 hover:bg-black"
                        >
                            Registration
                        </Link>
                    ) : (
                        <button
                            disabled
                            className="btn w-full rounded-full text-white border-none bg-gray-900 hover:bg-black"
                        >
                            Registration
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContestDetails;
