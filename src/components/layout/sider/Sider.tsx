import React, { useState } from "react";
import {
  CanAccess,
  ITreeMenu,
  useIsExistAuthentication,
  useLogout,
  useTitle,
  useTranslate,
  useRouterContext,
  useRouterType,
  useLink,
  useMenu,
  useRefineContext,
  useActiveAuthProvider,
  pickNotDeprecated,
} from "@refinedev/core";
import { Title as DefaultTitle } from "@refinedev/mui";
import {
  ListOutlined,
  Logout,
  ExpandLess,
  ExpandMore,
  ChevronLeft,
  ChevronRight,
  MenuRounded,
  Dashboard,
} from "@mui/icons-material";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Tooltip,
  Button,
  IconButton,
} from "@mui/material";
import type { RefineLayoutSiderProps } from "@refinedev/mui";

export const CustomSider: React.FC<RefineLayoutSiderProps> = ({
  Title: TitleFromProps,
  render,
  meta,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [opened, setOpened] = useState(false);

  const drawerWidth = () => {
    if (collapsed) return 64;
    return 200;
  };

  const t = useTranslate();
  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();
  const ActiveLink = routerType === "legacy" ? LegacyLink : Link;
  const { hasDashboard } = useRefineContext();
  const translate = useTranslate();

  const { menuItems, selectedKey, defaultOpenKeys } = useMenu({ meta });
  const isExistAuthentication = useIsExistAuthentication();
  const TitleFromContext = useTitle();
  const authProvider = useActiveAuthProvider();
  const { mutate: mutateLogout } = useLogout({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });

  const [open, setOpen] = useState<{ [k: string]: any }>({});

  React.useEffect(() => {
    setOpen((previous) => {
      const previousKeys: string[] = Object.keys(previous);
      const previousOpenKeys = previousKeys.filter((key) => previous[key]);

      const uniqueKeys = new Set([...previousOpenKeys, ...defaultOpenKeys]);
      const uniqueKeysRecord = Object.fromEntries(
        Array.from(uniqueKeys.values()).map((key) => [key, true])
      );
      return uniqueKeysRecord;
    });
  }, [defaultOpenKeys]);

  const RenderToTitle = TitleFromProps ?? TitleFromContext ?? DefaultTitle;

  const handleClick = (key: string) => {
    setOpen({ ...open, [key]: !open[key] });
  };

  const renderTreeView = (tree: ITreeMenu[], selectedKey?: string) => {
    return tree.map((item: ITreeMenu) => {
      const { icon, label, route, name, children, parentName, meta, options } =
        item;
      const isOpen = open[item.key || ""] || false;

      const isSelected = item.key === selectedKey;
      const isNested = !(
        pickNotDeprecated(meta?.parent, options?.parent, parentName) ===
        undefined
      );

      if (children.length > 0) {
        return (
          <CanAccess
            key={item.key}
            resource={name.toLowerCase()}
            action="list"
            params={{
              resource: item,
            }}
          >
            <div key={item.key}>
              <Tooltip title={label ?? name} placement="right" arrow>
                <ListItemButton
                  onClick={() => {
                    if (collapsed) {
                      setCollapsed(false);
                      if (!isOpen) {
                        handleClick(item.key || "");
                      }
                    } else {
                      handleClick(item.key || "");
                    }
                  }}
                  className="bg-green hover:bg-gray"
                  sx={{
                    pl: isNested ? 4 : 2,
                    justifyContent: "center",
                    "&.Mui-selected": {
                      "&:hover": {
                        // backgroundColor: "transparent",
                      },
                      // backgroundColor: "transparent",
                    },
                  }}
                >
                  <ListItemIcon
                    className="flex justify-center text-black"
                    sx={{
                      minWidth: 36,
                      // justifyContent: "center",
                      // color: "secondary.contrastText",
                    }}
                  >
                    {icon ?? <ListOutlined />}
                  </ListItemIcon>
                  <ListItemText
                    primary={label}
                    primaryTypographyProps={{
                      noWrap: true,
                      fontSize: "14px",
                      fontWeight: isSelected ? "bold" : "normal",
                    }}
                  />
                  {!collapsed && (isOpen ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>
              </Tooltip>
              {!collapsed && (
                <Collapse
                  in={open[item.key || ""]}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {renderTreeView(children, selectedKey)}
                  </List>
                </Collapse>
              )}
            </div>
          </CanAccess>
        );
      }

      return (
        <CanAccess
          key={item.key}
          resource={name.toLowerCase()}
          action="list"
          params={{ resource: item }}
        >
          <Tooltip
            title={label ?? name}
            placement="right"
            disableHoverListener={!collapsed}
            arrow
          >
            <ListItemButton
              component={ActiveLink}
              to={route}
              selected={isSelected}
              onClick={() => {
                setOpened(false);
              }}
              className="flex justify-center text-black hover:bg-green"
              sx={{
                pl: isNested ? 4 : 2,
                py: isNested ? 1.25 : 1,
                "&.Mui-selected": {
                  "&:hover": {
                    backgroundColor: "#3C6E71",
                  },
                  backgroundColor: "#D9D9D9",
                  color: "#353535",
                },
                justifyContent: "center",
              }}
            >
              <ListItemIcon
                className="flex justify-center text-black"
                sx={{
                  minWidth: 36,
                }}
              >
                {icon ?? <ListOutlined />}
              </ListItemIcon>
              <ListItemText
                primary={label}
                className="text-black"
                primaryTypographyProps={{
                  noWrap: true,
                  fontSize: "14px",
                  fontWeight: isSelected ? "bold" : "normal",
                }}
              />
            </ListItemButton>
          </Tooltip>
        </CanAccess>
      );
    });
  };

  const dashboard = hasDashboard ? (
    <CanAccess resource="dashboard" action="list">
      <Tooltip
        title={translate("dashboard.title", "Dashboard")}
        placement="right"
        disableHoverListener={!collapsed}
        arrow
      >
        <ListItemButton
          component={ActiveLink}
          to="/"
          selected={selectedKey === "/"}
          onClick={() => {
            setOpened(false);
          }}
          sx={{
            pl: 2,
            py: 1,
            "&.Mui-selected": {
              "&:hover": {
                backgroundColor: "transparent",
              },
              backgroundColor: "transparent",
            },
            justifyContent: "center",
          }}
        >
          <ListItemIcon
            sx={{
              justifyContent: "center",
              minWidth: 36,
              color: "secondary.contrastText",
            }}
          >
            <Dashboard />
          </ListItemIcon>
          <ListItemText
            primary={translate("dashboard.title", "Dashboard")}
            primaryTypographyProps={{
              noWrap: true,
              fontSize: "14px",
              fontWeight: selectedKey === "/" ? "bold" : "normal",
            }}
          />
        </ListItemButton>
      </Tooltip>
    </CanAccess>
  ) : null;

  const logout = isExistAuthentication && (
    <Tooltip
      title={t("buttons.logout", "Logout")}
      placement="right"
      disableHoverListener={!collapsed}
      arrow
    >
      <ListItemButton
        key="logout"
        onClick={() => mutateLogout()}
        className="text-black hover:bg-green font-bold flex justify-center"
      >
        <ListItemIcon
          className="text-black flex justify-center"
          sx={{
            minWidth: 36,
          }}
        >
          <Logout />
        </ListItemIcon>
        <ListItemText
          primary={t("buttons.logout", "Logout")}
          primaryTypographyProps={{
            noWrap: true,
            fontSize: "14px",
          }}
        />
      </ListItemButton>
    </Tooltip>
  );

  const items = renderTreeView(menuItems, selectedKey);

  const renderSider = () => {
    if (render) {
      return render({
        dashboard,
        logout,
        items,
        collapsed,
      });
    }
    return (
      <>
        {dashboard}
        {items}
        {logout}
      </>
    );
  };

  const drawer = (
    <List disablePadding className="text-black bg-white mt-1">
      {renderSider()}
    </List>
  );

  return (
    <>
      <Box
        sx={{
          width: { xs: drawerWidth() },
          display: {
            xs: "none",
            md: "block",
          },
          transition: "width 0.3s ease",
        }}
      />
      <Box
        component="nav"
        className="flex fixed"
        sx={{
          zIndex: 1101,
          width: { sm: drawerWidth() },
        }}
      >
        <Drawer
          variant="temporary"
          open={opened}
          onClose={() => setOpened(false)}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          // className="bg-white"
          sx={{
            display: { sm: "block", md: "none" },
            "& .MuiDrawer-paper": {
              width: 256,
              // bgcolor: "secondary.main",
            },
          }}
        >
          <Box className="h-16 flex items-center justify-center">
            <RenderToTitle collapsed={false} />
          </Box>
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          PaperProps={{ elevation: 1 }}
          className="bg-white"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              // This is the Background color of Sider Body
              // bgcolor: "secondary.main",
              overflow: "hidden",
              transition: "width 200ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
            },
          }}
          open
        >
          <Box className="h-16 flex items-center justify-center">
            <RenderToTitle collapsed={collapsed} />
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              overflowX: "hidden",
              overflowY: "auto",
            }}
          >
            {drawer}
          </Box>
          <Button
            className="border-solid border-t border-black text-white bg-blue hover:bg-green text-center rounded-none"
            fullWidth
            size="large"
            onClick={() => setCollapsed((prev) => !prev)}
          >
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </Button>
        </Drawer>
        <Box
          sx={{
            display: { xs: "block", md: "none" },
            position: "fixed",
            top: "64px",
            left: "0px",
            borderRadius: "0 6px 6px 0",
            bgcolor: "secondary.main",
            zIndex: 1199,
            width: "36px",
          }}
        >
          <IconButton
            sx={{ color: "#fff", width: "36px" }}
            onClick={() => setOpened((prev) => !prev)}
          >
            <MenuRounded />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};
