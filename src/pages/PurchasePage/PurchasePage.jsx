import { loadStripe } from "@stripe/stripe-js";
import CheckOut from "./CheckOut";
import { Elements } from "@stripe/react-stripe-js";
import { useLoaderData } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_KEY);

const PurchasePage = () => {
    const contestDetail = useLoaderData();
    const { contestImage, contestName, parcitipationFee } = contestDetail;

    return (
        <div className="container mx-auto ">
            <div className="border-[3px] w-1/2 mx-auto my-10 border-gray-600 p-5 rounded-2xl">
                <div className="pb-5 space-y-3">
                    <img
                        className="rounded-lg font-bold"
                        src={contestImage}
                        alt=""
                    />
                    <h3 className="text-3xl">{contestName}</h3>
                    <h3 className="text-2xl">
                        Participation Fee : <b>${parcitipationFee}</b>{" "}
                    </h3>
                </div>
                <Elements stripe={stripePromise}>
                    <CheckOut contestDetail={contestDetail}></CheckOut>
                </Elements>
            </div>
        </div>
    );
};

export default PurchasePage;
