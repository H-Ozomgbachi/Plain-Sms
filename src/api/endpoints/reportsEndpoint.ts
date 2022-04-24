import requests from "../main/apiConfig";
import { MessageReport } from "../models/reports";
import { ApiResponseData, PagedResult, QueryParam } from "../models/shared";

export const Reports = {
  smsMessages: (campaignId: string, queryStr: string) =>
    requests.get<ApiResponseData<PagedResult<MessageReport>>>(
      `/reports/campaigns/${campaignId}/sms-messages?${queryStr}`
    ),

  smsMessageResponses: (campaignId: string, query: QueryParam) =>
    requests.get<ApiResponseData<PagedResult<any>>>(
      `/reports/campaigns/${campaignId}/sms-message-responses?PageNumber=${query.pageNumber}&Code=${query.code}&RecipientNumber=${query.recipientNumber}&StartDate=${query.startDate}&EndDate=${query.endDate}&PageSize=${query.pageSize}`
    ),

  otpMessages: (accountId: string, query: QueryParam) =>
    requests.get<ApiResponseData<PagedResult<any>>>(
      `/reports/accounts/${accountId}/otp-messages?PageNumber=${query.pageNumber}&Code=${query.code}&RecipientNumber=${query.recipientNumber}&StartDate=${query.startDate}&EndDate=${query.endDate}&PageSize=${query.pageSize}`
    ),
};
