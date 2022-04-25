import requests from "../main/apiConfig";
import { MessageReport, ResponseReport } from "../models/reports";
import { ApiResponseData, PagedResult, QueryParam } from "../models/shared";

export const Reports = {
  smsMessages: (campaignId: string, queryStr: string) =>
    requests.get<ApiResponseData<PagedResult<MessageReport>>>(
      `/reports/campaigns/${campaignId}/sms-messages?${queryStr}`
    ),

  smsMessageResponses: (campaignId: string, queryStr: string) =>
    requests.get<ApiResponseData<PagedResult<ResponseReport>>>(
      `/reports/campaigns/${campaignId}/sms-message-responses?${queryStr}`
    ),

  otpMessages: (accountId: string, query: QueryParam) =>
    requests.get<ApiResponseData<PagedResult<any>>>(
      `/reports/accounts/${accountId}/otp-messages?PageNumber=${query.pageNumber}&Code=${query.code}&RecipientNumber=${query.recipientNumber}&StartDate=${query.startDate}&EndDate=${query.endDate}&PageSize=${query.pageSize}`
    ),
};
