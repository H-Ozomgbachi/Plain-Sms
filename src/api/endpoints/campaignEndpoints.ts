import requests from "../main/apiConfig";
import {
  CampaignData,
  CreateCampaign,
  UpdateCampaign,
} from "../models/campaign";
import { ApiResponseData } from "../models/shared";

export const Campaign = {
  create: (payload: CreateCampaign) =>
    requests.post<ApiResponseData<CampaignData>>("/campaigns", payload),

  edit: (payload: UpdateCampaign) =>
    requests.put<ApiResponseData<CampaignData>>(
      `/campaigns/${payload.id}`,
      payload
    ),

  getOne: (id: string) =>
    requests.get<ApiResponseData<CampaignData>>(`/campaigns/${id}`),

  getAll: () => requests.get<ApiResponseData<CampaignData[]>>("/campaigns"),
};
