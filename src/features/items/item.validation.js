import {z} from "zod";

export const createItemSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required"),

  type: z
    .enum(["Lost", "Found"], {
      error: "Type must be either Lost or Found"
    }),

  location: z
    .string()
    .trim()
    .min(1, "Location is required"),

  contactMethod: z
    .string()
    .trim()
    .min(1, "Contact method is required"),

  date: z
    .iso
    .datetime({offset: true})                  //for handling timezone offsets (+05:30)
    .optional(),

  description: z
    .string()
    .trim()
    .optional(),
});