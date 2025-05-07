import axios from "axios";
import type { userRegistrationFormData } from "../schemas/subscription-schema";
import type { LoginFormData } from "../schemas/login-schema";

const BASE_URL = "http://localhost:3000";

class UserService {
  static async getAll() {
    const res = await axios.get(`${BASE_URL}/users`);
    return res.data;
  }

  static async getById(id: string) {
    const res = await axios.get(`${BASE_URL}/users/${id}`);
    return res.data;
  }

  static async create(data: userRegistrationFormData) {
    const res = await axios.post(`${BASE_URL}/users`, data);
    return res.data;
  }

  static async delete(id: string) {
    const res = await axios.delete(`${BASE_URL}/users/${id}`);
    return res.data;
  }

  static async login(data: LoginFormData) {
    const res = await axios.post(`${BASE_URL}/auth/login`, data);
    return res.data;
  }
}

export default UserService;
