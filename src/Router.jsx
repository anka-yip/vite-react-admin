import {
  App,
  Col,
  ConfigProvider,
  Layout,
  Menu,
  Result,
  Row,
  theme,
} from "antd";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Link, Outlet, Route, Routes } from "react-router-dom";
import {
  BankOutlined,
  DollarCircleOutlined,
  HomeOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import HomePage from "./pages/HomePage";
import { defaultTheme } from "./hooks/useEndeavour";

const createMenuItem = ({ path, label, icon }) => ({
  key: path,
  label: <Link to={path}>{label}</Link>,
  icon,
});

// Placeholder components for routes that don't have implementations yet
const PlaceholderPage = ({ title }) => (
  <div>
    <h1>{title}</h1>
    <p>This page is under construction</p>
  </div>
);

const NotFoundPage = () => (
  <Row
    style={{
      minHeight: "100vh",
    }}
    justify="center"
    align="middle"
  >
    <Col span={24}>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, page not found"
        extra={<Link to="/">Back Home</Link>}
      />
    </Col>
  </Row>
);

const NAVIGATION = [
  {
    path: "/",
    label: "Home",
    icon: <HomeOutlined />,
    element: <HomePage />,
  },
  {
    path: "/payments",
    label: "Payments",
    icon: <DollarCircleOutlined />,
    element: <PlaceholderPage title="Payments" />,
  },
  {
    path: "/settlements",
    label: "Settlements",
    icon: <BankOutlined />,
    element: <PlaceholderPage title="Settlements" />,
  },
  {
    path: "/settings",
    label: "Settings",
    icon: <SettingOutlined />,
    element: <PlaceholderPage title="Settings" />,
  },
  { path: "*", element: <NotFoundPage /> },
];

// Filter navigation items that should appear in menu
const MENU_ITEMS = NAVIGATION.filter((item) => item.label);

const MainLayout = () => {
  const { token } = theme.useToken();
  const [headerHeight, setHeaderHeight] = useState(64);

  useEffect(() => {
    setHeaderHeight(document.querySelector(".ant-layout-header").clientHeight);
  }, []);

  return (
    <Layout>
      <Layout.Header>Hello</Layout.Header>
      <Layout>
        <Layout hasSider>
          <Layout.Sider
            style={{
              overflow: "auto",
              position: "fixed",
              insetInlineStart: 0,
              top: headerHeight,
              bottom: 0,
            }}
          >
            <Menu theme="dark" items={MENU_ITEMS.map(createMenuItem)} />
          </Layout.Sider>
          <Layout>
            <Layout.Content
              style={{
                marginInlineStart: 200,
                padding: token.padding,
              }}
            >
              <Outlet />
            </Layout.Content>
            <Layout.Footer
              style={{
                marginInlineStart: 200,
              }}
            >
              Powered by ANKA
            </Layout.Footer>
          </Layout>
        </Layout>
      </Layout>
    </Layout>
  );
};

function Router() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route
          element={
            <ConfigProvider theme={defaultTheme}>
              <App>
                <Layout>
                  <Outlet />
                </Layout>
              </App>
            </ConfigProvider>
          }
        >
          <Route element={<MainLayout />}>
            {NAVIGATION.map(
              ({ path, element }) =>
                element && <Route key={path} path={path} element={element} />
            )}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
