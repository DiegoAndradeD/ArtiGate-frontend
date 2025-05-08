import { z } from "zod";

export const reviewSchema = z.object({
  reviewerId: z.string().uuid({ message: "ID do revisor inválido" }),
  articleId: z.string().uuid({ message: "ID do artigo inválido" }),
  score: z
    .number({ invalid_type_error: "A nota deve ser um número" })
    .min(0, { message: "Nota mínima é 0" })
    .max(5, { message: "Nota máxima é 5" }),
  commentary: z.string().min(1, { message: "Comentário é obrigatório" }),
});

export type ReviewFormData = z.infer<typeof reviewSchema>;
