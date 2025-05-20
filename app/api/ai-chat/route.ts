import { NextResponse } from "next/server"
import OpenAI from "openai"
import type { CharacterData } from "@/lib/types"
import { generateEnhancedSystemPrompt } from "@/lib/ai/prompt-engineering"

// Initialize OpenAI client with error handling
let openai: OpenAI | null = null
try {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "",
  })
} catch (error) {
  console.error("Failed to initialize OpenAI client:", error)
}

interface Message {
  role: "user" | "assistant"
  content: string
}

export async function POST(request: Request) {
  try {
    // Check if OpenAI client is initialized
    if (!openai) {
      console.error("OpenAI client not initialized")
      return NextResponse.json(
        {
          error: "OpenAI client not initialized",
          response:
            "I'm having trouble connecting right now. Please try again later or use the suggestions above for inspiration.",
        },
        { status: 200 },
      )
    }

    // Parse request body with error handling
    let characterData: CharacterData
    let currentStep: string
    let subStep: string | null = null
    let messages: Message[] = []

    try {
      const body = await request.json()
      characterData = body.characterData
      currentStep = body.currentStep
      subStep = body.subStep || null
      messages = body.messages || []

      if (!characterData || !currentStep || !messages.length) {
        throw new Error("Missing required fields")
      }
    } catch (error) {
      console.error("Error parsing request:", error)
      return NextResponse.json(
        {
          error: "Invalid request data",
          response: "I couldn't understand your request. Please try again.",
        },
        { status: 200 },
      )
    }

    // Generate enhanced system prompt
    const systemPrompt = generateEnhancedSystemPrompt({
      characterData,
      currentStep,
      subStep,
      // For chat, we want more comprehensive lore
      maxTokens: 3000,
    })

    // Format messages for OpenAI API
    const apiMessages = [
      { role: "system", content: systemPrompt },
      ...messages.map((msg) => ({
        role: msg.role === "user" ? ("user" as const) : ("assistant" as const),
        content: msg.content,
      })),
    ]

    // Call OpenAI API with timeout
    try {
      const response = (await Promise.race([
        openai.chat.completions.create({
          model: "gpt-4o",
          messages: apiMessages,
          temperature: 0.7,
          max_tokens: 500,
        }),
        new Promise((_, reject) => setTimeout(() => reject(new Error("OpenAI API timeout")), 10000)),
      ])) as OpenAI.Chat.Completions.ChatCompletion

      const aiResponse =
        response.choices[0].message.content ||
        "I'm not sure how to respond to that. Could you try asking in a different way?"

      return NextResponse.json({ response: aiResponse })
    } catch (error) {
      console.error("Error calling OpenAI API:", error)
      return NextResponse.json(
        {
          error: "Failed to generate response",
          response:
            "I'm having trouble connecting right now. Please try again or use the suggestions above for inspiration.",
        },
        { status: 200 },
      )
    }
  } catch (error) {
    console.error("Unhandled error in AI chat route:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        response: "Something went wrong. Please try again later.",
      },
      { status: 200 },
    )
  }
}
