import type { Address } from "./Address";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  badgeUrl: string;
  homeAddress: Address;
  jobAddress: Address;
}
