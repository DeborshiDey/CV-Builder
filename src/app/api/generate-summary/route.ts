import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
    try {
        const { cvData, jobDescription } = await req.json();

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json(
                { error: "GEMINI_API_KEY is not set" },
                { status: 500 }
            );
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `
      You are an expert CV writer. Your task is to write or rewrite a "Professional Summary" for a CV.
      
      CANDIDATE PROFILE:
      Experience: ${JSON.stringify(cvData.experience)}
      Skills: ${cvData.skills.join(", ")}
      Current Summary: ${cvData.personalInfo.summary}

      TARGET JOB (Optional):
      ${jobDescription || "Not specified"}

      INSTRUCTIONS:
      1. Write a professional, impactful, and concise summary (3-5 sentences).
      2. Highlight key achievements and skills from the candidate's profile.
      3. If a target job is provided, tailor the summary to align with its requirements.
      4. Use active voice and professional tone.
      5. Return ONLY the summary text. Do not include "Here is the summary:" or quotes.
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const summary = response.text().trim();

        return NextResponse.json({ summary });
    } catch (error) {
        console.error("Error generating summary:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Failed to generate summary" },
            { status: 500 }
        );
    }
}
