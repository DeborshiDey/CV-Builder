import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { CVData } from "@/lib/types";

export async function POST(req: Request) {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json(
                { error: "GEMINI_API_KEY is not configured" },
                { status: 500 }
            );
        }

        const { cvData }: { cvData: CVData } = await req.json();
        const { personalInfo, experience, skills, targetJob } = cvData;

        if (!targetJob.description) {
            return NextResponse.json(
                { error: "Target job description is missing" },
                { status: 400 }
            );
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const prompt = `
      You are an expert CV writer. Your task is to tailor a CV for a specific job description.
      
      TARGET JOB:
      Company: ${targetJob.company}
      Position: ${targetJob.position}
      Description: ${targetJob.description}

      CURRENT CV DATA:
      Summary: ${personalInfo.summary}
      Experience: ${JSON.stringify(experience)}
      Skills: ${skills.join(", ")}

      INSTRUCTIONS:
      1. Rewrite the "Professional Summary" to be impactful and aligned with the target job.
      2. Rewrite the "Description" for each experience item to highlight relevant achievements and keywords from the job description. Keep them concise and action-oriented.
      3. Suggest a list of "Skills" that are relevant to the job and match the candidate's profile.
      
      OUTPUT FORMAT:
      Return ONLY a valid JSON object with the following structure:
      {
        "summary": "New professional summary...",
        "experience": [
          { "id": "same_id_as_input", "description": "New description..." }
        ],
        "skills": ["Skill 1", "Skill 2", ...]
      }
      Do not include markdown formatting or explanations.
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean up markdown code blocks if present
        const jsonString = text.replace(/```json\n|\n```/g, "").trim();
        const tailoredData = JSON.parse(jsonString);

        return NextResponse.json(tailoredData);
    } catch (error) {
        console.error("Error tailoring CV:", error);
        return NextResponse.json(
            { error: "Failed to tailor CV" },
            { status: 500 }
        );
    }
}
