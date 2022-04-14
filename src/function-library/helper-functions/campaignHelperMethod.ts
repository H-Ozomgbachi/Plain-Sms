import { CampaignData } from "../../api/models/campaign";

export const campaignOptionsBuilder = (values: CampaignData[]) => {
  return values.map((el) => {
    return {
      text: `${el.name} `,
      value: el.uniqueId,
    };
  });
};
