import React from "react";

import { Refine, GitHubBanner } from "@pankod/refine-core";
import {
  notificationProvider,
  RefineSnackbarProvider,
  CssBaseline,
  GlobalStyles,
  ReadyPage,
  ErrorComponent,
} from "@pankod/refine-mui";

import dataProvider from "@pankod/refine-simple-rest";
import { MuiInferencer } from "@pankod/refine-inferencer/mui";
import routerProvider from "@pankod/refine-react-router-v6";
import axios, { AxiosRequestConfig } from "axios";
import { ColorModeContextProvider, authProvider } from "contexts";
import { Title, Sider, Layout, Header } from "components/layout";
import {
  Login,
  CardProfile,
  MyQRCodes,
  GenerateQrCode,
  EditQRCode,
} from "pages";

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (request.headers) {
    request.headers["Authorization"] = `Bearer ${token}`;
  } else {
    request.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return request;
});

function App() {
  return (
    <>
      <ColorModeContextProvider>
        <CssBaseline />
        <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
        <RefineSnackbarProvider>
          <Refine
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            notificationProvider={notificationProvider}
            ReadyPage={ReadyPage}
            catchAll={<ErrorComponent />}
            resources={[
              {
                name: "QR-Code",
                list: MyQRCodes,
                create: GenerateQrCode,
                edit: EditQRCode,
              },
            ]}
            Title={Title}
            Sider={Sider}
            Layout={Layout}
            Header={Header}
            routerProvider={{
              ...routerProvider,
              routes: [
                {
                  path: "/p/:id",
                  element: <CardProfile />,
                },
              ],
            }}
            authProvider={authProvider}
            LoginPage={Login}
          />
        </RefineSnackbarProvider>
      </ColorModeContextProvider>
    </>
  );
}

export default App;
