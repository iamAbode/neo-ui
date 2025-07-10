import {
  Button,
  Col,
  Empty,
  Flex,
  Input,
  Row,
  Space,
  Spin,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { getCustomerInformation } from "../api";
import AccountInfo from "./AccountInfo";
import CreateAccountModal from "./CreateAccountModal";
const { Title } = Typography;

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [customerId, setCustomerId] = useState(null);
  const [loading, setLoading] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    location.reload();
  };

  const fetchData = async () => {
    setLoading(true);
    const res = await getCustomerInformation(customerId);
    setData(res);
    setLoading(false);
  };

  useEffect(() => {
    if (customerId) {
      fetchData();
    }
  }, [customerId]);

  return (
    <div style={{ padding: "24px" }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Flex justify="space-between" align="center">
            <Title level={2}>Dashboard</Title>
            <Space>
              <CreateAccountModal onSuccess={fetchData} />
              <Button danger onClick={logout}>
                Logout
              </Button>
            </Space>
          </Flex>
        </Col>

        <Col span={24}>
          <Space direction="vertical" style={{ width: "100%" }}>
            <Flex justify="space-between" align="center">
              <Title level={3}>Customer Information</Title>
              <Input.Search
                placeholder="Search by customer ID"
                onSearch={(value) => setCustomerId(value)}
                style={{ width: "200px" }}
              />
            </Flex>

            <Spin spinning={loading}>
              {data ? (
                <AccountInfo data={data} />
              ) : (
                <Empty
                  description="No data found"
                  style={{ marginTop: "80px" }}
                />
              )}
            </Spin>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
