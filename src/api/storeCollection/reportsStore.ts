import { makeAutoObservable, runInAction } from "mobx";
import {
  getNumberOfPages,
  queryStringBuilder,
} from "../../function-library/helper-functions/sharedHelperMethods";
import agent from "../main/apiAgent";
import { store } from "../main/appStore";
import { MessageReport, OtpReport, ResponseReport } from "../models/reports";
import { QueryParam } from "../models/shared";

export class ReportsStore {
  messagesReport: MessageReport[] = [];
  responsesReport: ResponseReport[] = [];
  otpsReport: OtpReport[] = [];
  currentQueryParams: QueryParam | null = null;
  totalMsgPages = 1;
  totalResponsePages = 1;
  totalOtpPages = 1;

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

  getOtpMessages = async (id: string, query: QueryParam) => {
    try {
      window.scrollTo(0, 0);
      this.currentQueryParams = query;
      const queryString = queryStringBuilder(query);

      store.commonStore.setLoading(true);
      const { result } = await agent.Reports.otpMessages(id, queryString);

      this.totalOtpPages = getNumberOfPages(
        result.totalNumberOfRecords,
        query.pageSize
      );

      runInAction(() => {
        this.otpsReport = result.result;
      });
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };
}
