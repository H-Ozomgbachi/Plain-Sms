import requests from "../main/apiConfig";
import { ApiResponseData } from "../models/shared";
import { LoginDTO, RegisterDTO, UserData } from "../models/userAccount";

export const UserAccount = {
  login: (payload: LoginDTO) =>
    requests.post<ApiResponseData<UserData>>("/account/login", payload),

  register: (payload: RegisterDTO) =>
    requests.post<ApiResponseData<UserData>>("/account/register", payload),

  myAccount: (id: string) =>
    requests.get<ApiResponseData<UserData>>(`/account/${id}`),
};
