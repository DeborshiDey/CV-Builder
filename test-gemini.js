const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');

async function testGemini() {
    // Load API key from .env.local manually since dotenv is not installed
    let apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        try {
            const envFile = fs.readFileSync('.env.local', 'utf8');
            const match = envFile.match(/GEMINI_API_KEY=(.*)/);
            if (match) {
                apiKey = match[1].trim();
            }
        } catch (e) {
            // Ignore error if file doesn't exist
        }
    }

    if (!apiKey) {
        console.error("Error: GEMINI_API_KEY not found in environment or .env.local");
        process.exit(1);
    }

    console.log("Testing Gemini API with gemini-2.0-flash...");

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = "Write a one-sentence professional summary for a software engineer.";

        console.log("Sending prompt:", prompt);

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        console.log("\nSUCCESS! API Response:");
        console.log(text);
    } catch (error) {
        fs.writeFileSync('error.log', error.toString() + "\n" + JSON.stringify(error, null, 2));
        console.error("\nFAILED. Error details written to error.log");
        process.exit(1);
    }
}

testGemini();
