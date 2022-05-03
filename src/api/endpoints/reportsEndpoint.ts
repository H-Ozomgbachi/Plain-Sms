import requests from "../main/apiConfig";
import {
  MessageReport,
  OtpReport,
  ResponseReport,
  TransactionReport,
} from "../models/reports";
import { ApiResponseData, PagedResult } from "../models/shared";

export const Reports = {
  smsMessages: (campaignId: string, queryStr: string) =>
    requests.get<ApiResponseData<PagedResult<MessageReport>>>(
      `/reports/campaigns/${campaignId}/sms-messages?${queryStr}`
    ),

  smsMessageResponses: (campaignId: string, queryStr: string) =>
    requests.get<ApiResponseData<PagedResult<ResponseReport>>>(
      `/reports/campaigns/${campaignId}/sms-message-responses?${queryStr}`
    ),

  otpMessages: (accountId: string, queryStr: string) =>
    requests.get<ApiResponseData<PagedResult<OtpReport>>>(
      `/reports/accounts/${accountId}/otp-messages?${queryStr}`
    ),

  transactions: (accountId: string, queryStr: string) =>
    requests.get<ApiResponseData<PagedResult<TransactionReport>>>(
      `/reports/accounts/${accountId}/transactions?${queryStr}`
    ),
};
