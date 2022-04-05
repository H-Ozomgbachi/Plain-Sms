import { createContext, useContext } from "react";
import { CampaignStore } from "../storeCollection/campaignStore";
import { CommonStore } from "../storeCollection/commonStore";
import { UserAccountStore } from "../storeCollection/userAccountStore";

interface Store {
  commonStore: CommonStore;
  userAccountStore: UserAccountStore;
  campaignStore: CampaignStore;
}

export const store: Store = {
  commonStore: new CommonStore(),
  userAccountStore: new UserAccountStore(),
  campaignStore: new CampaignStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
