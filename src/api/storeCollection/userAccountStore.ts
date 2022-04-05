import { makeAutoObservable, runInAction } from "mobx";
import { customHistory } from "../..";
import agent from "../main/apiAgent";
import { store } from "../main/appStore";
import {
  CredentialsData,
  ForgotPasswordDTO,
  LoginDTO,
  RegisterDTO,
  ResetPasswordDTO,
  UserData,
} from "../models/userAccount";

export class UserAccountStore {
  authenticationErrorMessage: string | null = "";
  user: UserData | null = null;
  credentials: CredentialsData | null = null;
  configuration: any | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return !!this.user;
  }

  setAuthenticationErrorMessage = (message: string | null) => {
    if (message === "Unauthorized") {
      this.authenticationErrorMessage =
        "Your session expired, please login again";
      return;
    }
    this.authenticationErrorMessage = message;
  };

  login = async (values: LoginDTO) => {
    try {
      const { result } = await agent.UserAccount.login(values);

      store.commonStore.setToken(result.token);
      store.commonStore.setId(result.id);

      const { result: creds } = await this.getCredentials(result.id);

      runInAction(() => {
        this.user = result;
        this.credentials = creds;
      });

      store.commonStore.lastVisitedPathname
        ? customHistory.push(store.commonStore.lastVisitedPathname)
        : customHistory.push("/account");
    } catch (error) {
      throw error;
    }
  };

  register = async (values: RegisterDTO) => {
    try {
      await agent.UserAccount.register(values);

      this.login({
        username: values.email,
        password: values.password,
      });
    } catch (error) {
      throw error;
    }
  };

  myAccount = async (id: string) => {
    try {
      store.commonStore.setLoading(true);
      const { result } = await agent.UserAccount.myAccount(id);
      const { result: creds } = await this.getCredentials(result.id);

      runInAction(() => {
        this.user = result;
        this.credentials = creds;
      });
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  forgotPassword = async (values: ForgotPasswordDTO) => {
    try {
      store.commonStore.setLoading(true);
      const { result } = await agent.UserAccount.forgotPassword(values);
      store.commonStore.setSuccess(result.message);
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  resetPassword = async (values: ResetPasswordDTO) => {
    try {
      store.commonStore.setLoading(true);
      await agent.UserAccount.resetPassword(values);
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  getConfiguration = async (id: string) => {
    try {
      const data = await agent.UserAccount.getConfiguration(id);
      runInAction(() => {
        this.configuration = data;
      });
    } catch (error) {
      throw error;
    }
  };

  getCredentials = async (id: string) => {
    try {
      return await agent.UserAccount.getCredentials(id);
    } catch (error) {
      throw error;
    }
  };

  resetCredentials = async (id: string) => {
    try {
      store.commonStore.setLoading(true);
      const { statusCode } = await agent.UserAccount.resetCredentials(id);

      if (statusCode === 200) {
        this.getCredentials(id);
        store.commonStore.setSuccess("Credentials successfully updated");
      }

      const { result: creds } = await this.getCredentials(id);
      runInAction(() => {
        this.credentials = creds;
      });
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };
}
