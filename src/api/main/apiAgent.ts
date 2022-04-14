import { Campaign } from "../endpoints/campaignEndpoints";
import { Reports } from "../endpoints/reportsEndpoint";
import { Sms } from "../endpoints/smsEndpoint";
import { UserAccount } from "../endpoints/userAccountEndpoint";

const agent = {
  UserAccount: UserAccount,
  Campaign: Campaign,
  Reports: Reports,
  Sms: Sms,
};

export default agent;
