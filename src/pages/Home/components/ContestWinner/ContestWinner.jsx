import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "../../../../assets/colorful-pattern-young-people_23-2148218806.jpg";
import "./ContestWinner.css"

const carousel = (slider) => {
    const z = 300;
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
        [carousel]
    );

    return (
        <div className="wrapper">
            <div className="scene">
                <div className="carousel keen-slider" ref={sliderRef}>
                    <div className="carousel__cell number-slide1">
                        <img src={Image} alt="" />
                    </div>
                    <div className="carousel__cell number-slide2">
                        <img src={Image} alt="" />
                    </div>
                    <div className="carousel__cell number-slide3">
                        <img src={Image} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
}
