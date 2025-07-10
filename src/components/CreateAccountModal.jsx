import { App, Button, Form, Input, InputNumber, Modal } from "antd";
import React, { useState } from "react";
import { createAccount } from "../api";

const CreateAccountModal = ({ onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { message } = App.useApp();

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const response = await createAccount(
        values.customerID,
        values.initialCredit
      );
      if (response.status) {
        form.resetFields();
        onSuccess();
        setOpen(false);
        message.success("Account created successfully");
      } else {
        message.error("Failed to create account");
      }
    } catch (error) {
      message.error("Failed to create account:");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Create Account
      </Button>
      <Modal
        title="Create Account"
        open={open}
        okText="Create Account"
        onOk={form.submit}
        onCancel={() => setOpen(false)}
        confirmLoading={loading}
      >
        <Form
          initialValues={{ initialCredit: 2.5 }}
          form={form}
          onFinish={handleSubmit}
          style={{ marginTop: "30px" }}
        >
          <Form.Item
            name="customerID"
            label="Customer ID"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="initialCredit"
            label="Initial Credit"
            rules={[{ required: true }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateAccountModal;
