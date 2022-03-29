import { makeAutoObservable, runInAction } from "mobx";
import { customHistory } from "../..";
import agent from "../main/apiAgent";
import { store } from "../main/appStore";
import { LoginDTO, RegisterDTO, UserData } from "../models/userAccount";

export class UserAccountStore {
  authenticationErrorMessage: string | null = "";
  user: UserData | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setAuthenticationErrorMessage = (message: string | null) => {
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
      customHistory.push("/");
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

      runInAction(() => {
        this.user = result;
      });
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };
}
