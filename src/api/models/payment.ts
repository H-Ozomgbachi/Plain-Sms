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
  callbackurl: string;
}

export interface VerifyPayResponse {
  status: string;
  amount: string;
  gateway_response: string;
}
