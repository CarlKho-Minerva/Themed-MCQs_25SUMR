require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { GEMINI_MODEL_VERSION } = require('./config');

// Ensure the API key is loaded
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') { // Check if it's the placeholder
  console.error("FATAL: GEMINI_API_KEY is not set or is still the placeholder in environment variables.");
  throw new Error("GEMINI_API_KEY is not set or configured in environment variables.");
} else {
  console.log("Gemini API Key loaded successfully (theme-questions)."); // Confirm key is loaded on startup
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: GEMINI_MODEL_VERSION }); // Use a capable model
console.log(`Using Gemini model: ${model.model} (theme-questions)`);

// Helper function to extract JSON array from a string
function extractJsonArray(text) {
    if (!text) return null;
    console.log("Attempting to extract JSON array. Initial text snippet:", text.substring(0, 100)); // Log start

    // Remove markdown backticks first, be more lenient with whitespace
    let cleanedText = text.replace(/^```json\s*/, '').replace(/\s*```$/, '').trim();
    console.log("Text after removing backticks snippet:", cleanedText.substring(0, 100));

    // Find the first '[' and the last ']'
    const firstBracket = cleanedText.indexOf('[');
    const lastBracket = cleanedText.lastIndexOf(']');
    console.log(`Found first '[' at ${firstBracket}, last ']' at ${lastBracket}`);

    if (firstBracket === -1 || lastBracket === -1 || lastBracket < firstBracket) {
        // If no valid array structure is found, return the cleaned text
        // to let the original JSON.parse attempt handle it (and potentially fail with logs)
        console.warn("Could not find valid start/end brackets for JSON array extraction. Returning cleaned text.");
        return cleanedText;
    }

    // Extract the potential JSON array string
    const potentialJson = cleanedText.substring(firstBracket, lastBracket + 1);
    console.log("Extracted potential JSON string snippet:", potentialJson.substring(0, 100));
    return potentialJson;
}

module.exports = async (req, res) => {
  const functionStartTime = Date.now();
  console.log(`--- /api/theme-questions invoked (Timestamp: ${functionStartTime}) ---`);

  if (req.method !== 'POST') {
    console.warn(`Method Not Allowed: Received ${req.method} request.`);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Get theme from request body, provide default if missing
    const { notes, theme = 'Valorant agents and scenarios' } = req.body;
    console.log(`Received theme: "${theme}"`);

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

    // Updated Prompt: More explicit instructions for JSON output and escaping.
    const prompt = `Based *only* on the following extracted notes, generate a list of multiple-choice quiz items.

**CRITICAL INSTRUCTIONS:**
1.  The entire output MUST be a single, valid JSON array. Do NOT include any text, explanations, or markdown formatting (like \`\`\`json) before or after the JSON array.
2.  Each item in the array MUST be a JSON object strictly following this structure:
    {
      "name": "Concise Name/Topic",
      "story": "A short, engaging scenario themed around ${theme}. The scenario should subtly hint at the condition or topic. Ensure any double quotes (\") within this string are properly escaped as \\\".",
      "question": "A clear multiple-choice question based on the notes. Ensure any double quotes (\") within this string are properly escaped as \\\".",
      "answer": "The single correct answer. Ensure any double quotes (\") within this string are properly escaped as \\\".",
      "fullDetails": "<div class=\\\"details-title\\\">Explanation:</div><div class=\\\"details-content\\\">A detailed, straightforward, and student-friendly explanation of the answer. Make it as informative as possible, focusing on key facts, reasoning, and what distinguishes the correct answer from distractors. Use clear language and bullet points or short paragraphs for rapid review. Tailor the style to be direct and helpful for quick understanding, but include as much relevant detail as possible from the notes. All double quotes (\") within the HTML attributes or content MUST be escaped as \\\" for the JSON to be valid. Example: <div class=\\\"example\\\">Text with \\\"quotes\\\"</div>"
    }
3.  Ensure all string values within the JSON are correctly escaped, especially double quotes (\").

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
    let rawJsonOutput = response.text(); // Keep original raw response for full logging on error
    console.log("Received raw response from Gemini (theming). Length:", rawJsonOutput ? rawJsonOutput.length : 0);
    console.log("Raw response snippet (first 500 chars):", rawJsonOutput ? rawJsonOutput.substring(0, 500) : "N/A");

    // Attempt to extract the JSON array string more robustly
    console.log("Attempting to extract JSON array from raw AI response using helper function...");
    let jsonStringToParse = extractJsonArray(rawJsonOutput); // Use the helper function
    console.log("String to be parsed snippet (first 500 chars):", jsonStringToParse ? jsonStringToParse.substring(0, 500) : "N/A");

    // Validate and parse the JSON
    let themedQuestions;
    try {
        if (!jsonStringToParse) {
             throw new Error("Could not extract a potential JSON string from the AI response.");
        }
        console.log("Attempting to parse extracted/cleaned response as JSON...");
        themedQuestions = JSON.parse(jsonStringToParse); // Parse the potentially cleaner string

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
        console.error(rawJsonOutput); // Log the original raw response
        console.error('--- String Attempted to Parse ---');
        console.error(jsonStringToParse); // Log the string that failed parsing
        console.error('--- End Logs for Parse Error ---');
        // Return error to client
        return res.status(500).json({ error: 'Failed to parse themed questions from AI response', details: parseError.message, rawResponse: rawJsonOutput });
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
