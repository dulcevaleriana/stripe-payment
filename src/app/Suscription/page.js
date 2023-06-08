"use client"
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
    Elements,
    useElements,
    CardElement,
    useStripe,
  } from "@stripe/react-stripe-js"

const stripePromise = loadStripe("pk_test_51NGPLmHxcJiCMySE7kKST0V29XeL4pz1qtXw6sKmmp31c11mnvwSpeP8tK4OtGy0NmkV7Erp3yTkHBT6UbMKmnLm00Ap6A1kRe");

export default function Suscription() {
//   const handleClick = async (e) => {
//     e.preventDefault();
//     const stripe = await stripePromise;
//     const { error } = await stripe.redirectToCheckout({
//       lineItems: [{ price: 'price_1NGW3EHxcJiCMySExhcXFbDM', quantity: 1 }],
//       mode: 'subscription',
//       successUrl: 'https://github.com/dulcevaleriana?tab=repositories',
//       cancelUrl: 'https://github.com/dulcevaleriana/stripe-payment',
//     });

//     if (error) {
//       console.log(error)
//     } else {
//         console.log("successfull? I guess...")
//     }
//   };

    const PaymentForm = () => {
        const [name, setName] = useState("")
        const [email, setEmail] = useState("")
        const stripe = useStripe()
        const elements = useElements()

        const createSubscription =  async (e) => {
            e.preventDefault();
            try {

            } catch(err) {
                console.log(err)
                alert(err)
            }
        }

        return <form onSubmit={createSubscription} className='class-form-subscribe'>
            <h2>You Choose... Basic Plan</h2>
            <h4>Complete subscription:</h4>
            <input
                type="text"
                value={name}
                placeholder='Add your name'
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="email"
                value={email}
                placeholder='Add your email'
                onChange={(e) => setEmail(e.target.value)}
            />
            <CardElement/>
            <button>subscribe!!</button>
        </form>
    }

  return (
    <Elements stripe={stripePromise}>
        <PaymentForm/>
    </Elements>
  );
}
