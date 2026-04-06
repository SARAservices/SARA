const twilio = require('twilio');
const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Initialize Twilio client
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Initialize OpenAI client
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Store conversations
let conversations = {};

app.post('/sms', async (req, res) => {
  const { Body, From } = req.body;
  const userResponse = Body.trim();

  // Store conversation
  if (!conversations[From]) {
    conversations[From] = [];
  }
  conversations[From].push({ user: userResponse });

  // Generate AI response
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: userResponse }],
    });

    const aiResponse = response.data.choices[0].message.content;
    conversations[From].push({ bot: aiResponse });

    // Send response back to user
    await twilioClient.messages.create({
      body: aiResponse,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: From,
    });
  } catch (error) {
    console.error('Error generating response:', error);
    res.status(500).send('Internal Server Error');
    return;
  }

  res.send('<Response></Response>'); // Respond to Twilio's webhook
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});