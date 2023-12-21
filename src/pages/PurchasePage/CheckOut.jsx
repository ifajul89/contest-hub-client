/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckOut = ({ contestDetail }) => {
    const stripe = useStripe();
    const [error, setError] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const elements = useElements();
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { participationFee, participantsCount, contestName, _id } =
        contestDetail;
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure
            .post("/create-payment-intent", { fee: participationFee })
            .then((res) => {
                setClientSecret(res.data.clientSecret);
            });
    }, [axiosSecure, participationFee]);

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
            setError(error.message);
        } else {
            console.log("Payment Method", paymentMethod);
            setError("");
        }

        const { paymentIntent, error: confirmError } =
            await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || "anonymous",
                        name: user?.displayName || "anonymous",
                    },
                },
            });

        if (confirmError) {
            console.log("Confirm Error", confirmError);
        } else {
            if (paymentIntent) {
                const amount = paymentIntent.amount / 100;
                const newRegister = {
                    paymentId: paymentIntent.id,
                    amount,
                    contestName,
                    contestId: _id,
                    registerName: user.displayName,
                    registerImage: user.photoURL,
                    registerEmail: user.email,
                };
                axiosSecure
                    .post("/registered-contests", newRegister)
                    .then((res) => {
                        
                        if (res.data.insertedId) {
                            const updatedContest = {
                                participantsCount: participantsCount + 1,
                            };
                            axiosSecure
                                .patch(`/contests/${_id}`, updatedContest)
                                .then((res) => {
                                    if (res.data.modifiedCount) {
                                        Swal.fire({
                                            title: "Success",
                                            text: "Registered Successfully",
                                            icon: "success",
                                        });
                                        navigate("/");
                                    }
                                });
                        }
                    });
            }
        }
    };

    return (
        <div className="container mx-auto">
            <form
                className="flex gap-1 flex-col md:flex-row"
                onSubmit={handleSubmit}
            >
                <CardElement
                    className="border-2 p-3 rounded-xl w-full gap-10"
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
                    className="btn bg-[#FBC146] hover:bg-[#dba93d] border-none"
                    type="submit"
                    disabled={!stripe || !clientSecret}
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default CheckOut;
