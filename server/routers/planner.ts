import { z } from "zod";
import { invokeLLM } from "../_core/llm";
import { publicProcedure, router } from "../_core/trpc";

const plannerMessage = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().trim().min(1).max(2000),
});

export const plannerRouter = router({
  plan: publicProcedure.input(z.object({ messages: z.array(plannerMessage).min(1).max(12) })).mutation(async ({ input }) => {
    const result = await invokeLLM({
      model: "gpt-5-mini",
      messages: [
        {
          role: "system",
          content: "You are the King Solomon Tours and Travels trip planner. Help travelers describe their ideal Kenya trip in natural language and return a concise, personalized multi-day itinerary. When appropriate, mention Lake Victoria boat rides to Takawiri Island, Mfangano, or Mbasa Island as experience options. Use exactly the headings: Trip concept, Day-by-day plan, Suggested experiences, Practical notes. Never claim real-time availability, live prices, verified operator status, or booking confirmation. Present all costs as estimates and encourage users to send a booking inquiry or call +254 720 607010 to confirm arrangements.",
        },
        ...input.messages,
      ],
      reasoning: { effort: "low" },
      maxTokens: 1100,
    });
    const content = result.choices[0]?.message?.content;
    if (typeof content !== "string" || !content.trim()) throw new Error("The trip planner did not return a response.");
    return { content };
  }),
});
