import requests from "../main/apiConfig";
import { ApiResponseData, DefaultData, IsUpdated } from "../models/shared";
import {
  ConfigurationData,
  CredentialsData,
  EditConfigurationDTO,
  ForgotPasswordDTO,
  LoginDTO,
  RegisterDTO,
  ResetPasswordDTO,
  UpdateUserDto,
  UserData,
} from "../models/userAccount";

export const UserAccount = {
  login: (payload: LoginDTO) =>
    requests.post<ApiResponseData<UserData>>("/account/login", payload),

  register: (payload: RegisterDTO) =>
    requests.post<ApiResponseData<UserData>>("/account/register", payload),

  update: (payload: UpdateUserDto) =>
    requests.put<ApiResponseData<UserData>>(
      `/account/${payload.userId}`,
      payload
    ),

  myAccount: (id: string) =>
    requests.get<ApiResponseData<UserData>>(`/account/${id}`),

  forgotPassword: (payload: ForgotPasswordDTO) =>
    requests.post<ApiResponseData<DefaultData>>(
      "/account/forgot-password",
      payload
    ),

  resetPassword: (payload: ResetPasswordDTO) =>
    requests.post<ApiResponseData<DefaultData>>(
      "/account/reset-password",
      payload
    ),

  getConfiguration: (id: string) =>
    requests.get<ApiResponseData<ConfigurationData>>(
      `/account/${id}/configuration`
    ),

  editConfiguration: (id: string, payload: EditConfigurationDTO) =>
    requests.put<ApiResponseData<IsUpdated>>(
      `/account/${id}/configuration`,
      payload
    ),

  getCredentials: (id: string) =>
    requests.get<ApiResponseData<CredentialsData>>(
      `/account/${id}/credentials`
    ),

  resetCredentials: (id: string) =>
    requests.put<ApiResponseData<boolean>>(`/account/${id}/credentials/reset`),
};
