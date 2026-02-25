import { GoogleGenerativeAI } from "@google/generative-ai";
import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
    try {
        const { role, level } = await req.json();

        if (!role || !level) {
            return NextResponse.json(
                { error: "Role and level are required" },
                { status: 400 }
            );
        }

        const prompt = `You are an expert technical interviewer. Generate 6 high-quality interview questions for a ${level} level ${role} position.

Requirements:
- Mix of technical, behavioral, and problem-solving questions
- Questions should be clear, specific, and relevant to the role
- Appropriate difficulty for ${level} level
- Return ONLY a JSON array of strings, no markdown, no explanation
- Example format: ["Question 1?", "Question 2?", "Question 3?"]

Generate the questions now:`;

        let text;
        try {
            // Primary: Groq (Llama 3.3 70B)
            const completion = await groq.chat.completions.create({
                messages: [
                    {
                        role: "user",
                        content: prompt,
                    },
                ],
                model: "llama-3.3-70b-versatile",
            });
            text = completion.choices[0]?.message?.content || "";
        } catch (groqError: any) {
            console.warn("Groq failed, falling back to Gemini:", groqError);
            try {
                // Fallback: Gemini
                const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
                const result = await model.generateContent(prompt);
                text = result.response.text().trim();
            } catch (geminiError: any) {
                console.error("Gemini fallback also failed:", geminiError);
                throw new Error(`AI generation failed. Groq error: ${groqError.message}. Gemini error: ${geminiError.message}`);
            }
        }

        // Extract JSON array from the response
        const jsonMatch = text.match(/\[[\s\S]*\]/);
        if (!jsonMatch) {
            console.error("AI response did not contain JSON:", text);
            throw new Error("Invalid response format from AI. It didn't return a list of questions.");
        }

        const questions: string[] = JSON.parse(jsonMatch[0]);

        return NextResponse.json({ questions });
    } catch (error: any) {
        console.error("Error generating questions:", error);
        return NextResponse.json(
            { error: error?.message || "Failed to generate questions. Please try again." },
            { status: 500 }
        );
    }
}
