// src/services/UserService.ts
import axios from "axios";
import type { userRegistrationFormData } from "../schemas/subscription-schema";

const BASE_URL = "http://localhost:3000/users";

export class UserService {
  static async getAll() {
    const res = await axios.get(BASE_URL);
    return res.data;
  }

  static async getById(id: string) {
    const res = await axios.get(`${BASE_URL}/${id}`);
    return res.data;
  }

  static async create(data: userRegistrationFormData) {
    const res = await axios.post(BASE_URL, data);
    return res.data;
  }

  static async delete(id: string) {
    const res = await axios.delete(`${BASE_URL}/${id}`);
    return res.data;
  }
}
