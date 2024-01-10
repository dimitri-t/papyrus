import BillingForm from '@/components/billing-form';
import { DashboardHeader } from '@/components/dashboard-header';
import { DashboardShell } from '@/components/dashboard-shell';
import { Icons } from '@/components/icons';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { getUserSubscriptionPlan } from '@/lib/subscription';

const BillingPage = async () => {
  const subscriptionPlan = await getUserSubscriptionPlan();

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Billing"
        text="Manage billing and your subscription plan."
      />
      <div className="grid max-w-3xl gap-8">
        <Alert className="!pl-14">
          <Icons.warning />
          <AlertTitle>This is a demo app.</AlertTitle>
          <AlertDescription>
            Papyrus app is a demo app using a Stripe test environment. You can
            find a list of test card numbers on the{' '}
            <a
              href="https://stripe.com/docs/testing#cards"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-8"
            >
              Stripe docs
            </a>
            .
          </AlertDescription>
        </Alert>
        <BillingForm subscriptionPlan={subscriptionPlan} />
      </div>
    </DashboardShell>
  );
};

export default BillingPage;
