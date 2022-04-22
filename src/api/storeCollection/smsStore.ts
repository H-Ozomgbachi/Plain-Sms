import { makeAutoObservable } from "mobx";
import agent from "../main/apiAgent";
import { store } from "../main/appStore";
import { CreateSmsDto } from "../models/sms";

export class SmsStore {
  constructor() {
    makeAutoObservable(this);
  }

  sendOneMessageToMany = async (values: CreateSmsDto) => {
    try {
      store.commonStore.setLoading(true);
      window.scrollTo(0, 0);
      const { campaignId, ...payload } = values;
      const { result } = await agent.Sms.sendSms(campaignId!, payload);
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };
}
