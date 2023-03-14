import { CredentialResponse } from "interfaces/google";
import { parseJwt } from "utils/parse-jwt";
import { LegacyAuthProvider as AuthProvider } from "@refinedev/core";
import axios from "axios";

export const authProvider: AuthProvider = {
  login: ({ credential }: CredentialResponse) => {
    const profileObj = credential ? parseJwt(credential) : null;

    if (profileObj) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...profileObj,
          avatar: profileObj.picture,
        })
      );
    }

    localStorage.setItem("token", `${credential}`);

    return Promise.resolve();
  },
  logout: () => {
    const token = localStorage.getItem("token");

    if (token && typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      axios.defaults.headers.common = {};
      window.google?.accounts.id.revoke(token, () => {
        return Promise.resolve();
      });
    }

    return Promise.resolve();
  },
  checkError: () => Promise.resolve(),
  checkAuth: async () => {
    const token = localStorage.getItem("token");

    if (token) {
      return Promise.resolve();
    }
    return Promise.reject();
  },

  getPermissions: () => Promise.resolve(),
  getUserIdentity: async () => {
    const user = localStorage.getItem("user");
    if (user) {
      return Promise.resolve(JSON.parse(user));
    }
  },
};
