import { z } from "zod";
import { isAfter, lastDayOfMonth } from "date-fns";
import { Role } from "../enums/Role";

const addressSchema = z.object({
  zipCode: z.string().min(1, "CEP é obrigatório"),
  street: z.string().min(1, "Rua é obrigatória"),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, "Bairro é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  state: z.string().min(1, "Estado é obrigatório"),
  country: z.string(),
});

const paymentSchema = z
  .object({
    cardNumber: z.string().regex(/^\d{13,19}$/, "Número do cartão inválido"),
    cardHolderName: z.string().min(1, "Nome no cartão é obrigatório"),
    expirationMonth: z
      .number({ invalid_type_error: "Mês deve ser um número" })
      .min(1, "Mês inválido")
      .max(12, "Mês inválido"),
    expirationYear: z
      .number({ invalid_type_error: "Ano deve ser um número" })
      .min(24, "Ano inválido")
      .max(99, "Ano inválido"),
    cvv: z.string().regex(/^\d{3,4}$/, "CVV inválido"),
  })
  .refine(
    ({ expirationMonth, expirationYear }) => {
      const fullYear = 2000 + expirationYear;
      const expiration = lastDayOfMonth(
        new Date(fullYear, expirationMonth - 1)
      );
      return isAfter(expiration, new Date());
    },
    {
      message: "Cartão expirado",
      path: ["expirationMonth", "expirationYear"],
    }
  );

export const userRegistrationSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  phone: z.string().min(1, "Telefone é obrigatório"),
  email: z.string().email("E-mail inválido"),
  badgeUrl: z.string().url("URL do crachá inválida"),

  homeAddress: addressSchema,
  jobAddress: addressSchema,

  roles: z.array(z.nativeEnum(Role)).min(1, "Selecione pelo menos um papel"),

  paymentInfo: paymentSchema,
});

export type userRegistrationFormData = z.infer<typeof userRegistrationSchema>;
