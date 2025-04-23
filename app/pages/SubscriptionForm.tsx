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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Label } from "~/components/ui/label";
import { Checkbox } from "~/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Progress } from "~/components/ui/progress";
import { CreditCard, User, Lock, CalendarIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { format } from "date-fns";
import { cn } from "~/lib/utils";
import { Calendar } from "~/components/ui/calendar";
import CreditCardPreview from "~/Common/components/CreditCardPreview";

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
    setValue,
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

  const paymentCardNumber = watch("paymentInfo.cardNumber");
  const paymentCardHolderName = watch("paymentInfo.cardHolderName");
  const paymentCvv = watch("paymentInfo.cvv");
  const paymentExpiration = watch("paymentInfo.expiration");

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
  const fourthStepDataArray = [
    paymentCardNumber,
    paymentCardHolderName,
    paymentCvv,
    paymentExpiration,
  ];

  const isRelevant = (item: string | string[] | undefined | Date): boolean =>
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

  const FourthStepDataArrayDefinedItemsLength =
    fourthStepDataArray.filter(isRelevant).length;

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

  const FourthStepProgress = getStepProgress(
    FourthStepDataArrayDefinedItemsLength,
    fourthStepDataArray.length
  );

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setValue("paymentInfo.cardNumber", formatted);
  };

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
                <TabsTrigger value="payment" className="rounded-full w-8 h-8">
                  4
                </TabsTrigger>
                <Progress value={FourthStepProgress} className="w-[100px]" />
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
                        <FormField
                          key={role.value}
                          control={form.control}
                          name="roles"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                              <FormLabel>{role.label}</FormLabel>
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(
                                    role.value as Role
                                  )}
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
              <TabsContent value="payment" className="flex flex-col gap-4">
                <h1 className="text-2xl font-bold mb-6 text-center">
                  Pagamento
                </h1>
                <div className="grid grid-cols-2 gap-4">
                  <CreditCardPreview
                    cardNumber={paymentCardNumber}
                    cardHolderName={paymentCardHolderName}
                    expiration={String(paymentExpiration)}
                    cvv={paymentCvv}
                  />
                  <div className="flex flex-col gap-4">
                    <div className="space-y-2">
                      <CustomFormInput
                        name={"paymentInfo.cardNumber"}
                        label={"Número do Cartão"}
                        type={"text"}
                        placeholder="**** **** **** ****"
                        maxLength={19}
                        onChange={handleCardNumberChange}
                        startContent={<CreditCard className="h-5 w-5" />}
                      />
                    </div>
                    <div className="space-y-2">
                      <CustomFormInput
                        name={"paymentInfo.cardHolderName"}
                        label={"Nome no Cartão"}
                        type={"text"}
                        placeholder="João da Silva"
                        startContent={<User className="h-5 w-5" />}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 items-center">
                      <FormField
                        control={form.control}
                        name="paymentInfo.expiration"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel className="mb-2">Validade</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
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
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  className="border-black border"
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date > new Date() ||
                                    date < new Date("1900-01-01")
                                  }
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <CustomFormInput
                        name={"paymentInfo.cvv"}
                        label={"CVV"}
                        type={"text"}
                        placeholder="***"
                        maxLength={3}
                        startContent={<Lock className="h-5 w-5" />}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            <button
              type="submit"
              className="mt-6 w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              Enviar
            </button>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default SubscriptionForm;
