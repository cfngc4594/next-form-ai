import { tool } from "ai";
import { z } from "zod";

export const bookFlightTool = tool({
  description: "Book a flight with departure city, destination city, and date.",
  inputSchema: z.object({
    from: z.string().describe("The departure city."),
    to: z.string().describe("The arrival city."),
    date: z.string().describe("The date of the flight."),
  }),
  execute: async ({ from, to, date }) => {
    console.log(`Booking flight from ${from} to ${to} on ${date}`);
    return {
      success: true,
      message: `Flight from ${from} to ${to} on ${date} booked successfully!`,
    };
  },
});
