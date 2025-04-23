import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CustomFormInput,
  CustomPhoneInput,
  Formatters,
  Role,
  RoleStringRepresentation,
  userRegistrationSchema,
  type userRegistrationFormData,
} from "~/Common";
import { Form } from "~/components/ui/form";
import { Label } from "~/components/ui/label";
import { Checkbox } from "~/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Progress } from "~/components/ui/progress";
import { number } from "valibot";

const Roles = Formatters.createEnumMap(Role, RoleStringRepresentation);

const SubscriptionForm = () => {
  const form = useForm<userRegistrationFormData>({
    resolver: zodResolver(userRegistrationSchema),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = form;

  const onSubmit = (data: userRegistrationFormData) => {
    console.log(data);
  };

  const name = watch("name");
  const phone = watch("phone");
  const email = watch("email");
  const badgeUrl = watch("badgeUrl");
  const roles = watch("roles");

  const homeAddressCity = watch("homeAddress.city");
  const homeAddressComplement = watch("homeAddress.complement");
  const homeAddressCountry = watch("homeAddress.country");
  const homeAddressNeighborhood = watch("homeAddress.neighborhood");
  const homeAddressState = watch("homeAddress.state");
  const homeAddressStreet = watch("homeAddress.street");
  const homeAddressZipCode = watch("homeAddress.zipCode");

  const jobAddressCity = watch("jobAddress.city");
  const jobAddressComplement = watch("jobAddress.complement");
  const jobAddressCountry = watch("jobAddress.country");
  const jobAddressNeighborhood = watch("jobAddress.neighborhood");
  const jobAddressState = watch("jobAddress.state");
  const jobAddressStreet = watch("jobAddress.street");
  const jobAddressZipCode = watch("jobAddress.zipCode");

  const firstStepDataArray = [name, phone, email, badgeUrl, roles];
  const secondStepDataArray = [
    homeAddressCity,
    homeAddressComplement,
    homeAddressCountry,
    homeAddressNeighborhood,
    homeAddressState,
    homeAddressStreet,
    homeAddressZipCode,
  ];
  const thirdStepDataArray = [
    jobAddressCity,
    jobAddressComplement,
    jobAddressCountry,
    jobAddressNeighborhood,
    jobAddressState,
    jobAddressStreet,
    jobAddressZipCode,
  ];

  const isRelevant = (item: string | string[] | undefined): boolean =>
    item !== undefined &&
    item !== null &&
    !(Array.isArray(item) && item.length === 0) &&
    !(typeof item === "string" && item.trim() === "");

  const firstStepDataArrayDefinedItemsLength =
    firstStepDataArray.filter(isRelevant).length;

  const SecondStepDataArrayDefinedItemsLength =
    secondStepDataArray.filter(isRelevant).length;

  const ThirdStepDataArrayDefinedItemsLength =
    thirdStepDataArray.filter(isRelevant).length;

  const getStepProgress = (
    stepItemsDefinedLength: number,
    numberOfItems: number
  ) => {
    if (numberOfItems === 0) return 0;
    const ratio = stepItemsDefinedLength / numberOfItems;
    const progress = Math.min(ratio * 100, 100);
    return Math.round(progress);
  };

  const firstStepProgress = getStepProgress(
    firstStepDataArrayDefinedItemsLength,
    firstStepDataArray.length
  );

  const secondStepProgress = getStepProgress(
    SecondStepDataArrayDefinedItemsLength,
    secondStepDataArray.length
  );

  const thirdStepProgress = getStepProgress(
    ThirdStepDataArrayDefinedItemsLength,
    thirdStepDataArray.length
  );

  console.log(roles);

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100 w-full">
      <div className="w-1/2 p-8 bg-white rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Formulário de Inscrição
        </h1>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
            <Tabs defaultValue="user-data" className="w-full">
              <TabsList className="bg-transparent gap-4">
                <TabsTrigger value="user-data" className="rounded-full w-8 h-8">
                  1
                </TabsTrigger>
                <Progress value={firstStepProgress} className="w-[100px]" />
                <TabsTrigger
                  value="residencial-address"
                  className="rounded-full w-8 h-8"
                >
                  2
                </TabsTrigger>
                <Progress value={secondStepProgress} className="w-[100px]" />
                <TabsTrigger
                  value="job-address"
                  className="rounded-full w-8 h-8"
                >
                  3
                </TabsTrigger>
                <Progress value={thirdStepProgress} className="w-[100px]" />
                <TabsTrigger value="user-role" className="rounded-full w-8 h-8">
                  4
                </TabsTrigger>
                <Progress value={thirdStepProgress} className="w-[100px]" />
              </TabsList>
              <TabsContent value="user-data" className="w-full">
                <h1 className="text-2xl font-bold mb-6 text-center">
                  Dados Pessoais
                </h1>
                <div className="grid grid-cols-2 gap-4 w-full">
                  <CustomFormInput name={"name"} label={"Nome"} type={"text"} />
                  <CustomPhoneInput name={"phone"} label={"Telefone"} />
                  <CustomFormInput
                    name={"email"}
                    label={"E-mail"}
                    type={"email"}
                  />
                  <CustomFormInput
                    name={"badgeUrl"}
                    label={"URL do Crachá"}
                    type={"text"}
                  />
                  <div className="flex flex-col items-start">
                    <h1 className="text-lg font-bold mb-6 text-center">
                      Papel
                    </h1>
                    <div className="flex gap-4 items-center">
                      {Roles.map((role) => (
                        <>
                          <Label
                            key={role.value}
                            className="flex items-center gap-2 text-lg"
                          >
                            {role.label}
                          </Label>
                          <Checkbox
                            id={role.value}
                            value={role.value}
                            className="w-4 h-4 border-primary"
                            {...register("roles")}
                          />
                        </>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="residencial-address">
                <h1 className="text-2xl font-bold mb-6 text-center">
                  Endereço Residencial
                </h1>
                <div className="grid grid-cols-3 gap-4 mt-2">
                  <CustomFormInput
                    name={"homeAddress.zipCode"}
                    label={"CEP"}
                    type={"text"}
                  />
                  <CustomFormInput
                    name={"homeAddress.street"}
                    label={"Rua"}
                    type={"text"}
                  />
                  <CustomFormInput
                    name={"homeAddress.complement"}
                    label={"Complemento"}
                    type={"text"}
                  />
                  <CustomFormInput
                    name={"homeAddress.neighborhood"}
                    label={"Bairro"}
                    type={"text"}
                  />
                  <CustomFormInput
                    name={"homeAddress.city"}
                    label={"Cidade"}
                    type={"text"}
                  />
                  <CustomFormInput
                    name={"homeAddress.state"}
                    label={"Estado"}
                    type={"text"}
                  />
                  <CustomFormInput
                    name={"homeAddress.country"}
                    label={"País"}
                    type={"text"}
                    classNames={{
                      container: "col-span-3",
                    }}
                  />
                </div>
              </TabsContent>
              <TabsContent value="job-address">
                <h1 className="text-2xl font-bold mb-6 text-center">
                  Endereço Profissional
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <CustomFormInput
                    name={"jobAddress.zipCode"}
                    label={"CEP"}
                    type={"text"}
                  />
                  <CustomFormInput
                    name={"jobAddress.street"}
                    label={"Rua"}
                    type={"text"}
                  />
                  <CustomFormInput
                    name={"jobAddress.complement"}
                    label={"Complemento"}
                    type={"text"}
                  />
                  <CustomFormInput
                    name={"jobAddress.neighborhood"}
                    label={"Bairro"}
                    type={"text"}
                  />
                  <CustomFormInput
                    name={"jobAddress.city"}
                    label={"Cidade"}
                    type={"text"}
                  />
                  <CustomFormInput
                    name={"jobAddress.state"}
                    label={"Estado"}
                    type={"text"}
                  />
                  <CustomFormInput
                    name={"jobAddress.country"}
                    label={"País"}
                    type={"text"}
                    classNames={{
                      container: "col-span-3",
                    }}
                  />
                </div>
              </TabsContent>
              <TabsContent value="user-role" className="flex flex-col gap-4">
                <h1 className="text-2xl font-bold mb-6 text-center">Papel</h1>

                {errors.roles && (
                  <p className="text-red-500 text-sm">{errors.roles.message}</p>
                )}
              </TabsContent>
            </Tabs>

            {/* <section>


            </section>
            <div className="flex flex-col gap-4">
              <label className="block font-medium">Papel</label>
              <div className="flex gap-4 items-center">
                {Roles.map((role) => (
                  <>
                    <Label
                      key={role.value}
                      className="flex items-center gap-2 text-lg"
                    >
                      {role.label}
                    </Label>
                    <Checkbox
                      id={role.value}
                      value={role.value}
                      className="w-4 h-4 border-primary"
                      {...register("roles")}
                    />
                  </>
                ))}
              </div>
              {errors.roles && (
                <p className="text-red-500 text-sm">{errors.roles.message}</p>
              )}
            </div>
            <fieldset>
              <legend className="text-lg font-semibold">
                Informações de Pagamento
              </legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <input
                  type="text"
                  placeholder="Número do Cartão"
                  {...register("paymentInfo.cardNumber")}
                  className="input"
                />
                <input
                  type="text"
                  placeholder="Nome no Cartão"
                  {...register("paymentInfo.cardHolderName")}
                  className="input"
                />
                <input
                  type="number"
                  placeholder="Mês (MM)"
                  {...register("paymentInfo.expirationMonth", {
                    valueAsNumber: true,
                  })}
                  className="input"
                />
                <input
                  type="number"
                  placeholder="Ano (YY)"
                  {...register("paymentInfo.expirationYear", {
                    valueAsNumber: true,
                  })}
                  className="input"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  {...register("paymentInfo.cvv")}
                  className="input"
                />
              </div>
            </fieldset>
            <button
              type="submit"
              className="mt-6 w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              Enviar
            </button> */}
          </form>
        </Form>
      </div>
    </section>
  );
};

export default SubscriptionForm;
