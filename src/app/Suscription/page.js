"use client"
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
    Elements,
    useElements,
    CardElement,
    useStripe,
  } from "@stripe/react-stripe-js"
import axios from "axios"

const stripePromise = loadStripe("pk_test_51NGPLmHxcJiCMySE7kKST0V29XeL4pz1qtXw6sKmmp31c11mnvwSpeP8tK4OtGy0NmkV7Erp3yTkHBT6UbMKmnLm00Ap6A1kRe");

export default function Suscription() {

    const PaymentForm = () => {
        const [name, setName] = useState("")
        const [email, setEmail] = useState("")
        const stripe = useStripe()
        const elements = useElements()

        const createSubscription =  async (e) => {
            e.preventDefault();
            try {
                const paymentMethod = await stripe.createPaymentMethod({
                    type:'card',
                    // card: elements.getElement('card')
                    card: elements.getElement(CardElement)
                })
                const response = await axios.post('http://localhost:3001/api/subscribe',{
                    name,
                    email,
                    paymentMethod: paymentMethod.paymentMethod.id
                })
                if(response.status != 200) return console.log({message:"payment unsucesfull !",response});
                // const data = await response.json();
                console.log({response})
                const confirm = await stripe.confirmCardPayment(response.data.clientSecret);
                if(confirm.err) return console.log({message:"payment unsucesfull !", err})
                alert("payment sucesfull ! subscription active")

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
