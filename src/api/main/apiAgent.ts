import { Campaign } from "../endpoints/campaignEndpoints";
import { Payment } from "../endpoints/paymentEndpoint";
import { Reports } from "../endpoints/reportsEndpoint";
import { Sms } from "../endpoints/smsEndpoint";
import { UserAccount } from "../endpoints/userAccountEndpoint";

const agent = {
  UserAccount: UserAccount,
  Campaign: Campaign,
  Reports: Reports,
  Sms: Sms,
  Payment: Payment,
};

export default agent;
