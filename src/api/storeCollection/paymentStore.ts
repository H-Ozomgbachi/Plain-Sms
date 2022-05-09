import { makeAutoObservable, reaction, runInAction } from "mobx";
import {
  getNumberOfPages,
  NairaFormatter,
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
  trxnRef: string | null = window.localStorage.getItem("trxnRef");

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.trxnRef,
      (trxnRef) => {
        if (trxnRef) {
          window.localStorage.setItem("trxnRef", trxnRef);
        } else {
          window.localStorage.removeItem("trxnRef");
        }
      }
    );
  }

  setTrxnRef = (value: string) => {
    window.localStorage.setItem("trxnRef", value);
  };

  initializePayment = async (values: SendPaymentDto) => {
    try {
      store.commonStore.setLoading(true);
      const { result } = await agent.Payment.initialize(values);

      autoLinkClick(result.authorization_url);
      this.setTrxnRef(result.callbackurl);
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

  verifyPayment = async (txnref: string) => {
    try {
      window.scrollTo(0, 0);
      store.commonStore.setLoading(true);
      const { result } = await agent.Payment.verify(txnref);

      result.status === "success"
        ? store.commonStore.setSuccess(
            `Your account was successfully credited with ${NairaFormatter(
              +result.amount
            )} ✓`
          )
        : store.commonStore.setError(result.gateway_response);
    } catch (error) {
      throw error;
    } finally {
      window.localStorage.removeItem("trxnRef");
      store.commonStore.setLoading(false);
    }
  };
}
