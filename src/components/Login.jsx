import { Form, Input, Button, Card, InputNumber, App } from "antd";
import React, { useState } from "react";
import { getToken } from "../api";

const LoginForm = ({ onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { message } = App.useApp();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await getToken(values.username, values.password);
      localStorage.setItem("token", response?.accessToken);
      onSuccess(response?.accessToken);
      message.success("Login successful");
    } catch (error) {
      console.error("Login failed:", error);
      message.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card title="Login">
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginForm;
