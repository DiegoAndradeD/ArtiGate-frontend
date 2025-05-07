"use server";
import { cookies } from "next/headers";
import { User } from "../types/User";

class AuthService {
  static async setAuthCookies(user: User, token: string) {
    const cookieStore = await cookies();

    cookieStore.set("auth_token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    cookieStore.set("auth_user", JSON.stringify(user), {
      httpOnly: false,
      path: "/",
      maxAge: 60 * 60 * 24,
    });
  }
}

export default AuthService;
