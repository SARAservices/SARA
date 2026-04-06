const stripe = require('stripe')('your_stripe_secret_key');

// Create a payment intent
const createPaymentIntent = async (amount) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            // Optional: specify payment method types
            payment_method_types: ['card'],
        });
        return paymentIntent;
    } catch (error) {
        console.error('Error creating payment intent:', error);
        throw error;
    }
};

// Create a checkout session
const createCheckoutSession = async (lineItems) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: 'https://yourdomain.com/success',
            cancel_url: 'https://yourdomain.com/cancel',
        });
        return session;
    } catch (error) {
        console.error('Error creating checkout session:', error);
        throw error;
    }
};

module.exports = { createPaymentIntent, createCheckoutSession };