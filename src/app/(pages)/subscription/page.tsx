"use client";
import { SubscriptionFormStep } from "@/app/enums/SubscriptionFormStep";
import {
  userRegistrationFormData,
  userRegistrationSchema,
} from "@/app/schemas/subscription-schema";
import { useUserStore } from "@/app/stores/user.store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { stepComponents } from "@/app/data/SubscriptionStepComponents";
import { generateFakeUserData } from "@/app/utils/generateFakeUserData";
import { Form } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import UserDataStep from "@/app/components/UserDataStep";
import ResidentialAddressStep from "@/app/components/ResidentialAddressStep";
import JobAddressStep from "@/app/components/JobAddressStep";
import PaymentStep from "@/app/components/PaymentStep";
import { Button } from "@/components/ui/button";
import ReviewStep from "@/app/components/ReviewStep";

const SubscriptionForm = () => {
  const navigate = useRouter();
  const [currentStep, setCurrentStep] = useState<SubscriptionFormStep>(
    SubscriptionFormStep.UserData
  );
  const { createUser } = useUserStore();

  const form = useForm<userRegistrationFormData>({
    resolver: zodResolver(userRegistrationSchema),
    mode: "onChange",
  });

  const { handleSubmit, watch } = form;

  const onSubmit = async (data: userRegistrationFormData) => {
    await createUser(data);
    navigate.push("/");
  };

  const stepFields = [
    [
      watch("name"),
      watch("phone"),
      watch("email"),
      watch("badgeUrl"),
      watch("roles"),
    ],
    [
      watch("homeAddress.city"),
      watch("homeAddress.complement"),
      watch("homeAddress.country"),
      watch("homeAddress.neighborhood"),
      watch("homeAddress.state"),
      watch("homeAddress.street"),
      watch("homeAddress.zipCode"),
    ],
    [
      watch("jobAddress.city"),
      watch("jobAddress.complement"),
      watch("jobAddress.country"),
      watch("jobAddress.neighborhood"),
      watch("jobAddress.state"),
      watch("jobAddress.street"),
      watch("jobAddress.zipCode"),
    ],
    [
      watch("paymentInfo.cardNumber"),
      watch("paymentInfo.cardHolderName"),
      watch("paymentInfo.cvv"),
      watch("paymentInfo.expiration"),
    ],
  ];

  const isRelevant = (item: string | string[] | undefined | Date): boolean =>
    item !== undefined &&
    item !== null &&
    !(Array.isArray(item) && item.length === 0) &&
    !(typeof item === "string" && item.trim() === "");

  const getStepProgress = (
    fields: (string | string[] | undefined | Date)[]
  ) => {
    if (!fields || !Array.isArray(fields)) {
      return 0;
    }

    const filled = fields.filter(isRelevant).length;
    return Math.round((filled / fields.length) * 100);
  };

  const goToStep = (direction: "next" | "prev") => {
    const currentIndex = stepComponents.findIndex(
      (step) => step.value === currentStep
    );
    if (direction === "next" && currentIndex < stepComponents.length - 1) {
      setCurrentStep(stepComponents[currentIndex + 1].value);
    } else if (direction === "prev" && currentIndex > 0) {
      setCurrentStep(stepComponents[currentIndex - 1].value);
    }
  };

  const isAllFieldsFilled = () => {
    return stepFields.flat().every(isRelevant);
  };

  useEffect(() => {
    const fakeData = generateFakeUserData();
    form.reset(fakeData);
  }, [form]);

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100 w-full">
      <div className="w-1/2 p-8 bg-white rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Formulário de Inscrição
        </h1>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
            <Tabs
              defaultValue={SubscriptionFormStep.UserData}
              className="w-full"
              value={currentStep}
              onValueChange={(val) =>
                setCurrentStep(val as SubscriptionFormStep)
              }
            >
              <TabsList className="bg-transparent gap-4 !w-full iten">
                {stepComponents.map((step, index) => (
                  <div key={step.value} className="flex items-center gap-2">
                    <TabsTrigger
                      value={step.value}
                      className="rounded-full w-8 h-8"
                    >
                      {step.label}
                    </TabsTrigger>
                    {index !== 4 && (
                      <Progress
                        value={getStepProgress(stepFields[index])}
                        className="w-[100px]"
                      />
                    )}
                  </div>
                ))}
              </TabsList>

              {stepComponents.map((step) => (
                <TabsContent key={step.value} value={step.value}>
                  {step.value === SubscriptionFormStep.UserData ? (
                    <UserDataStep
                      form={form}
                      isValid={getStepProgress(stepFields[0]) === 100}
                      onNext={() => goToStep("next")}
                    />
                  ) : step.value === SubscriptionFormStep.ResidentialAddress ? (
                    <ResidentialAddressStep
                      isValid={getStepProgress(stepFields[1]) === 100}
                      onNext={() => goToStep("next")}
                      onPrev={() => goToStep("prev")}
                    />
                  ) : step.value === SubscriptionFormStep.JobAddress ? (
                    <JobAddressStep
                      isValid={getStepProgress(stepFields[2]) === 100}
                      onNext={() => goToStep("next")}
                      onPrev={() => goToStep("prev")}
                    />
                  ) : step.value === SubscriptionFormStep.Payment ? (
                    <PaymentStep
                      isValid={getStepProgress(stepFields[3]) === 100}
                      onPrev={() => goToStep("prev")}
                      onNext={() => goToStep("next")}
                    />
                  ) : (
                    <ReviewStep formData={form.getValues()} />
                  )}
                </TabsContent>
              ))}
            </Tabs>
            {currentStep === SubscriptionFormStep.Review && (
              <div className="flex gap-4 mt-4 items-center w-full justify-between">
                <Button variant="secondary" onClick={() => goToStep("prev")}>
                  Voltar
                </Button>
                <Button type="submit" disabled={!isAllFieldsFilled()}>
                  Enviar
                </Button>
              </div>
            )}
          </form>
        </Form>
      </div>
    </section>
  );
};

export default SubscriptionForm;
