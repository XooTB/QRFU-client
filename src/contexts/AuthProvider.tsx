import { CredentialResponse } from "interfaces/google";
import { parseJwt } from "utils/parse-jwt";
import axios from "axios";
import { AuthBindings } from "@refinedev/core";

export const authProvider: AuthBindings = {
  login: async ({ credential }: CredentialResponse) => {
    const profileObj = credential ? parseJwt(credential) : null;

    if (profileObj) {
      const response = await fetch(`${import.meta.env.VITE_API}/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: profileObj.name,
          email: profileObj.email,
          avatar: profileObj.picture,
        }),
      });

      const data = await response.json();

      if (response.status === 200) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...profileObj,
            avatar: profileObj.picture,
          })
        );
      } else {
        return {
          success: false,
        };
      }

      localStorage.setItem("token", `${credential}`);

      return {
        success: true,
        redirectTo: "/",
      };
    }

    return {
      success: false,
    };
  },
  logout: async () => {
    const token = localStorage.getItem("token");

    if (token && typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      axios.defaults.headers.common = {};
      window.google?.accounts.id.revoke(token, () => {
        return {};
      });
    }

    return {
      success: true,
      redirectTo: "/login",
    };
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
  check: async () => {
    const token = localStorage.getItem("token");

    if (token) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      error: new Error("Not authenticated"),
      logout: true,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const user = localStorage.getItem("user");
    if (user) {
      return JSON.parse(user);
    }

    return null;
  },
};
