import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { makeAutoObservable, reaction } from "mobx";
import { customHistory } from "../..";
import { store } from "../main/appStore";

export class CommonStore {
  id: string | null = window.localStorage.getItem("id-plainsms");
  token: string | null = window.localStorage.getItem("jwt-plainsms");
  error: string | null = null;
  success: string | null = null;
  loading = false;
  drawerVisible = false;
  modalVisible = false;
  modalContent: ReactJSXElement | null = null;
  isThereError = false;
  isThereSuccess = false;
  lastVisitedPathname: string | null = null;
  onreloadPath: string | null = window.localStorage.getItem(
    "reload-path-plainsms"
  );

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.token,
      (token) => {
        if (token) {
          window.localStorage.setItem("jwt-plainsms", token);
        } else {
          window.localStorage.removeItem("jwt-plainsms");
        }
      }
    );

    reaction(
      () => this.id,
      (id) => {
        if (id) {
          window.localStorage.setItem("id-plainsms", id);
        } else {
          window.localStorage.removeItem("id-plainsms");
        }
      }
    );

    reaction(
      () => this.onreloadPath,
      (onreloadPath) => {
        if (onreloadPath) {
          window.localStorage.setItem("reload-path-plainsms", onreloadPath);
        } else {
          window.localStorage.removeItem("reload-path-plainsms");
        }
      }
    );
  }

  setLoading = (value: boolean) => (this.loading = value);

  setDrawerVisible = (value: boolean) => (this.drawerVisible = value);

  setModalVisible = (value: boolean) => (this.modalVisible = value);

  setModalContent = (content: ReactJSXElement) => {
    this.modalVisible = true;
    this.modalContent = content;
  };

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

  setOnreloadPath = (path: string | null) => {
    this.onreloadPath = path;
  };

  setLastVisitedPathname = (pathname: string | null) => {
    this.lastVisitedPathname = pathname;
  };

  redirectDecision = () => {
    let linkToDirect;

    if (store.paymentStore.trxnRef) {
      linkToDirect = store.paymentStore.trxnRef;
      return customHistory.push(linkToDirect);
    }

    if (
      this.lastVisitedPathname !== null &&
      this.lastVisitedPathname !== "/account/login" &&
      this.lastVisitedPathname !== "/account/forgot-password"
    ) {
      linkToDirect = this.lastVisitedPathname;
    } else if (
      this.onreloadPath !== null &&
      this.onreloadPath !== "/account/login" &&
      this.onreloadPath !== "/account/forgot-password" &&
      this.onreloadPath !== "/account/register" &&
      this.onreloadPath !== "/account/reset-password"
    ) {
      linkToDirect = this.onreloadPath;
    } else {
      linkToDirect = "/account";
    }

    customHistory.push(linkToDirect);
  };
}
