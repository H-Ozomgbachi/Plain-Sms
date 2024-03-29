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
      const { statusCode } = await agent.Sms.sendSms(values.campaignId, values);

      if (statusCode) {
        store.commonStore.setSuccess("Successful");
      }
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  sendManyMessageToMany = async (values: CreateSmsDto[]) => {
    window.scrollTo(0, 0);

    values.forEach(async (value) => {
      try {
        store.commonStore.setLoading(true);
        const { statusCode } = await agent.Sms.sendSms(value.campaignId, value);
        if (statusCode) {
          store.commonStore.setSuccess("Successful");
        }
      } catch (error) {
        throw error;
      } finally {
        store.commonStore.setLoading(false);
      }
    });
  };
}
