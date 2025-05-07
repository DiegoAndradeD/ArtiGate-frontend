import { Button } from "@/components/ui/button";
import CustomFormInput from "./CustomFormInput";

interface Props {
  isValid: boolean;
  onNext: () => void;
  onPrev: () => void;
}

const ResidentialAddressStep = ({ isValid, onNext, onPrev }: Props) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Endereço Residencial
      </h1>
      <div className="grid grid-cols-3 gap-4 mt-2">
        <CustomFormInput
          name="homeAddress.zipCode"
          label="CEP"
          type="text"
          placeholder="00000-000"
        />
        <CustomFormInput
          name="homeAddress.street"
          label="Rua"
          type="text"
          placeholder="Rua Exemplo"
        />
        <CustomFormInput
          name="homeAddress.complement"
          label="Complemento"
          type="text"
          placeholder="Apto, bloco, etc."
        />
        <CustomFormInput
          name="homeAddress.neighborhood"
          label="Bairro"
          type="text"
          placeholder="Centro"
        />
        <CustomFormInput
          name="homeAddress.city"
          label="Cidade"
          type="text"
          placeholder="São Paulo"
        />
        <CustomFormInput
          name="homeAddress.state"
          label="Estado"
          type="text"
          placeholder="SP"
        />
        <CustomFormInput
          name="homeAddress.country"
          label="País"
          type="text"
          placeholder="Brasil"
          classNames={{ container: "col-span-3" }}
        />
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

export default ResidentialAddressStep;
