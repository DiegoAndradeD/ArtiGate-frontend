"use client";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { styleClassName } from "..";
import type { VariantProps } from "class-variance-authority";
import { Input, inputVariants } from "~/components/ui/input";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "~/components/ui/form";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";

interface Props {
  name: string;
  label: string;
  type: string;
  isContentHideable?: boolean;
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

const CustomFormInput = ({
  name,
  label,
  type,
  isContentHideable,
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
                  type={isContentHideable ? visibilityType : type}
                  className={styleClassName(
                    `bg-transparent border-primary ${
                      isContentHideable ? "pr-10" : ""
                    }`,
                    classNames?.input
                  )}
                  disabled={disabled}
                  placeholder={placeholder}
                  min={min}
                  variant={variant}
                  onChange={(e) => {
                    field.onChange(e);
                    if (onChange) onChange(e.target.value);
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
