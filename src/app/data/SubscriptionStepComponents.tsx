import JobAddressStep from "../components/JobAddressStep";
import PaymentStep from "../components/PaymentStep";
import ResidentialAddressStep from "../components/ResidentialAddressStep";
import ReviewStep from "../components/ReviewStep";
import UserDataStep from "../components/UserDataStep";
import { SubscriptionFormStep } from "../enums/SubscriptionFormStep";

export const stepComponents = [
  { value: SubscriptionFormStep.UserData, label: "1", component: UserDataStep },
  {
    value: SubscriptionFormStep.ResidentialAddress,
    label: "2",
    component: ResidentialAddressStep,
  },
  {
    value: SubscriptionFormStep.JobAddress,
    label: "3",
    component: JobAddressStep,
  },
  { value: SubscriptionFormStep.Payment, label: "4", component: PaymentStep },
  {
    value: SubscriptionFormStep.Review,
    label: "5",
    component: ReviewStep,
  },
];
