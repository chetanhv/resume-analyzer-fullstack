// gemini.js
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function analyzeResume(text) {
  const model = genAI.getGenerativeModel({
    model: "models/gemini-1.5-flash-latest", // Fast & free
  });

  const prompt = `
    Analyze the following resume and provide:
    1. Key skills identified
    2. Suggestions for improvement
    3. Best job role match
    4. ATS score out of 100

    Resume:
    ${text}
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

module.exports = analyzeResume;
