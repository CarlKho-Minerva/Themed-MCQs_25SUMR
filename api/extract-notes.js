require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Ensure the API key is loaded
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') { // Check if it's the placeholder
  console.error("FATAL: GEMINI_API_KEY is not set or is still the placeholder in environment variables.");
  throw new Error("GEMINI_API_KEY is not set or configured in environment variables.");
} else {
  console.log("Gemini API Key loaded successfully (extract-notes)."); // Confirm key is loaded on startup
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Or your preferred model
console.log(`Using Gemini model: ${model.model} (extract-notes)`);

module.exports = async (req, res) => {
  const functionStartTime = Date.now();
  console.log(`--- /api/extract-notes invoked (Timestamp: ${functionStartTime}) ---`);

  if (req.method !== 'POST') {
    console.warn(`Method Not Allowed: Received ${req.method} request.`);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { notesText } = req.body;

    if (!notesText) {
      console.warn("Bad Request: Missing 'notesText' in request body.");
      return res.status(400).json({ error: 'Missing notesText in request body' });
    } else {
        // Log only the length to avoid excessively long logs
        console.log(`Received notesText with length: ${notesText.length}`);
    }

    // --- AI Prompt for Note Extraction ---
    // Keep prompt concise for logging, avoid logging the full notesText here
    const promptSummary = `Extract key concepts/definitions/facts from text (length: ${notesText.length}). Focus on info for MCQs.`;
    console.log(`Prompt summary for Gemini: ${promptSummary}`);

    const prompt = `Extract the key concepts, definitions, and important facts from the following text. Focus on information suitable for creating multiple-choice questions later. Present the extracted information clearly and concisely.

Text:
---
${notesText}
---

Extracted Notes:`;

    console.log("Sending request to Gemini API for note extraction...");
    const apiStartTime = Date.now();
    const result = await model.generateContent(prompt);
    const apiEndTime = Date.now();
    console.log(`Gemini API call (extract-notes) completed in ${apiEndTime - apiStartTime}ms.`);

    const response = await result.response;
    const extractedNotes = response.text();
    // Log length, not the full notes which could be huge
    console.log(`Received extracted notes from Gemini. Length: ${extractedNotes ? extractedNotes.length : 0}`);

    res.status(200).json({ extractedNotes });
    const functionEndTime = Date.now();
    console.log(`--- /api/extract-notes completed successfully in ${functionEndTime - functionStartTime}ms ---`);

  } catch (error) {
    console.error('Error during /api/extract-notes execution:', error.message);
    // Log specific Gemini API errors if available in the error structure
    if (error.response && error.response.data) {
        console.error('Gemini API Error Response:', JSON.stringify(error.response.data));
    } else {
        // Log the general error stack if no specific API response data
        console.error('Full error stack:', error.stack);
    }
    const functionEndTime = Date.now();
    console.error(`--- /api/extract-notes failed after ${functionEndTime - functionStartTime}ms ---`);
    res.status(500).json({ error: 'Failed to extract notes using AI', details: error.message });
  }
};
