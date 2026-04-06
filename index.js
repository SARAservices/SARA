const express = require('express');
const app = express();
const port = 3000;

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).send({ status: 'UP', timestamp: new Date().toISOString() });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});