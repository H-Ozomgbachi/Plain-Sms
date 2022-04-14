import { makeAutoObservable } from "mobx";
import agent from "../main/apiAgent";
import { store } from "../main/appStore";
import { QueryParam } from "../models/shared";

export class ReportsStore {
  constructor() {
    makeAutoObservable(this);
  }

  getSmsMessages = async (campaignId: string, query: QueryParam) => {
    try {
      store.commonStore.setLoading(true);
      await agent.Reports.smsMessages(campaignId, query);
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  getSmsMessageResponses = async (campaignId: string, query: QueryParam) => {
    try {
      store.commonStore.setLoading(true);
      await agent.Reports.smsMessageResponses(campaignId, query);
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  getOtpMessages = async (campaignId: string, query: QueryParam) => {
    try {
      store.commonStore.setLoading(true);
      await agent.Reports.otpMessages(campaignId, query);
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };
}
