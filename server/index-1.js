const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');
require('dotenv').config();

const app = express()

const key = process.env.KEYSERVERSTRIPE;
// const stripe = new Stripe(key)
const stripe = new Stripe("sk_test_51NGPLmHxcJiCMySEq2x2PRAXCmqTBPZrfXnDh8ZmjByZY89toYjAFux2oFOwHqH4ufZFg9Es632WaMIRDyOcPqmg00nqUh5EKG")

app.use(cors({origin:"http://localhost:3000"}))

app.use(express.json())
// Webhook endpoint
app.post('/api/subscribe', async (req, res) => {
  try {
    // create a customer
    // create a product
    // create a subscription
    // send back the client secret
  } catch(err){
    console.log(err)
    res.status(500).json({message: "server error", err})
  }
});

// Start the server
app.listen(3001, () => {
  console.log('Server listening on port 3001');
});

