/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const CheckOut = ({ contestDetail }) => {
    const stripe = useStripe();
    const [error, setError] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const {
        // _id,
        // contestName,
        // contestImage,
        parcitipationFee,
        // participantsCount,
        // shortDescription,
        // winnerName,
        // winnerImage,
        // colorCode,
    } = contestDetail;

    console.log(parcitipationFee);

    useEffect(() => {
        axiosSecure
            .post("/create-payment-intent", { fee: parcitipationFee })
            .then((res) => {
                console.log(res.data.clientSecret.client_secret);
                setClientSecret(res.data.clientSecret.client_secret);
            });
    }, [axiosSecure, parcitipationFee]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });

        if (error) {
            console.log("Payments Error", error);
            setError(error.message);
        } else {
            console.log("Payment Method", paymentMethod);
            setError("");
        }
    };

    return (
        <div className="container mx-auto">
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: "16px",
                                color: "#424770",
                                "::placeholder": {
                                    color: "#aab7c4",
                                },
                            },
                            invalid: {
                                color: "#9e2146",
                            },
                        },
                    }}
                />
                <p className="text-red-600 py-1">{error}</p>
                <button
                    className="btn"
                    type="submit"
                    disabled={!stripe || !clientSecret}
                >
                    Pay
                </button>
            </form>
        </div>
    );
};

export default CheckOut;
