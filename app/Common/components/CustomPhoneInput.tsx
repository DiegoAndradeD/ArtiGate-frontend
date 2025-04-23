"use client";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { styleClassName } from "..";
import type { VariantProps } from "class-variance-authority";
import { inputVariants } from "~/components/ui/input";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "~/components/ui/form";
import { LoaderCircle } from "lucide-react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

interface Props {
  name: string;
  label: string;
  classNames?: {
    container?: string;
    input?: string;
    label?: string;
    message?: string;
  };
  min?: string;
  disabled?: boolean;
  onChange?: (e: any) => void;
  placeholder?: string;
  isLoading?: boolean;
  variant?: VariantProps<typeof inputVariants>["variant"];
}

const CustomPhoneInput = ({
  name,
  label,
  classNames,
  min,
  disabled,
  onChange,
  placeholder,
  isLoading = false,
  variant,
}: Props) => {
  const [isFieldVisible, setIsFieldVisible] = useState(false);
  const { control } = useFormContext();

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
                  value={field.value}
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
