import { toast } from "react-toastify";

export const handleErrorToast = (action: string, error: unknown) => {
  console.log("here ", error);
  const message = error instanceof Error ? error.message : "Erro desconhecido";
  toast.error(`Erro ao ${action}: ${message}`);
};
