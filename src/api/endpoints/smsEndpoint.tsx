import requests from "../main/apiConfig";
import { ApiResponseData } from "../models/shared";
import { CreateSmsDto } from "../models/sms";

export const Sms = {
  sendSms: (campaignId: number, payload: CreateSmsDto) =>
    requests.post<ApiResponseData<any>>(
      `/sms/campaigns/${campaignId}/send`,
      payload
    ),
};
