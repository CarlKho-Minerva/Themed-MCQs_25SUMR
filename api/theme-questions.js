require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Ensure the API key is loaded
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not set in environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Use a capable model

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Default theme, could be passed in req.body if needed
    const theme = 'Valorant agents and scenarios';
    const { notes } = req.body;

    if (!notes) {
      return res.status(400).json({ error: 'Missing notes in request body' });
    }

    // --- AI Prompt for Themed Question Generation ---
    const prompt = \`Based on the following extracted notes, generate a list of multiple-choice quiz items.
Each item should follow this JSON structure:
{
  "name": "Concise Name/Topic",
  "story": "A short, engaging scenario themed around ${theme}. The scenario should subtly hint at the condition or topic.",
  "question": "A clear multiple-choice question based on the notes.",
  "answer": "The single correct answer.",
  "fullDetails": "<div class=\\"details-title\\">Key Info:</div><div class=\\"details-content\\">Relevant details from the notes, formatted with simple HTML (like the example).</div>"
}

Format the entire output as a valid JSON array containing these objects. Do not include any text before or after the JSON array.

Extracted Notes:
---
${notes}
---

JSON Output:\`;

    console.log("Sending request to Gemini for themed question generation...");
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let jsonOutput = response.text();
    console.log("Received raw response from Gemini (theming).");

    // Clean the response to ensure it's valid JSON
    // Sometimes models add markdown backticks or "json" prefix
    jsonOutput = jsonOutput.replace(/^```json\s*/, '').replace(/```$/, '').trim();

    // Validate and parse the JSON
    let themedQuestions;
    try {
        themedQuestions = JSON.parse(jsonOutput);
        if (!Array.isArray(themedQuestions)) {
             throw new Error("AI response was not a JSON array.");
        }
         // Basic validation of the first item's structure (if array is not empty)
         if (themedQuestions.length > 0) {
             const firstItem = themedQuestions[0];
             if (!firstItem.name || !firstItem.story || !firstItem.question || !firstItem.answer || !firstItem.fullDetails) {
                 console.warn("Generated question structure might be incomplete:", firstItem);
                 // Decide if this is a critical error or just a warning
             }
         }
        console.log(\`Successfully parsed ${themedQuestions.length} themed questions.\`);
    } catch (parseError) {
        console.error('Error parsing JSON response from Gemini:', parseError);
        console.error('Raw AI Response:', jsonOutput); // Log the raw response for debugging
        return res.status(500).json({ error: 'Failed to parse themed questions from AI response', details: parseError.message, rawResponse: jsonOutput });
    }


    res.status(200).json({ themedQuestions });

  } catch (error) {
    console.error('Error calling Gemini API (theme-questions):', error);
    res.status(500).json({ error: 'Failed to generate themed questions using AI', details: error.message });
  }
};
