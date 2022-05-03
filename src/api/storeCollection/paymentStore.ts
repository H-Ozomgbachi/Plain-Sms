import { makeAutoObservable, runInAction } from "mobx";
import {
  getNumberOfPages,
  queryStringBuilder,
} from "../../function-library/helper-functions/sharedHelperMethods";
import agent from "../main/apiAgent";
import { store } from "../main/appStore";
import { autoLinkClick } from "../main/coreMethods";
import { SendPaymentDto } from "../models/payment";
import { TransactionReport } from "../models/reports";
import { QueryParam } from "../models/shared";

export class PaymentStore {
  paymentHistory: TransactionReport[] = [];
  currentQueryParams: QueryParam | null = null;
  totalPaymentPages = 1;

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

  getPaymentHistory = async (id: string, query: QueryParam) => {
    try {
      window.scrollTo(0, 0);
      this.currentQueryParams = query;
      const queryString = queryStringBuilder(query);

      store.commonStore.setLoading(true);
      const { result } = await agent.Reports.transactions(id, queryString);

      this.totalPaymentPages = getNumberOfPages(
        result.totalNumberOfRecords,
        query.pageSize
      );

      runInAction(() => {
        this.paymentHistory = result.result;
      });
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };
}
