import { RecipientsOnly } from "../../api/models/sms";

export const processRecipientsArray = (e: RecipientsOnly[]) => {
  return e.map((r) => r.recipients);
};
