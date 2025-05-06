export interface Address {
  id: string;
  zipCode: string;
  street: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
}
