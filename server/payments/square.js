// square.js

// Import the Square SDK
const { Client } = require('square');

// Initialize the Square client
const client = new Client({
    environment: 'sandbox', // Use 'production' for live environment
    accessToken: 'YOUR_ACCESS_TOKEN', // Replace with your actual access token
});

/**
 * Function to create a payment
 * @param {string} amount - The amount for the payment in cents
 * @param {string} sourceId - The ID of the source (like a card nonce)
 * @returns {Promise<Object>} - The response from Square API
 */
async function createPayment(amount, sourceId) {
    try {
        const response = await client.paymentsApi.createPayment({
            sourceId,
            amountMoney: {
                amount: parseInt(amount),
                currency: 'USD',
            },
            idempotencyKey: new Date().toISOString(), // Ensure the request is unique
        });
        return response.result;
    } catch (error) {
        console.error('Error creating payment:', error);
        throw error;
    }
}

/**
 * Function to create a customer
 * @param {Object} customerData - The data for the customer
 * @returns {Promise<Object>} - The response from Square API
 */
async function createCustomer(customerData) {
    try {
        const response = await client.customersApi.createCustomer(customerData);
        return response.result;
    } catch (error) {
        console.error('Error creating customer:', error);
        throw error;
    }
}

/**
 * Function to get payment details
 * @param {string} paymentId - The ID of the payment
 * @returns {Promise<Object>} - The response from Square API
 */
async function getPaymentDetails(paymentId) {
    try {
        const response = await client.paymentsApi.getPayment(paymentId);
        return response.result;
    } catch (error) {
        console.error('Error getting payment details:', error);
        throw error;
    }
}

/**
 * Function to list payments
 * @param {Object} query - The query parameters for listing payments
 * @returns {Promise<Object>} - The response from Square API
 */
async function listPayments(query) {
    try {
        const response = await client.paymentsApi.listPayments(query);
        return response.result;
    } catch (error) {
        console.error('Error listing payments:', error);
        throw error;
    }
}

module.exports = {
    createPayment,
    createCustomer,
    getPaymentDetails,
    listPayments,
};
