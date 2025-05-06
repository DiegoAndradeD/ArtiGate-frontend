// ~/utils/generateFakeUserData.ts
import { faker } from "@faker-js/faker";
import type { userRegistrationFormData } from "../schemas/subscription-schema";
import { Role } from "../enums/Role";

export const generateFakeUserData = (): userRegistrationFormData => ({
  name: faker.person.fullName(),
  email: faker.internet.email(),
  phone: faker.phone.number({ style: "human" }),
  badgeUrl: faker.image.avatar(),
  roles: faker.helpers.arrayElements(
    Object.values(Role),
    faker.number.int({ min: 1, max: 2 })
  ),
  homeAddress: {
    zipCode: faker.location.zipCode(),
    street: faker.location.street(),
    complement: faker.location.secondaryAddress(),
    neighborhood: faker.location.city(),
    city: faker.location.city(),
    state: faker.location.state(),
    country: faker.location.country(),
  },
  jobAddress: {
    zipCode: faker.location.zipCode(),
    street: faker.location.street(),
    complement: faker.location.secondaryAddress(),
    neighborhood: faker.location.city(),
    city: faker.location.city(),
    state: faker.location.state(),
    country: faker.location.country(),
  },
  paymentInfo: {
    cardNumber: faker.finance.creditCardNumber("visa").replace(/\D/g, ""),
    cardHolderName: faker.person.fullName(),
    expiration: faker.date.future(), // pode ajustar formato conforme necessário
    cvv: faker.finance.creditCardCVV(),
  },
});
