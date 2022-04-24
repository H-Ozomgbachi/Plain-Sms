export interface RecipientsOnly {
  recipients: string;
  __rowNum__: number;
}

export interface CreateSmsDto {
  campaignId: string;
  recipients: string[];
  message: string;
  sender: string;
  schduleDateUTC: string;
  priority: number;
}

interface QueuedDetail {
  correlationId: string;
  recipient: string;
  message: string;
  responseCode: string;
  errorMessage: string;
  numberOfMessages: number;
  estimatedCost: string;
}

export interface SendSmsResponse {
  payload: {
    recipients: string[];
    message: string;
    sender: string;
    schduleDateUTC: string;
    priority: number;
  };
  status: string;
  failedRecipients: string[];
  queuedRecipients: QueuedDetail[];
}
