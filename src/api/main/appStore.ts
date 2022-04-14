import { createContext, useContext } from "react";
import { CampaignStore } from "../storeCollection/campaignStore";
import { CommonStore } from "../storeCollection/commonStore";
import { ReportsStore } from "../storeCollection/reportsStore";
import { SmsStore } from "../storeCollection/smsStore";
import { UserAccountStore } from "../storeCollection/userAccountStore";

interface Store {
  commonStore: CommonStore;
  userAccountStore: UserAccountStore;
  campaignStore: CampaignStore;
  reportsStore: ReportsStore;
  smsStore: SmsStore;
}

export const store: Store = {
  commonStore: new CommonStore(),
  userAccountStore: new UserAccountStore(),
  campaignStore: new CampaignStore(),
  reportsStore: new ReportsStore(),
  smsStore: new SmsStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
