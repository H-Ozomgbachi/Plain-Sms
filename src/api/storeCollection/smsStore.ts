import { makeAutoObservable } from "mobx";
import agent from "../main/apiAgent";
import { CreateSmsDto } from "../models/sms";

export class SmsStore {
  constructor() {
    makeAutoObservable(this);
  }

  sendOneMessageToMany = async (values: CreateSmsDto) => {
    try {
      const { campaignId, ...payload } = values;
      const { result } = await agent.Sms.sendSms(campaignId!, payload);

      console.log(result);
    } catch (error) {
      throw error;
    }
  };
}
