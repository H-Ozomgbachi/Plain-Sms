export interface CreateCampaign {
  callbackUrl: string;
  userId: string;
  name: string;
}

export interface UpdateCampaign {
  id: string;
  callbackUrl: string;
  userId: string;
  name: string;
}

export interface CampaignData {
  id: number;
  callbackUrl: string;
  userId: string;
  isDeleted: boolean;
  name: string;
  uniqueId: string;
}
