const PORT = 8000;
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
require('dotenv').config();

const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEN_KEY);

app.post('/gemini', async (req, res) => {
    try {
        // Log the incoming request data
        console.log(req.body.history);
        console.log(req.body.message); // Corrected this line from re.body.message to req.body.message

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const chat = model.startChat({
            history: req.body.history,
        });

        const msg = req.body.message;

        // Send the message and await the result
        const result = await chat.sendMessage(msg);
        const response = await result.response;
        const text = await response.text(); // Await the response text
        res.send(text);
    } catch (error) {
        console.error("Error during message processing:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Use backticks for template literals to correctly log the port number
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
