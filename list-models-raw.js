const apiKey = "AIzaSyBTbA5v1fekuqwVH46kTUzfRSpSfBEk740";
const fs = require('fs');

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
