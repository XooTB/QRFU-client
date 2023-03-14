import { Refine } from "@refinedev/core";
import { notificationProvider, RefineSnackbarProvider, ReadyPage, ErrorComponent } from "@refinedev/mui";
import { CssBaseline, GlobalStyles } from "@mui/material";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router-v6/legacy";
import axios, { AxiosRequestConfig } from "axios";
import { ColorModeContextProvider, authProvider } from "contexts";
import { Title, Sider, Layout, Header } from "components/layout";
import { Login, CardProfile, MyVCards, GenerateVCard } from "pages";
import { RecentActorsOutlined } from "@mui/icons-material";

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
  return <>
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
              name: "cards",
              list: MyVCards,
              create: GenerateVCard,
              icon: <RecentActorsOutlined />,
            },
          ]}
          Title={Title}
          Sider={Sider}
          Layout={Layout}
          Header={Header}
          legacyRouterProvider={{
            ...routerProvider,
            routes: [
              {
                path: "/p/:id",
                element: <CardProfile />,
              },
            ],
          }}
          legacyAuthProvider={authProvider}
          LoginPage={Login}
        />
      </RefineSnackbarProvider>
    </ColorModeContextProvider>
  </>;
}

export default App;
