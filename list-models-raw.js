const fs = require('fs');

// Load API key from .env.local manually
let apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    try {
        const envFile = fs.readFileSync('.env.local', 'utf8');
        const match = envFile.match(/GEMINI_API_KEY=(.*)/);
        if (match) {
            apiKey = match[1].trim();
        }
    } catch (e) {
        // Ignore error
    }
}

if (!apiKey) {
    console.error("Error: GEMINI_API_KEY not found");
    process.exit(1);
}

async function listModels() {
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

    console.log("Fetching models from:", url);

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            console.error("API Error:", data);
            process.exit(1);
        }

        fs.writeFileSync('models.json', JSON.stringify(data, null, 2));
        console.log("Models written to models.json");

    } catch (error) {
        console.error("Fetch Error:", error);
        process.exit(1);
    }
}

listModels();
