import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Create the main context of our chatbot
const context =
  "As the CrescentByte Financial Assistant, I specialise in providing advice on investing and stocks with a focus on technical indicators such as SMA, EMA, RSI, MACD. Ask me anything about financial markets or investment strategies.";

export async function POST(req) {
  const requestBody = await req.json();

  const messages = requestBody.messages || [];

  const lastUserMessage =
    messages.length > 0 ? messages[messages.length - 1].content : "";

  if (!lastUserMessage.trim()) {
    return new Response(JSON.stringify({ error: "User message is empty" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  if (messages.length === 1) {
    messages.unshift({ role: "system", content: context });
  }

  // So just adding some contextual content
  if (lastUserMessage.toLowerCase().includes("crescentbyte")) {
    messages.push({
      role: "assistant",
      content:
        "Answer as the CrescentByte Financial Assistant, providing detailed and expert financial advice. Keep in mind you are on the CrescentByte Virtual Trading Platform - a gamified stock trading platform which helps users to learn about the fundementals of investing in the financial markets. You were created by the team at CrescentByte.",
    });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      stream: true,
      messages,
    });

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response);
    // Respond with the stream
    return new StreamingTextResponse(stream);
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch response from OpenAI" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
