import { Button } from "~/components/ui/button";
import { CustomFormInput, type userRegistrationFormData } from "~/Common";
import { format } from "date-fns";

interface Props {
  formData: userRegistrationFormData;
}

const ReviewStep = ({ formData }: Props) => {
  const getDisplayValue = (
    value: any,
    defaultValue: string = "À preencher"
  ) => {
    return value ? value : defaultValue;
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Revisão dos Dados</h1>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Dados Pessoais</h2>
        <div className="space-y-2">
          <div>
            <strong>Nome:</strong> {getDisplayValue(formData.name)}
          </div>
          <div>
            <strong>Telefone:</strong> {getDisplayValue(formData.phone)}
          </div>
          <div>
            <strong>E-mail:</strong> {getDisplayValue(formData.email)}
          </div>
          <div>
            <strong>Número do Crachá:</strong>{" "}
            {getDisplayValue(formData.badgeUrl)}
          </div>
          <div>
            <strong>Papel(s):</strong>{" "}
            {getDisplayValue(formData.roles?.join(", "))}
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Endereço Residencial</h2>
        <div className="space-y-2">
          <div>
            <strong>CEP:</strong>{" "}
            {getDisplayValue(formData.homeAddress?.zipCode)}
          </div>
          <div>
            <strong>Rua:</strong>{" "}
            {getDisplayValue(formData.homeAddress?.street)}
          </div>
          <div>
            <strong>Complemento:</strong>{" "}
            {getDisplayValue(formData.homeAddress?.complement)}
          </div>
          <div>
            <strong>Bairro:</strong>{" "}
            {getDisplayValue(formData.homeAddress?.neighborhood)}
          </div>
          <div>
            <strong>Cidade:</strong>{" "}
            {getDisplayValue(formData.homeAddress?.city)}
          </div>
          <div>
            <strong>Estado:</strong>{" "}
            {getDisplayValue(formData.homeAddress?.state)}
          </div>
          <div>
            <strong>País:</strong>{" "}
            {getDisplayValue(formData.homeAddress?.country)}
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Endereço Profissional</h2>
        <div className="space-y-2">
          <div>
            <strong>CEP:</strong>{" "}
            {getDisplayValue(formData.jobAddress?.zipCode)}
          </div>
          <div>
            <strong>Rua:</strong> {getDisplayValue(formData.jobAddress?.street)}
          </div>
          <div>
            <strong>Complemento:</strong>{" "}
            {getDisplayValue(formData.jobAddress?.complement)}
          </div>
          <div>
            <strong>Bairro:</strong>{" "}
            {getDisplayValue(formData.jobAddress?.neighborhood)}
          </div>
          <div>
            <strong>Cidade:</strong>{" "}
            {getDisplayValue(formData.jobAddress?.city)}
          </div>
          <div>
            <strong>Estado:</strong>{" "}
            {getDisplayValue(formData.jobAddress?.state)}
          </div>
          <div>
            <strong>País:</strong>{" "}
            {getDisplayValue(formData.jobAddress?.country)}
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Dados de Pagamento</h2>
        <div className="space-y-2">
          <div>
            <strong>Número do Cartão:</strong>{" "}
            {getDisplayValue(formData.paymentInfo?.cardNumber)}
          </div>
          <div>
            <strong>Nome no Cartão:</strong>{" "}
            {getDisplayValue(formData.paymentInfo?.cardHolderName)}
          </div>
          <div>
            <strong>Validade:</strong>{" "}
            {getDisplayValue(
              formData.paymentInfo?.expiration
                ? format(new Date(formData.paymentInfo?.expiration), "MM/yy")
                : "À preencher",
              "À preencher"
            )}
          </div>
          <div>
            <strong>CVV:</strong> {getDisplayValue(formData.paymentInfo?.cvv)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewStep;
