export interface RecipientsOnly {
  recipients: string;
  __rowNum__: number;
}

export interface CreateSmsDto {
  campaignId?: number;
  recipients: string[];
  message: string;
  sender: string;
  schduleDateUTC: string;
  priority: number;
}
