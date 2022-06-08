import { makeAutoObservable, runInAction } from "mobx";
import { customHistory } from "../..";
import agent from "../main/apiAgent";
import { store } from "../main/appStore";
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

export class UserAccountStore {
  authenticationErrorMessage: string | null = "";
  user: UserData | null = null;
  credentials: CredentialsData | null = null;
  configuration: ConfigurationData | null = null;

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

      runInAction(() => {
        this.user = result;
      });

      store.commonStore.redirectDecision();
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

  update = async (values: UpdateUserDto) => {
    try {
      window.scrollTo(0, 0);
      store.commonStore.setLoading(true);

      const { result } = await agent.UserAccount.update(values);

      runInAction(() => {
        this.user = result;
      });
      store.commonStore.setSuccess("Profile updated ✓");
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  myAccount = async (id: string) => {
    try {
      store.commonStore.setLoading(true);
      const { result } = await agent.UserAccount.myAccount(id);
      await this.getCredentials(result.id);
      await this.getConfiguration(result.id);

      runInAction(() => {
        this.user = result;
      });

      store.commonStore.redirectDecision();
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
      const { result } = await agent.UserAccount.resetPassword(values);
      store.commonStore.setSuccess(result.message);
      customHistory.push("/account/login");
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  getConfiguration = async (id: string) => {
    try {
      const { result } = await agent.UserAccount.getConfiguration(id);
      runInAction(() => {
        this.configuration = result;
      });
    } catch (error) {
      throw error;
    }
  };

  editConfiguration = async (values: ConfigurationData) => {
    try {
      store.commonStore.setLoading(true);
      window.scrollTo(0, 0);
      const payload: EditConfigurationDTO = {
        otpLength: values.otpLength,
        otpIsAlphaNumeric: values.otpIsAlphaNumeric,
        otpMessageTemplate: values.otpMessageTemplate,
        userId: values.userId,
      };

      const { statusCode } = await agent.UserAccount.editConfiguration(
        payload.userId,
        payload
      );

      if (statusCode === 200)
        store.commonStore.setSuccess("Configuration updated successfully!");
    } catch (error) {
      throw error;
    } finally {
      this.myAccount(values.userId);
      store.commonStore.setLoading(false);
    }
  };

  getCredentials = async (id: string) => {
    try {
      const { result } = await agent.UserAccount.getCredentials(id);
      runInAction(() => {
        this.credentials = result;
      });
    } catch (error) {
      throw error;
    }
  };

  logout = () => {
    store.commonStore.setLastVisitedPathname(null);
    this.user = null;

    store.commonStore.setToken(null);
    store.commonStore.setId(null);

    customHistory.push("/account/login");
  };

  resetCredentials = async (id: string) => {
    try {
      store.commonStore.setLoading(true);
      const { statusCode } = await agent.UserAccount.resetCredentials(id);

      if (statusCode === 200) {
        this.getCredentials(id);
        store.commonStore.setSuccess("Credential Reset was Successful ✓");
      }
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };
}
