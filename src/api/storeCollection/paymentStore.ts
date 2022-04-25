import { makeAutoObservable } from "mobx";
import agent from "../main/apiAgent";
import { store } from "../main/appStore";
import { autoLinkClick } from "../main/coreMethods";
import { SendPaymentDto } from "../models/payment";

export class PaymentStore {
  constructor() {
    makeAutoObservable(this);
  }

  initializePayment = async (values: SendPaymentDto) => {
    try {
      store.commonStore.setLoading(true);
      const { result } = await agent.Payment.initialize(values);

      autoLinkClick(result.authorization_url);
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };
}
