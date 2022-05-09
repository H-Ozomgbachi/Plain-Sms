import requests from "../main/apiConfig";
import {
  PaymentResponse,
  SendPaymentDto,
  VerifyPayResponse,
} from "../models/payment";
import { ApiResponseData } from "../models/shared";

export const Payment = {
  initialize: (payload: SendPaymentDto) =>
    requests.post<ApiResponseData<PaymentResponse>>(
      "/payment/initialize",
      payload
    ),

  verify: (txnref: string) =>
    requests.get<ApiResponseData<VerifyPayResponse>>(
      `/payment/verify/${txnref}`
    ),
};
