import { UseFormReturn } from "react-hook-form";
import Formatters from "../utils/formatters";
import { userRegistrationFormData } from "../schemas/subscription-schema";
import { Role, RoleStringRepresentation } from "../enums/Role";
import CustomFormInput from "./CustomFormInput";
import CustomPhoneInput from "./CustomPhoneInput";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

interface Props {
  form: UseFormReturn<userRegistrationFormData>;
  isValid: boolean;
  onNext: () => void;
}

const Roles = Formatters.createEnumMap(Role, RoleStringRepresentation);

const UserDataStep = ({ form, isValid, onNext }: Props) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <h1 className="text-2xl font-bold mb-6 text-center">Dados Pessoais</h1>
      <div className="grid grid-cols-2 gap-4 w-full">
        <CustomFormInput name="name" label="Nome" type="text" />
        <CustomPhoneInput name="phone" label="Telefone" />
        <CustomFormInput name="email" label="E-mail" type="email" />
        <CustomFormInput name="badgeUrl" label="Número do Crachá" type="text" />

        <div className="col-span-2 w-full flex flex-col items-center justify-center">
          <h2 className="text-lg font-bold mb-4">Papel</h2>
          <div className="flex flex-wrap gap-4">
            {Roles.map((role) => (
              <FormField
                key={role.value}
                control={form.control}
                name="roles"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2">
                    <FormLabel>{role.label}</FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(role.value as Role)}
                        onCheckedChange={(checked) => {
                          const newValue = checked
                            ? [...(field.value || []), role.value]
                            : (field.value || []).filter(
                                (r) => r !== role.value
                              );
                          field.onChange(newValue);
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-4 mt-4 items-center w-full justify-end">
        <Button onClick={onNext} disabled={!isValid}>
          Avançar
        </Button>
      </div>
    </div>
  );
};

export default UserDataStep;
