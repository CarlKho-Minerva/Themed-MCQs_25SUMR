require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Ensure the API key is loaded
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') { // Check if it's the placeholder
  console.error("FATAL: GEMINI_API_KEY is not set or is still the placeholder in environment variables.");
  throw new Error("GEMINI_API_KEY is not set or configured in environment variables.");
} else {
  console.log("Gemini API Key loaded successfully (theme-questions)."); // Confirm key is loaded on startup
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Use a capable model
console.log(`Using Gemini model: ${model.model} (theme-questions)`);

module.exports = async (req, res) => {
  const functionStartTime = Date.now();
  console.log(`--- /api/theme-questions invoked (Timestamp: ${functionStartTime}) ---`);

  if (req.method !== 'POST') {
    console.warn(`Method Not Allowed: Received ${req.method} request.`);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Default theme, could be passed in req.body if needed
    const theme = 'Valorant agents and scenarios';
    const { notes } = req.body;

    if (!notes) {
      console.warn("Bad Request: Missing 'notes' in request body.");
      return res.status(400).json({ error: 'Missing notes in request body' });
    } else {
        // Log only the length
        console.log(`Received notes for theming with length: ${notes.length}`);
    }

    // --- AI Prompt for Themed Question Generation ---
    // Log prompt summary, not the full notes
    const promptSummary = `Generate themed MCQs (Theme: ${theme}) based on notes (length: ${notes.length}). Output JSON array.`;
    console.log(`Prompt summary for Gemini: ${promptSummary}`);

    const prompt = `Based on the following extracted notes, generate a list of multiple-choice quiz items.
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

JSON Output:`;

    console.log(`Sending request to Gemini API for themed question generation (Theme: ${theme})...`);
    const apiStartTime = Date.now();
    const result = await model.generateContent(prompt);
    const apiEndTime = Date.now();
    console.log(`Gemini API call (theme-questions) completed in ${apiEndTime - apiStartTime}ms.`);

    const response = await result.response;
    let jsonOutput = response.text();
    console.log("Received raw response from Gemini (theming). Length:", jsonOutput ? jsonOutput.length : 0);
    // Log first 500 chars of raw response for debugging structure issues, crucial for parsing errors
    console.log("Raw response snippet (first 500 chars):", jsonOutput ? jsonOutput.substring(0, 500) : "N/A");


    // Clean the response to ensure it's valid JSON
    console.log("Attempting to clean raw AI response (remove markdown backticks)...");
    jsonOutput = jsonOutput.replace(/^```json\s*/, '').replace(/```$/, '').trim();
    console.log("Cleaned response snippet (first 500 chars):", jsonOutput ? jsonOutput.substring(0, 500) : "N/A");


    // Validate and parse the JSON
    let themedQuestions;
    try {
        console.log("Attempting to parse cleaned response as JSON...");
        themedQuestions = JSON.parse(jsonOutput);
        if (!Array.isArray(themedQuestions)) {
             // This is a critical error if we expect an array
             console.error("Parsed response is not a JSON array. Type:", typeof themedQuestions);
             throw new Error("AI response was not a JSON array.");
        }
         // Basic validation of the first item's structure (if array is not empty)
         if (themedQuestions.length > 0) {
             const firstItem = themedQuestions[0];
             // Check for essential keys
             const requiredKeys = ['name', 'story', 'question', 'answer', 'fullDetails'];
             const missingKeys = requiredKeys.filter(key => !(key in firstItem));
             if (missingKeys.length > 0) {
                 console.warn(`Generated question structure might be incomplete. First item missing keys: [${missingKeys.join(', ')}]. Item:`, JSON.stringify(firstItem));
             } else {
                 console.log("First generated question structure appears valid.");
             }
         } else {
             // This isn't necessarily an error, but good to know
             console.warn("AI returned an empty array of questions.");
         }
        console.log(`Successfully parsed ${themedQuestions.length} themed questions.`);
    } catch (parseError) {
        console.error('FATAL: Error parsing JSON response from Gemini:', parseError.message);
        // Log the *full* raw response when parsing fails, as the snippet might not show the issue
        console.error('--- Full Raw AI Response causing parse error ---');
        console.error(jsonOutput);
        console.error('--- End Raw AI Response ---');
        // Return error to client
        return res.status(500).json({ error: 'Failed to parse themed questions from AI response', details: parseError.message, rawResponse: jsonOutput });
    }


    res.status(200).json({ themedQuestions });
    const functionEndTime = Date.now();
    console.log(`--- /api/theme-questions completed successfully in ${functionEndTime - functionStartTime}ms ---`);

  } catch (error) {
    console.error('Error during /api/theme-questions execution:', error.message);
     // Log specific Gemini API errors if available
    if (error.response && error.response.data) {
        console.error('Gemini API Error Response:', JSON.stringify(error.response.data));
    } else {
        console.error('Full error stack:', error.stack);
    }
    const functionEndTime = Date.now();
    console.error(`--- /api/theme-questions failed after ${functionEndTime - functionStartTime}ms ---`);
    res.status(500).json({ error: 'Failed to generate themed questions using AI', details: error.message });
  }
};
