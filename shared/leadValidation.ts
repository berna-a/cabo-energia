import { z } from "zod";

export const validPhone = (value: string) =>
  /^[0-9 +()-]{7,20}$/.test(value.trim()) &&
  value.replace(/\D/g, "").length >= 7;

export const leadSchema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().refine(validPhone),
  client_type: z.enum(["residencial", "empresarial"]),
  source: z.string().trim().min(1).max(120),
  ilha: z.string().trim().max(60).optional(),
  request_id: z.string().uuid(),
  fields: z.array(z.object({
    chave: z.string().trim().min(1).max(60),
    valor: z.union([z.string().max(300), z.number().finite(), z.boolean()]),
  })).max(20).default([]),
});

export type LeadInput = z.infer<typeof leadSchema>;
