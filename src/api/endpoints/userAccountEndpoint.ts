import requests from "../main/apiConfig";
import { ApiResponseData, DefaultData } from "../models/shared";
import {
  CredentialsData,
  ForgotPasswordDTO,
  LoginDTO,
  RegisterDTO,
  ResetPasswordDTO,
  UserData,
} from "../models/userAccount";

export const UserAccount = {
  login: (payload: LoginDTO) =>
    requests.post<ApiResponseData<UserData>>("/account/login", payload),

  register: (payload: RegisterDTO) =>
    requests.post<ApiResponseData<UserData>>("/account/register", payload),

  myAccount: (id: string) =>
    requests.get<ApiResponseData<UserData>>(`/account/${id}`),

  forgotPassword: (payload: ForgotPasswordDTO) =>
    requests.post<ApiResponseData<DefaultData>>(
      "/account/forgot-password",
      payload
    ),

  resetPassword: (payload: ResetPasswordDTO) =>
    requests.post("/account/reset-password", payload),

  getConfiguration: (id: string) =>
    requests.get<any>(`/account/${id}/configuration`),

  getCredentials: (id: string) =>
    requests.get<ApiResponseData<CredentialsData>>(
      `/account/${id}/credentials`
    ),

  resetCredentials: (id: string) =>
    requests.put<ApiResponseData<boolean>>(`/account/${id}/credentials/reset`),
};
