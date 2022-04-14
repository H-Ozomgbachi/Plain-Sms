import requests from "../main/apiConfig";
import { ApiResponseData, PagedResult, QueryParam } from "../models/shared";

export const Reports = {
  smsMessages: (campaignId: string, query: QueryParam) =>
    requests.get<ApiResponseData<PagedResult<any>>>(
      `/reports/campaigns/${campaignId}/sms-messages?PageNumber=${query.PageNumber}&Code=${query.Code}&RecipientNumber=${query.RecipientNumber}&StartDate=${query.StartDate}&EndDate=${query.EndDate}&PageSize=${query.PageSize}`
    ),

  smsMessageResponses: (campaignId: string, query: QueryParam) =>
    requests.get<ApiResponseData<PagedResult<any>>>(
      `/reports/campaigns/${campaignId}/sms-message-responses?PageNumber=${query.PageNumber}&Code=${query.Code}&RecipientNumber=${query.RecipientNumber}&StartDate=${query.StartDate}&EndDate=${query.EndDate}&PageSize=${query.PageSize}`
    ),

  otpMessages: (accountId: string, query: QueryParam) =>
    requests.get<ApiResponseData<PagedResult<any>>>(
      `/reports/accounts/${accountId}/otp-messages?PageNumber=${query.PageNumber}&Code=${query.Code}&RecipientNumber=${query.RecipientNumber}&StartDate=${query.StartDate}&EndDate=${query.EndDate}&PageSize=${query.PageSize}`
    ),
};
