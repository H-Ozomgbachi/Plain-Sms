import { makeAutoObservable, runInAction } from "mobx";
import agent from "../main/apiAgent";
import { store } from "../main/appStore";
import {
  CampaignData,
  CreateCampaign,
  UpdateCampaign,
} from "../models/campaign";

export class CampaignStore {
  campaigns: CampaignData[] = [];
  currentCampaign: CampaignData | null = null;
  constructor() {
    makeAutoObservable(this);
  }

  createCampaign = async (values: CreateCampaign) => {
    try {
      store.commonStore.setLoading(true);
      const { statusCode } = await agent.Campaign.create(values);
      if (statusCode === 200) {
        store.commonStore.setSuccess("Campaign created successfully");
      }
    } catch (error) {
      throw error;
    } finally {
      this.getAllCampaigns();
      store.commonStore.setLoading(false);
    }
  };

  editCampaign = async (values: UpdateCampaign) => {
    try {
      store.commonStore.setLoading(true);
      const { statusCode } = await agent.Campaign.edit(values);
      if (statusCode === 200) {
        store.commonStore.setSuccess("Campaign updated successfully");
      }
    } catch (error) {
      throw error;
    } finally {
      this.getOneCampaign(values.id);
      store.commonStore.setLoading(false);
    }
  };

  getOneCampaign = async (id: string) => {
    try {
      store.commonStore.setLoading(true);
      const { result } = await agent.Campaign.getOne(id);
      runInAction(() => (this.currentCampaign = result));
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  getAllCampaigns = async () => {
    try {
      const { result } = await agent.Campaign.getAll();

      runInAction(() => {
        this.campaigns = result;
      });
    } catch (error) {
      throw error;
    }
  };
}
