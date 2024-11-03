import { App, Col, ConfigProvider, Layout, Menu, Row, theme } from "antd";
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

const MenuItem = (key, label, icon) => {
  return {
    key,
    label: <Link to={key}>{label}</Link>,
    icon,
  };
};

const Theme = {
  token: {
    fontFamily: "Inter",
  },
  algorithm: [theme.darkAlgorithm],
};

function Router() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route
          element={
            <ConfigProvider theme={Theme}>
              <App>
                <Layout>
                  <Outlet />
                </Layout>
              </App>
            </ConfigProvider>
          }
          errorElement={<>Error</>}
        >
          <Route
            path="/login"
            element={
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
            }
          />
          <Route
            element={
              <Layout hasSider>
                <Layout.Sider
                  style={{
                    overflow: "auto",
                    height: "100vh",
                    position: "fixed",
                    insetInlineStart: 0,
                    top: 0,
                    bottom: 0,
                    // scrollbarWidth: "thin",
                    // scrollbarGutter: "stable",
                  }}
                >
                  <Menu
                    theme="dark"
                    items={[
                      MenuItem("/", "Home", <HomeOutlined />),
                      MenuItem(
                        "/payments",
                        "Payments",
                        <DollarCircleOutlined />
                      ),
                      MenuItem("/settlements", "Settlements", <BankOutlined />),
                      MenuItem("/settings", "Settings", <SettingOutlined />),
                    ]}
                  />
                </Layout.Sider>
                <Layout>
                  <Layout.Content
                    style={{
                      marginInlineStart: 200,
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
            }
          >
            <Route index element={<HomePage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
