const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');
require('dotenv').config();

const app = express()

const key = process.env.KEYSERVERSTRIPE;
const stripe = new Stripe(key)

app.use(cors({origin:"http://localhost:3000"}))

app.use(express.json())

app.post("/api/checkout", async (req,res)=>{
    try {
        const { id, amount } = req.body;
        const payment = await stripe.paymentIntents.create({
            amount,
            currency:"USD",
            description:"Product",
            payment_method: id,
            confirm: true
        })
        res.send({message:"succesfull payment", payment})
    } catch(err){
        console.log(err.raw.message)
        res.json(err.raw.message)
    }
})

app.listen(3001 , () => {
    console.log("server on port",3001)
})