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
import React from "react";
import { BrowserRouter, Link, Outlet, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import {
  BankOutlined,
  DollarCircleOutlined,
  HomeOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import HomePage from "./pages/HomePage";

const createMenuItem = ({ path, label, icon }) => ({
  key: path,
  label: <Link to={path}>{label}</Link>,
  icon,
});

const MENU_ITEMS = [
  { path: "/", label: "Home", icon: <HomeOutlined /> },
  { path: "/payments", label: "Payments", icon: <DollarCircleOutlined /> },
  { path: "/settlements", label: "Settlements", icon: <BankOutlined /> },
  { path: "/settings", label: "Settings", icon: <SettingOutlined /> },
];

const THEME_CONFIG = {
  token: {
    fontFamily: "'IBM Plex Sans',Inter",
    padding: 16,
  },
  algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
};

const MainLayout = () => {
  const { token } = theme.useToken();

  return (
    <Layout hasSider>
      <Layout.Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          insetInlineStart: 0,
          top: 0,
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
  );
};

const LoginLayout = () => (
  <Row
    justify="center"
    align="middle"
    style={{
      minHeight: "100vh",
    }}
  >
    <Col span={6}>
      <Login />
    </Col>
  </Row>
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

function Router() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route
          element={
            <ConfigProvider theme={THEME_CONFIG}>
              <App>
                <Layout>
                  <Outlet />
                </Layout>
              </App>
            </ConfigProvider>
          }
        >
          <Route path="/login" element={<LoginLayout />} />
          <Route element={<MainLayout />}>
            <Route index element={<HomePage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
