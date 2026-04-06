const axios = require('axios');
const DWOLLA_API_URL = 'https://api.dwolla.com/v1.10';
const DWOLLA_APP_KEY = process.env.DWOLLA_APP_KEY;
const DWOLLA_APP_SECRET = process.env.DWOLLA_APP_SECRET;

let dwollaAccessToken = null;

const getDwollaAccessToken = async () => {
    try {
        const response = await axios.post(`${DWOLLA_API_URL}/token`, null, {
            auth: {
                username: DWOLLA_APP_KEY,
                password: DWOLLA_APP_SECRET,
            },
            params: {
                grant_type: 'client_credentials',
            },
        });
        dwollaAccessToken = response.data.access_token;
        return dwollaAccessToken;
    } catch (error) {
        console.error('Error getting Dwolla access token:', error);
        throw error;
    }
};

const createDwollaCustomer = async (firstName, lastName, email) => {
    try {
        if (!dwollaAccessToken) {
            await getDwollaAccessToken();
        }
        const response = await axios.post(
            `${DWOLLA_API_URL}/customers`,
            { firstName, lastName, email, },
            { headers: { Authorization: `Bearer ${dwollaAccessToken}`, }, }
        );
        return response.data._links.self.href;
    } catch (error) {
        console.error('Error creating Dwolla customer:', error);
        throw error;
    }
};

const createFundingSource = async (customerId, accountNumber, routingNumber, accountType) => {
    try {
        if (!dwollaAccessToken) {
            await getDwollaAccessToken();
        }
        const response = await axios.post(
            `${DWOLLA_API_URL}/${customerId}/funding-sources`,
            {
                routingNumber,
                accountNumber,
                bankAccountType: accountType,
                name: 'Zelle Account',
            },
            { headers: { Authorization: `Bearer ${dwollaAccessToken}`, }, }
        );
        return response.data;
    } catch (error) {
        console.error('Error creating funding source:', error);
        throw error;
    }
};

const initiateZelleTransfer = async (sourceFundingSourceId, destinationFundingSourceId, amount) => {
    try {
        if (!dwollaAccessToken) {
            await getDwollaAccessToken();
        }
        const response = await axios.post(
            `${DWOLLA_API_URL}/transfers`,
            {
                _links: {
                    source: { href: sourceFundingSourceId, },
                    destination: { href: destinationFundingSourceId, },
                },
                amount: { currency: 'USD', value: amount, },
            },
            { headers: { Authorization: `Bearer ${dwollaAccessToken}`, }, }
        );
        return response.data;
    } catch (error) {
        console.error('Error initiating Zelle transfer:', error);
        throw error;
    }
};

module.exports = { getDwollaAccessToken, createDwollaCustomer, createFundingSource, initiateZelleTransfer, };