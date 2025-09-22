import { z } from "zod";

// Firebase-compatible user schema
export const insertUserSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = InsertUser & {
  id: string;
};
