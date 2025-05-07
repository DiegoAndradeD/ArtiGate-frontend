import { z } from "zod";

export const loginSchema = z.object({
  badgeUrl: z
    .string({ required_error: "Campo obrigatório." })
    .min(4, {
      message: "O número de inscrição deve ter no máximo 4 caracteres.",
    })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "O número de inscrição deve ser alfanumérico.",
    })
    .max(8, {
      message: "O número de inscrição deve ter no máximo 8 caracteres.",
    }),

  email: z
    .string()
    .email({ message: "O e-mail fornecido não é válido." })
    .min(1, { message: "O e-mail é obrigatório." }),
});

export type LoginFormData = z.infer<typeof loginSchema>;
