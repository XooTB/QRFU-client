import { Refine, Authenticated } from "@refinedev/core";
import {
  notificationProvider,
  RefineSnackbarProvider,
  ReadyPage,
  ErrorComponent,
} from "@refinedev/mui";
import { CssBaseline, GlobalStyles } from "@mui/material";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router-v6/legacy";
import axios, { AxiosRequestConfig } from "axios";
import { ColorModeContextProvider, authProvider } from "contexts";
import { Title, Sider, Header } from "components/layout";
import { Layout } from "@refinedev/mui";
import { Login, CardProfile, MyVCards, GenerateVCard } from "pages";
import { RecentActorsOutlined } from "@mui/icons-material";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import routerBindings, {
  CatchAllNavigate,
  NavigateToResource,
} from "@refinedev/react-router-v6";

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
      <BrowserRouter>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <Refine
              dataProvider={dataProvider(import.meta.env.VITE_API)}
              notificationProvider={notificationProvider}
              routerProvider={routerBindings}
              authProvider={authProvider}
              resources={[
                {
                  name: "cards",
                  list: "/cards",
                  create: "/cards/create",
                  edit: "/cards/edit/:id",
                  icon: <RecentActorsOutlined />,
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
              }}
              // ReadyPage={ReadyPage}
              // catchAll={<ErrorComponent />}
              // Title={Title}
              // Sider={Sider}
              // Layout={Layout}
              // Header={Header}
              // legacyRouterProvider={{
              //   ...routerProvider,
              //   routes: [
              //     {
              //       path: "/p/:id",
              //       element: <CardProfile />,
              //     },
              //   ],
              // }}
              // LoginPage={Login}
            >
              <Routes>
                <Route
                  element={
                    <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                      <Layout Header={Header}>
                        <Outlet />
                      </Layout>
                    </Authenticated>
                  }
                >
                  <Route
                    index
                    element={<NavigateToResource resource="cards" />}
                  />
                  <Route path="/cards">
                    <Route index element={<MyVCards />} />
                    <Route path="create" element={<GenerateVCard />} />
                  </Route>
                </Route>
                <Route
                  element={
                    <Authenticated fallback={<Outlet />}>
                      <NavigateToResource />
                    </Authenticated>
                  }
                >
                  <Route path="/login" element={<Login />} />
                </Route>
                <Route
                  element={
                    <Authenticated>
                      <Layout Header={Header}>
                        <Outlet />
                      </Layout>
                    </Authenticated>
                  }
                >
                  <Route path="*" element={<ErrorComponent />} />
                </Route>
              </Routes>
            </Refine>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
