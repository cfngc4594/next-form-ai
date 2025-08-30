import { tool } from "ai";
import { z } from "zod";

export const bookHotelTool = tool({
  description: "Book a hotel room with the provided details.",
  inputSchema: z.object({
    city: z.string().describe("The city where the hotel is located."),
    checkInDate: z.string().describe("The check-in date."),
    checkOutDate: z.string().describe("The check-out date."),
    guests: z.number().min(1).describe("The number of guests."),
  }),
  execute: async (details) => {
    console.log(
      `Booking hotel in ${details.city} for ${details.guests} guests.`
    );
    return {
      success: true,
      message: `Hotel in ${details.city} booked successfully!`,
    };
  },
});
