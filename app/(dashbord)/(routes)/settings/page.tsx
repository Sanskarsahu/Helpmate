import { Settings } from "lucide-react";

import Header from '@/components/header'
import { SubscriptionButton } from "@/components/subscription-button";
import { checkSubscription } from "@/lib/subscription";

const SettingsPage = async () => {
  const isPro = await checkSubscription();
  
  return ( 
    <div>
      <Header
        title="Settings"
        description="Manage account settings."
        icon={Settings}
        iconcolor="text-gray-700"
      />
      <div className="px-4 lg:px-8 space-y-11 mt-20">
        <div className="text-muted-foreground text-sm">
          {isPro ? "You are currently on a Pro plan." : "You are currently on a free plan."}
        </div>
        <SubscriptionButton isPro={isPro} />
      </div>
    </div>
   );
}
 
export default SettingsPage;

