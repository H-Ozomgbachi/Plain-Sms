import { createContext, useContext } from "react";
import { CommonStore } from "../storeCollection/commonStore";
import { UserAccountStore } from "../storeCollection/userAccountStore";

interface Store {
  commonStore: CommonStore;
  userAccountStore: UserAccountStore;
}

export const store: Store = {
  commonStore: new CommonStore(),
  userAccountStore: new UserAccountStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
