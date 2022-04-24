import requests from "../main/apiConfig";
import { ApiResponseData } from "../models/shared";
import { CreateSmsDto, SendSmsResponse } from "../models/sms";

export const Sms = {
  sendSms: (campaignId: string, payload: CreateSmsDto) =>
    requests.post<ApiResponseData<SendSmsResponse>>(
      `/sms/campaigns/${campaignId}/send`,
      payload
    ),
};
