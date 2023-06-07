"use client"
import React, { useState } from "react"
import Image from "next/image"
import Product from "../image/img.jpg"
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  useElements,
  CardElement,
  useStripe,
} from "@stripe/react-stripe-js"
import axios from "axios"

const stripePromise = loadStripe("pk_test_51NGPLmHxcJiCMySE7kKST0V29XeL4pz1qtXw6sKmmp31c11mnvwSpeP8tK4OtGy0NmkV7Erp3yTkHBT6UbMKmnLm00Ap6A1kRe")

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement)
      })

      setLoading(true)

      if(!error) {
        console.log(paymentMethod)
        const { id } = paymentMethod;

        const {data} = await axios.post("http://localhost:3001/api/checkout",{
          id,
          amount: 20000
        })
        console.log(data)
        elements.getElement(CardElement).clear();
      }
    } catch(err) {
      console.log(err)
    }
    setLoading(false)
  }

  return <form onSubmit={handleSubmit} className="class-form">
    <Image src={Product} alt="clip shein" width={250} height={250}/>
    <h2>Product</h2>
    <h4>price: USD$200</h4>
    <CardElement/>
    <button>{loading ? "...": "Buy"}</button>
  </form>
}

export default function Home() {
  return <Elements stripe={stripePromise}>
    <CheckoutForm/>
  </Elements>
}
