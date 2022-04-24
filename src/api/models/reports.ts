export interface MessageReport {
  id: number;
  sender: string;
  recipient: string;
  sentOnUtc: string;
  createdOnUtc: string;
  campaignId: string;
  correlationId: string;
  messageParts: number;
  priority: number;
  messageType: string;
  status: number;
  text: string;
  responseCode: string;
}
