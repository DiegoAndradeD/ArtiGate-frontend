import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const styleClassName = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export default styleClassName;
