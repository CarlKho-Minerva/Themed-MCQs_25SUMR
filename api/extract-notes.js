require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Ensure the API key is loaded
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not set in environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Or your preferred model

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { notesText } = req.body;

    if (!notesText) {
      return res.status(400).json({ error: 'Missing notesText in request body' });
    }

    // --- AI Prompt for Note Extraction ---
    const prompt = `Extract the key concepts, definitions, and important facts from the following text. Focus on information suitable for creating multiple-choice questions later. Present the extracted information clearly and concisely.

Text:
---
${notesText}
---

Extracted Notes:`;

    console.log("Sending request to Gemini for note extraction...");
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const extractedNotes = response.text();
    console.log("Received extracted notes from Gemini.");

    res.status(200).json({ extractedNotes });

  } catch (error) {
    console.error('Error calling Gemini API (extract-notes):', error);
    res.status(500).json({ error: 'Failed to extract notes using AI', details: error.message });
  }
};
