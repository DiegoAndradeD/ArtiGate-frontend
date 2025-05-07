"use client";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

import type { VariantProps } from "class-variance-authority";

import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { Input, inputVariants } from "@/components/ui/input";
import styleClassName from "../utils/styleClassName";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  isContentHideable?: boolean;
  classNames?: {
    container?: string;
    input?: string;
    label?: string;
    message?: string;
  };
  isLoading?: boolean;
  variant?: VariantProps<typeof inputVariants>["variant"];
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
}

const CustomFormInput = ({
  name,
  label,
  type = "text",
  isContentHideable,
  classNames,
  isLoading = false,
  variant,
  startContent,
  endContent,
  ...rest
}: Props) => {
  const [isFieldVisible, setIsFieldVisible] = useState(false);
  const { control } = useFormContext();

  const visibilityType =
    isContentHideable && isFieldVisible ? "text" : "password";

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
                <Input
                  {...field}
                  value={field.value ?? ""}
                  type={isContentHideable ? visibilityType : type}
                  className={styleClassName(
                    `bg-transparent border-primary ${
                      isContentHideable ? "pr-10" : ""
                    }`,
                    classNames?.input
                  )}
                  {...rest}
                  variant={variant}
                  startContent={startContent}
                  endContent={endContent}
                  onChange={(value) => {
                    field.onChange(value);
                    rest.onChange?.(value);
                  }}
                />
                {isLoading && (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <LoaderCircle className="animate-spin" />
                  </span>
                )}

                {isContentHideable && !isLoading && (
                  <span
                    onClick={() => setIsFieldVisible(!isFieldVisible)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                  >
                    {isFieldVisible ? <Eye /> : <EyeOff />}
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

export default CustomFormInput;
