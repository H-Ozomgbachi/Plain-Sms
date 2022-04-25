import { createContext, useContext } from "react";
import { CampaignStore } from "../storeCollection/campaignStore";
import { CommonStore } from "../storeCollection/commonStore";
import { PaymentStore } from "../storeCollection/paymentStore";
import { ReportsStore } from "../storeCollection/reportsStore";
import { SmsStore } from "../storeCollection/smsStore";
import { UserAccountStore } from "../storeCollection/userAccountStore";

interface Store {
  commonStore: CommonStore;
  userAccountStore: UserAccountStore;
  campaignStore: CampaignStore;
  reportsStore: ReportsStore;
  smsStore: SmsStore;
  paymentStore: PaymentStore;
}

export const store: Store = {
  commonStore: new CommonStore(),
  userAccountStore: new UserAccountStore(),
  campaignStore: new CampaignStore(),
  reportsStore: new ReportsStore(),
  smsStore: new SmsStore(),
  paymentStore: new PaymentStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
