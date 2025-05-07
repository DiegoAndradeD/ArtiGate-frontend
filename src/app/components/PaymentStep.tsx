import { useFormContext } from "react-hook-form";
import { CreditCard, User, Lock, CalendarIcon } from "lucide-react";

import { format } from "date-fns";
import CreditCardPreview from "./CreditCardPreview";
import CustomFormInput from "./CustomFormInput";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

interface Props {
  isValid: boolean;
  onNext: () => void;
  onPrev: () => void;
}

const PaymentStep = ({ isValid, onNext, onPrev }: Props) => {
  const { control, watch, setValue } = useFormContext();
  const paymentCardNumber = watch("paymentInfo.cardNumber");
  const paymentCardHolderName = watch("paymentInfo.cardHolderName");
  const paymentCvv = watch("paymentInfo.cvv");
  const paymentExpiration = watch("paymentInfo.expiration");

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    setValue("paymentInfo.cardNumber", raw);
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Pagamento</h1>
      <div className="grid grid-cols-2 gap-4">
        <CreditCardPreview
          cardNumber={paymentCardNumber}
          cardHolderName={paymentCardHolderName}
          expiration={paymentExpiration}
          cvv={paymentCvv}
        />
        <div className="flex flex-col gap-4">
          <CustomFormInput
            name="paymentInfo.cardNumber"
            label="Número do Cartão"
            type="text"
            placeholder="**** **** **** ****"
            maxLength={19}
            value={formatCardNumber(paymentCardNumber || "")}
            onChange={handleCardNumberChange}
            startContent={<CreditCard className="h-5 w-5" />}
          />
          <CustomFormInput
            name="paymentInfo.cardHolderName"
            label="Nome no Cartão"
            type="text"
            placeholder="João da Silva"
            startContent={<User className="h-5 w-5" />}
          />
          <div className="grid grid-cols-2 gap-4 items-center">
            <FormField
              control={control}
              name="paymentInfo.expiration"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="mb-2">Validade</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "pl-3 text-left font-normal !h-10",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Data de validade</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        className="border-black border"
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <CustomFormInput
              name="paymentInfo.cvv"
              label="CVV"
              type="text"
              placeholder="***"
              maxLength={3}
              startContent={<Lock className="h-5 w-5" />}
            />
          </div>
        </div>
      </div>
      <div className="flex gap-4 mt-4 items-center w-full justify-end">
        <Button variant="secondary" onClick={onPrev}>
          Voltar
        </Button>
        <Button onClick={onNext} disabled={!isValid}>
          Avançar
        </Button>
      </div>
    </div>
  );
};

export default PaymentStep;
