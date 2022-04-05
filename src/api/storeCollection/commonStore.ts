import { makeAutoObservable, reaction } from "mobx";

export class CommonStore {
  id: string | null = window.localStorage.getItem("id");
  token: string | null = window.localStorage.getItem("jwt");
  error: string | null = null;
  success: string | null = null;
  loading = false;
  drawerVisible = false;
  isThereError = false;
  isThereSuccess = false;
  lastVisitedPathname: string | null = null;

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.token,
      (token) => {
        if (token) {
          window.localStorage.setItem("jwt", token);
        } else {
          window.localStorage.removeItem("jwt");
        }
      }
    );

    reaction(
      () => this.id,
      (id) => {
        if (id) {
          window.localStorage.setItem("id", id);
        } else {
          window.localStorage.removeItem("id");
        }
      }
    );
  }

  setLoading = (value: boolean) => (this.loading = value);

  setDrawerVisible = (value: boolean) => (this.drawerVisible = value);

  setIsThereError = (value: boolean) => (this.isThereError = value);

  setError = async (message: string | null) => {
    if (message) {
      this.setIsThereError(true);
    }
    this.error = message;

    setTimeout(() => {
      this.setIsThereError(false);
    }, 8000);
  };

  setIsThereSuccess = (value: boolean) => (this.isThereSuccess = value);

  setSuccess = async (message: string | null) => {
    if (message) {
      this.setIsThereSuccess(true);
    }
    this.success = message;

    setTimeout(() => {
      this.setIsThereSuccess(false);
    }, 8000);
  };

  setToken = (token: string | null) => {
    this.token = token;
  };

  setId = (id: string | null) => {
    this.id = id;
  };

  setLastVisitedPathname = (pathname: string | null) => {
    this.lastVisitedPathname = pathname;
  };
}
