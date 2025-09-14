import Stripe from "stripe";
import config from "../config/config.js";

export const createIntent = async (req, res) => {
  console.log(req.body);
  const stripe = new Stripe(config.stripe.secret);
  let { amount } = req.body;
  amount = parseInt(amount) * 100;
  console.log(amount);
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "aud",
    });
    console.log(paymentIntent);
    if (paymentIntent) {
      res.status(200).json({
        status: true,
        message: "Intent created successfully",
        clientSecret: paymentIntent.client_secret,
      });
    } else {
      res.status(500).json({ status: false, message: "Error creating intent" });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};
