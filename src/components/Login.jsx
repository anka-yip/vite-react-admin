import { LoginOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const onFinish = (values) => {
    navigate("/");
  };

  return (
    <Card title="Restricted Area">
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          username: "admin",
          password: "admin",
        }}
      >
        <Form.Item label="Username" required name="username">
          <Input autoFocus required />
        </Form.Item>
        <Form.Item label="Password" required name="password">
          <Input.Password required />
        </Form.Item>
        <Form.Item label="OTP" required>
          <Input.OTP />
        </Form.Item>
        <Form.Item>
          <Button
            block
            type="primary"
            htmlType="submit"
            icon={<LoginOutlined />}
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default Login;
