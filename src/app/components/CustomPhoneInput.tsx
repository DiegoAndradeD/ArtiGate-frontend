"use client";
import { Controller, useFormContext } from "react-hook-form";
import type { VariantProps } from "class-variance-authority";

import { LoaderCircle } from "lucide-react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { inputVariants } from "@/components/ui/input";
import styleClassName from "../utils/styleClassName";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

interface Props {
  name: string;
  label: string;
  classNames?: {
    container?: string;
    input?: string;
    label?: string;
    message?: string;
  };
  disabled?: boolean;
  isLoading?: boolean;
  variant?: VariantProps<typeof inputVariants>["variant"];
}

const CustomPhoneInput = ({
  name,
  label,
  classNames,
  disabled,
  isLoading = false,
}: Props) => {
  const { control } = useFormContext();
  function cleanPhoneNumber(raw: string): string | undefined {
    try {
      // Remove extensões como "x123", "ext. 123", etc.
      const base = raw.split(/x|ext/i)[0].trim();
      const digits = base.replace(/\D/g, "");

      // Assume que é dos EUA se começar com 1 e tiver 11 dígitos
      if (digits.length === 11 && digits.startsWith("1")) {
        return `+${digits}`;
      }

      // Brasil? Ajuste conforme necessidade
      if (digits.length === 11 && digits.startsWith("55")) {
        return `+${digits}`;
      }

      return `+${digits}`;
    } catch {
      return undefined;
    }
  }

  return (
    <div className={styleClassName("relative w-full ", classNames?.container)}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <FormItem>
            <FormLabel
              className={styleClassName(
                "font-normal text-sm",
                classNames?.label
              )}
            >
              {label}
            </FormLabel>
            <FormControl>
              <div className="relative">
                <PhoneInput
                  placeholder="Digite o número de telefone"
                  value={cleanPhoneNumber(field.value)}
                  onChange={field.onChange}
                  defaultCountry="BR"
                  disabled={disabled}
                  className={styleClassName(
                    `border border-primary rounded-md pl-3 phone-input h-10`,
                    classNames?.input
                  )}
                />
                {isLoading && (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <LoaderCircle className="animate-spin" />
                  </span>
                )}
              </div>
            </FormControl>
            {error && (
              <FormMessage className={styleClassName(classNames?.message)}>
                {error.message}
              </FormMessage>
            )}
          </FormItem>
        )}
      />
    </div>
  );
};

export default CustomPhoneInput;
