import { RecipientsOnly, RecipientsWithMessage } from "../api/models/sms";
import { toUTCConverter } from "./sharedFunctions";

export const processRecipientsArray = (e: RecipientsOnly[]) => {
  return e.map((r) => r.recipients);
};

export const processRecipientWithMessage = (
  upload: RecipientsWithMessage[],
  campaignId: string,
  sender: string,
  priority: number
) => {
  return upload.map((el) => {
    return {
      campaignId,
      recipients: [el.recipients],
      message: el.message,
      sender,
      schduleDateUTC: toUTCConverter(el.schduleDateUTC),
      priority,
    };
  });
};
