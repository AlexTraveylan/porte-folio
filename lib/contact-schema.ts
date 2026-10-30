import * as z from "zod"
import { CALC_RUSH_TOPICS } from "./calc-rush"

export const contactPayloadSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(254),
  message: z.string().min(10).max(5000),
  topic: z.enum(CALC_RUSH_TOPICS).optional(),
})
