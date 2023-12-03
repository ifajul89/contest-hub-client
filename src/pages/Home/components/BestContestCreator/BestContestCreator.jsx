/* eslint-disable react/prop-types */
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "./BestContestCreator.css";
import React from "react";

export default function BestContestCreator({ creators }) {
    const [opacities, setOpacities] = React.useState([]);

    const [sliderRef] = useKeenSlider({
        slides: creators.length,
        loop: true,
        detailsChanged(s) {
            const new_opacities = s.track.details.slides.map(
                (slide) => slide.portion
            );
            setOpacities(new_opacities);
        },
    });

    return (
        <div ref={sliderRef} className="fader">
            {creators.map((creators, idx) => (
                <div
                    key={creators._id}
                    className="fader__slide flex"
                    style={{ opacity: opacities[idx] }}
                >
                    <div></div>
                    <img src={creators.creatorImage} />
                </div>
            ))}
        </div>
    );
}
