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
    if(req.method != "POST") return res.status(400);
    const {
        name,
        email,
        paymentMethod
    } = req.body;
    // create a customer
    const customer = await stripe.customers.create({
        email,
        name,
        payment_method: paymentMethod,
        invoice_settings: {
            default_payment_method: paymentMethod
        }
    })
    // create a product
    const product = await stripe.products.create({
        name:"Basic Plan"
    })
    // create a subscription
    const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [
            {
                price_data:{
                    currency: 'USD',
                    product: product.id,
                    unit_amount: "20000",
                    recurring: {
                        interval:'month',
                    }
                }
            }
        ],
        payment_settings: {
            payment_method_types:['card'],
            save_default_payment_method: "on_subscription",
        },
        expand: ['latest_invoice.payment_intent']
    })
    // send back the client secret
    res.json({
        message: "subscription sucessfull",
        clientSecret: subscription.latest_invoice.payment_intent.client_secret,
        subscriptionId: subscription.id
    })
  } catch(err){
    console.log(err)
    res.status(500).json({message: "server error", err})
  }
});

// Start the server
app.listen(3001, () => {
  console.log('Server listening on port 3001');
});

