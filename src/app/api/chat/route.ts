import { bookFlightTool } from "@/tools/book-flight-tool";
import { bookHotelTool } from "@/tools/book-hotel-tool";
import { generateFormTool } from "@/tools/generate-form-tool";
import { deepseek } from "@ai-sdk/deepseek";
import { convertToModelMessages, stepCountIs, streamText, UIMessage } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: deepseek("deepseek-chat"),
    system:
      "When users request any service that requires information collection, prioritize using the generateForm tool to create appropriate forms. Forms should match the input requirements of relevant service tools for seamless integration.",
    messages: convertToModelMessages(messages),
    stopWhen: stepCountIs(5),
    tools: {
      generateForm: generateFormTool,
      bookFlight: bookFlightTool,
      bookHotel: bookHotelTool,
    },
  });

  return result.toUIMessageStreamResponse();
}
