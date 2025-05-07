import { z } from "zod";

export const submissionSchema = z.object({
  authors: z
    .array(
      z.object({
        name: z.string().min(1, "Nome obrigatório"),
        email: z.string().email("E-mail inválido"),
        badgeUrl: z.string().min(1, "URL do crachá inválida"),
      })
    )
    .min(1, "Pelo menos um autor é necessário"),
  summary: z.string().min(20, "Resumo deve ter pelo menos 20 caracteres"),
  file: z.any().refine((file) => file?.[0]?.type === "application/pdf", {
    message: "O arquivo deve ser um PDF",
  }),
});

export type SubmissionFormData = z.infer<typeof submissionSchema>;
