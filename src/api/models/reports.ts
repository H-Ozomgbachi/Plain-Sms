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

export interface ResponseReport {
  id: number;
  response: string;
  campaignId: string;
  recipient: string;
  createdOnUtc: string;
}

export interface OtpReport {
  id: number;
  recipient: string;
  expiresOnUtc: string;
  createdOnUtc: string;
  uniqueId: string;
  sent: number;
  isVerified: boolean;
  code: string;
}
