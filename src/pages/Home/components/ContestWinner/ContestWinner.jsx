/* eslint-disable react/no-unescaped-entities */
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "./ContestWinner.css";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const carousel = (slider) => {
    const z = 250;
    function rotate() {
        const deg = 360 * slider.track.details.progress;
        slider.container.style.transform = `translateZ(-${z}px) rotateY(${-deg}deg)`;
    }
    slider.on("created", () => {
        const deg = 360 / slider.slides.length;
        slider.slides.forEach((element, idx) => {
            element.style.transform = `rotateY(${
                deg * idx
            }deg) translateZ(${z}px)`;
        });
        rotate();
    });
    slider.on("detailsChanged", rotate);
};

export default function ContestWinner() {
    const [sliderRef] = useKeenSlider(
        {
            loop: true,
            selector: ".carousel__cell",
            renderMode: "custom",
            mode: "free-snap",
        },
        [
            (slider) => {
                let timeout;
                let mouseOver = false;
                function clearNextTimeout() {
                    clearTimeout(timeout);
                }
                function nextTimeout() {
                    clearTimeout(timeout);
                    if (mouseOver) return;
                    timeout = setTimeout(() => {
                        slider.next();
                    }, 4000);
                }
                slider.on("created", () => {
                    slider.container.addEventListener("mouseover", () => {
                        mouseOver = true;
                        clearNextTimeout();
                    });
                    slider.container.addEventListener("mouseout", () => {
                        mouseOver = false;
                        nextTimeout();
                    });
                    nextTimeout();
                });
                slider.on("dragStarted", clearNextTimeout);
                slider.on("animationEnded", nextTimeout);
                slider.on("updated", nextTimeout);
            },
            carousel,
        ]
    );

    const axiosPublic = useAxiosPublic();

    const { data: winners, isPending } = useQuery({
        queryKey: ["winners"],
        queryFn: async () => {
            const res = await axiosPublic.get("/top-winner");
            return res.data;
        },
    });

    if (isPending) {
        return <span className="loading loading-infinity loading-lg"></span>;
    }

    console.log(winners);

    return (
        <div className="flex justify-center gap-32 items-center mt-10 mb-20">
            <div className="wrapper">
                <div className="scene">
                    <div className="carousel keen-slider" ref={sliderRef}>
                        {winners.map((winner, index) => (
                            <div
                                key={winner._id}
                                className={`carousel__cell number-slide${
                                    index + 1
                                } w-full`}
                            >
                                <img src={winner.winnerImage} alt="" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="w-1/3">
                <h3>See Our Winners</h3>
                <p>
                    Kudos to our recent contest winners! Now, it's YOUR turn to
                    shine. Join our contests, showcase your creativity, and be
                    the next star in our "Contest Winners" section. Unleash your
                    talent, inspire others, and let the celebrations begin!
                </p>
            </div>
        </div>
    );
}
