import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const feedbackSchema = z.object({
  id: z.string(),
  thumbnail: z.string(),
  genre: z.string(),
  title: z.string(),
  profileImage: z.string(),
  nickname: z.string(),
  status: z.string(),
  createDate: z.string(),
});

export type Feedback = z.infer<typeof feedbackSchema>;
