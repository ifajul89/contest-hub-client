import { loadStripe } from "@stripe/stripe-js";
import CheckOut from "./CheckOut";
import { Elements } from "@stripe/react-stripe-js";
import { useLoaderData } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_KEY);

const PurchasePage = () => {
    const contestDetail = useLoaderData();

    return (
        <div>
            <Elements stripe={stripePromise}>
                <CheckOut contestDetail={contestDetail}></CheckOut>
            </Elements>
        </div>
    );
};

export default PurchasePage;
