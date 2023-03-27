import { Refine, Authenticated } from "@refinedev/core";
import {
  notificationProvider,
  RefineSnackbarProvider,
  ErrorComponent,
  Layout,
} from "@refinedev/mui";
import { CssBaseline, GlobalStyles } from "@mui/material";
import dataProvider from "@refinedev/simple-rest";
import axios, { AxiosRequestConfig } from "axios";
import { ColorModeContextProvider, authProvider } from "contexts";
import { RecentActorsOutlined, AccountCircle } from "@mui/icons-material";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import routerBindings, {
  CatchAllNavigate,
  NavigateToResource,
} from "@refinedev/react-router-v6";
import {
  Login,
  CardProfile,
  MyVCards,
  GenerateVCard,
  Profile,
  EditVCard,
} from "pages";
import { Title, Header, CustomSider } from "components";

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
                {
                  name: "profile",
                  list: "/profile",
                  icon: <AccountCircle />,
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
              }}
            >
              <Routes>
                <Route
                  element={
                    <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                      <Layout Header={Header} Sider={CustomSider} Title={Title}>
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
                    <Route path="edit/:id" element={<EditVCard />} />
                  </Route>
                  <Route path="/profile">
                    <Route index element={<Profile />} />
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
                <Route>
                  <Route path="/p/:id" element={<CardProfile />} />
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
