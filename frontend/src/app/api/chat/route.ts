import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "OpenRouter API Key not configured" },
        { status: 500 }
      );
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "DigitalHub AI Solutions",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat", // Fast and good for Urdu/English
        messages: [
          {
            role: "system",
            content: `You are the DigitalHub AI Core, the official AI agent for 'DigitalHub AI Solutions'.
            Our services: Agentic AI Solutions, Web Development, Digital Marketing, and Strategy.
            Tone: Professional, futuristic, and helpful.
            Languages: Support both English and Urdu (Roman Urdu or Script) naturally.
            
            Key Rule 1: If the client asks about pricing, cost, or 'paisa', answer that you are synchronizing with the Lead Consultant for a custom quote, and they will be contacted shortly.
            Key Rule 2: Be proactive in explaining how our AI solutions can scale their business.
            Key Rule 3: Do not give rote (rata rataya) responses. Be dynamic and context-aware.`
          },
          ...messages
        ],
      }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
