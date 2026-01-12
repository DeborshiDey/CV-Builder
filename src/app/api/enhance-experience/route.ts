import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "");
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function POST(request: Request) {
    if (!apiKey) {
        return NextResponse.json(
            { error: "GEMINI_API_KEY is not set" },
            { status: 500 }
        );
    }

    try {
        const { company, position, description } = await request.json();

        if (!description) {
            return NextResponse.json(
                { error: "Description is required" },
                { status: 400 }
            );
        }

        const prompt = `
      You are an expert professional resume writer. Rewrite and enhance the following job description for a CV.
      
      CONTEXT:
      Role: ${position}
      Company: ${company}
      
      ORIGINAL DESCRIPTION:
      ${description}
      
      INSTRUCTIONS:
      1. Rewrite the description into 3-5 punchy, impact-focused bullet points.
      2. Start each bullet point with a strong action verb (e.g., "Spearheaded", "Developed", "Optimized").
      3. Quantify achievements where possible (even if you have to use placeholders like "[X]%").
      4. Focus on results and impact, not just duties.
      5. Keep it professional, concise, and ATS-friendly.
      6. Do NOT include any introductory or concluding text. Just the bullet points.
      
      OUTPUT FORMAT:
      Return ONLY the bullet points, each on a new line, starting with "• ".
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const enhancedDescription = response.text().trim();

        return NextResponse.json({ enhancedDescription });
    } catch (error) {
        console.error("Error enhancing experience:", error);
        return NextResponse.json(
            { error: "Failed to enhance experience" },
            { status: 500 }
        );
    }
}
