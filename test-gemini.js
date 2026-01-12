const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');

async function testGemini() {
    const apiKey = "AIzaSyBTbA5v1fekuqwVH46kTUzfRSpSfBEk740";

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
