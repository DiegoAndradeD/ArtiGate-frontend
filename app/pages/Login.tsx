import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CustomFormInput } from "~/Common";
import { loginSchema, type LoginFormData } from "~/Common/schemas/login-schema";
import { useUserStore } from "~/Common/stores/user.store";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";

const Login = () => {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const { loginUser } = useUserStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  const onSubmit = async (data: LoginFormData) => {
    await loginUser(data);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <CustomFormInput
              name={"badgeUrl"}
              label={"Número de inscrição"}
              type="text"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm
                 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Número de inscrição"
              required
              minLength={4}
              maxLength={8}
            />

            <CustomFormInput
              name={"email"}
              label={"Email"}
              type="email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm
                 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Email"
              required
            />

            <Button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Entrar
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
