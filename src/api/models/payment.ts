export interface SendPaymentDto {
  email: string;
  amount: number;
  callbackUrl: string;
}

export interface PaymentResponse {
  access_code: string;
  reference: string;
  authorization_url: string;
  transactionRef: string;
}
