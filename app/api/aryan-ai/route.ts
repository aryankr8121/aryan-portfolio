import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import data from "../../data/aryan.json";

// Read the API key once and log a safe debug message (do NOT print the key itself).
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.warn("GEMINI_API_KEY is not set. AI requests will likely fail.");
} else {
  // Log only presence and length to help debug without exposing the secret
  console.debug(`GEMINI_API_KEY present: true, length=${apiKey.length}`);
}

const genAI = new GoogleGenerativeAI(apiKey!);

export async function POST(req: Request) {
  try {
    const { query } = await req.json();

    // ✅ current model name for free-tier keys
    // ✅ FIX:
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

    const prompt = `
Ai version of aryan, an embedded systems engineer. Use the following JSON  data about aryan to answer the user's query.
Data:
${JSON.stringify(data, null, 2)}

User: ${query}

If someone asks about Aryan's:
- skills → summarize categories.
- projects → show project names + short summaries.
- experience → list companies and what was done there.
- education → mention degree and college.
Be confident, friendly,funny, and write naturally like Aryan himself would.
`;



    // ✅ new API call pattern
    const result = await model.generateContent(prompt);
    const reply = result.response?.text ? result.response.text() : String(result);

    // Include safe debug info only in non-production environments
    if (process.env.NODE_ENV !== "production") {
      return NextResponse.json({ reply, debug: { geminiApiKeyPresent: !!apiKey } });
    }

    return NextResponse.json({ reply });
  } catch (err: any) {
    console.error("AI Error:", err);
    const errorReply = "⚠️ Gemini API error — check model name or key.";

    if (process.env.NODE_ENV !== "production") {
      return NextResponse.json({ reply: errorReply, error: err?.message, debug: { geminiApiKeyPresent: !!apiKey } });
    }

    return NextResponse.json({ reply: errorReply });
  }
}
