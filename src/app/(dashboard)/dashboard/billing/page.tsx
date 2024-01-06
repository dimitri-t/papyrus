import BillingForm from "@/components/billing-form";
import { getUserSubscriptionPlan } from "@/lib/subscription";

const Page = async () => {
  const subscriptionPlan = await getUserSubscriptionPlan();

  return <BillingForm subscriptionPlan={subscriptionPlan} />;
};

export default Page;
