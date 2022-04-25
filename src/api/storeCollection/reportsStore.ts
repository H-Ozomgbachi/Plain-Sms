import { makeAutoObservable, runInAction } from "mobx";
import {
  getNumberOfPages,
  queryStringBuilder,
} from "../../function-library/helper-functions/sharedHelperMethods";
import agent from "../main/apiAgent";
import { store } from "../main/appStore";
import { MessageReport, ResponseReport } from "../models/reports";
import { QueryParam } from "../models/shared";

export class ReportsStore {
  messagesReport: MessageReport[] = [];
  responsesReport: ResponseReport[] = [];
  currentQueryParams: QueryParam | null = null;
  totalMsgPages = 1;
  totalResponsePages = 1;

  constructor() {
    makeAutoObservable(this);
  }

  getSmsMessages = async (id: string, query: QueryParam) => {
    try {
      window.scrollTo(0, 0);
      this.currentQueryParams = query;
      const queryString = queryStringBuilder(query);

      store.commonStore.setLoading(true);
      const { result } = await agent.Reports.smsMessages(id, queryString);

      this.totalMsgPages = getNumberOfPages(
        result.totalNumberOfRecords,
        query.pageSize
      );

      runInAction(() => {
        this.messagesReport = result.result;
      });
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  getSmsMessageResponses = async (id: string, query: QueryParam) => {
    try {
      window.scrollTo(0, 0);
      this.currentQueryParams = query;
      const queryString = queryStringBuilder(query);

      store.commonStore.setLoading(true);
      const { result } = await agent.Reports.smsMessageResponses(
        id,
        queryString
      );

      this.totalResponsePages = getNumberOfPages(
        result.totalNumberOfRecords,
        query.pageSize
      );

      runInAction(() => {
        this.responsesReport = result.result;
      });
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
