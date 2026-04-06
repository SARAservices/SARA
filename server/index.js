const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
    res.json({ status: 'Server is running' });
});

app.post('/webhook/sms', async (req, res) => {
    try {
        const { Body, From } = req.body;
        console.log(`Received SMS from ${From}: ${Body}`);
        res.send('<Response></Response>');
    } catch (error) {
        console.error('SMS webhook error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`AutoReply AI Server running on port ${PORT}`);
});
