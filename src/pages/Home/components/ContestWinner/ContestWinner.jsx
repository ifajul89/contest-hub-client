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
                    }, 3000);
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
        return (
            <div className="w-full h-20 flex justify-center items-center">
                <span className="loading loading-infinity loading-lg"></span>;
            </div>
        );
    }

    return (
        <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-5 md:gap-32 mt-5 md:mt-16 mb-14 md:mb-24">
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
                                <img
                                    className={`border-[15px] ${
                                        index === 1 && "border-[#9BD3D0]"
                                    } ${index === 2 && "border-[#E6B8A4]"} ${
                                        index === 3 && "border-[#FBC146]"
                                    }`}
                                    src={winner.winnerImage}
                                    alt="Winner Image"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="md:w-1/3 space-y-2 text-center md:text-left">
                <h3 className="text-xl md:text-4xl font-bold">
                    See Our Winners
                </h3>
                <p className="text-sm">
                    Kudos to our recent contest winners! Now, it's YOUR turn to
                    shine. Join our contests, showcase your creativity, and be
                    the next star in our "Contest Winners" section. Unleash your
                    talent, inspire others, and let the celebrations begin!
                </p>
            </div>
        </div>
    );
}
