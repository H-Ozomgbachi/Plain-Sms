import { Campaign } from "../endpoints/campaignEndpoints";
import { UserAccount } from "../endpoints/userAccountEndpoint";

const agent = {
  UserAccount: UserAccount,
  Campaign: Campaign,
};

export default agent;
