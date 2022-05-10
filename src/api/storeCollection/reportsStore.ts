import { makeAutoObservable, runInAction } from "mobx";
import {
  getNumberOfPages,
  queryStringBuilder,
} from "../../function-library/helper-functions/sharedHelperMethods";
import agent from "../main/apiAgent";
import { store } from "../main/appStore";
import {
  MessageReport,
  OtpReport,
  ResponseReport,
  TransactionReport,
} from "../models/reports";
import { QueryParam } from "../models/shared";

export class ReportsStore {
  messagesReport: MessageReport[] = [];
  responsesReport: ResponseReport[] = [];
  otpsReport: OtpReport[] = [];
  transactionsReport: TransactionReport[] = [];
  currentQueryParams: QueryParam | null = null;
  totalMsgPages = 1;
  totalResponsePages = 1;
  totalOtpPages = 1;
  totalTransactionsPages = 1;

  msgPageSize = 10;
  responsePageSize = 10;
  otpPageSize = 10;
  transactionPageSize = 10;

  constructor() {
    makeAutoObservable(this);
  }

  getSmsMessages = async (id: string, query: QueryParam) => {
    try {
      window.scrollTo(0, 0);
      this.currentQueryParams = query;
      const queryString = queryStringBuilder({
        ...query,
        pageSize: this.msgPageSize,
      });

      store.commonStore.setLoading(true);
      const { result } = await agent.Reports.smsMessages(id, queryString);

      this.totalMsgPages = getNumberOfPages(
        result.totalNumberOfRecords,
        this.msgPageSize
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
      const queryString = queryStringBuilder({
        ...query,
        pageSize: this.responsePageSize,
      });

      store.commonStore.setLoading(true);
      const { result } = await agent.Reports.smsMessageResponses(
        id,
        queryString
      );

      this.totalResponsePages = getNumberOfPages(
        result.totalNumberOfRecords,
        this.responsePageSize
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
      const queryString = queryStringBuilder({
        ...query,
        pageSize: this.otpPageSize,
      });

      store.commonStore.setLoading(true);
      const { result } = await agent.Reports.otpMessages(id, queryString);

      this.totalOtpPages = getNumberOfPages(
        result.totalNumberOfRecords,
        this.otpPageSize
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

  getTransactions = async (id: string, query: QueryParam) => {
    try {
      window.scrollTo(0, 0);
      this.currentQueryParams = query;
      const queryString = queryStringBuilder({
        ...query,
        pageSize: this.transactionPageSize,
      });

      store.commonStore.setLoading(true);
      const { result } = await agent.Reports.transactions(id, queryString);

      this.totalTransactionsPages = getNumberOfPages(
        result.totalNumberOfRecords,
        this.transactionPageSize
      );

      runInAction(() => {
        this.transactionsReport = result.result;
      });
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  setMsgPageSize = (value: number) => (this.msgPageSize = value);
  setResponsePageSize = (value: number) => (this.responsePageSize = value);
  setOtpPageSize = (value: number) => (this.otpPageSize = value);
  setTransactionPageSize = (value: number) =>
    (this.transactionPageSize = value);
}
