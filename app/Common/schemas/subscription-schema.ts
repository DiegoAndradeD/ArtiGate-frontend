import { z } from "zod";
import { isAfter, lastDayOfMonth } from "date-fns";
import { Role } from "../enums/Role";

const addressSchema = z.object({
  zipCode: z
    .string({ required_error: "Campo obrigatório." })
    .min(1, "CEP é obrigatório"),
  street: z
    .string({ required_error: "Campo obrigatório." })
    .min(1, "Rua é obrigatória"),
  complement: z.string().optional(),
  neighborhood: z
    .string({ required_error: "Campo obrigatório." })
    .min(1, "Bairro é obrigatório"),
  city: z
    .string({ required_error: "Campo obrigatório." })
    .min(1, "Cidade é obrigatória"),
  state: z
    .string({ required_error: "Campo obrigatório." })
    .min(1, "Estado é obrigatório"),
  country: z.string({ required_error: "Campo obrigatório." }),
});

const paymentSchema = z
  .object({
    cardNumber: z
      .string({ required_error: "Campo obrigatório." })
      .regex(/^\d{13,19}$/, "Número do cartão inválido"),
    cardHolderName: z
      .string({ required_error: "Campo obrigatório." })
      .min(1, "Nome no cartão é obrigatório"),
    expiration: z.date({
      required_error: "Data de expiração é obrigatória",
      invalid_type_error: "Data de expiração inválida",
    }),
    cvv: z
      .string({ required_error: "Campo obrigatório." })
      .regex(/^\d{3,4}$/, "CVV inválido"),
  })
  .refine(({ expiration }) => isAfter(expiration, new Date()), {
    message: "Cartão expirado",
    path: ["expiration"],
  });

export const userRegistrationSchema = z.object({
  name: z
    .string({ required_error: "Campo obrigatório." })
    .min(1, "Nome é obrigatório"),
  phone: z
    .string({ required_error: "Campo obrigatório." })
    .min(1, "Telefone é obrigatório"),
  email: z
    .string({ required_error: "Campo obrigatório." })
    .email("E-mail inválido"),
  badgeUrl: z
    .string({ required_error: "Campo obrigatório." })
    .min(1, "Número do crachá é obrigatório"),

  homeAddress: addressSchema,
  jobAddress: addressSchema,

  roles: z.array(z.nativeEnum(Role)).min(1, "Selecione pelo menos um papel"),

  paymentInfo: paymentSchema,
});

export type userRegistrationFormData = z.infer<typeof userRegistrationSchema>;
