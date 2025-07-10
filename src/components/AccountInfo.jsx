import { BankOutlined, UserOutlined, WalletOutlined } from "@ant-design/icons";
import { Card, Col, Empty, Row, Statistic, Table } from "antd";
import React from "react";

const AccountInfo = ({ data }) => {
  // Transform account transactions for the table
  const accountColumns = [
    {
      title: "Account Number",
      dataIndex: "accountNumber",
      key: "accountNumber",
    },
    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
      render: (balance) => `$${balance.toLocaleString()}`,
    },
    {
      title: "Transactions",
      dataIndex: "transactionList",
      key: "transactions",
      render: (transactions) => transactions.length,
    },
  ];

  const transactionColumns = [
    {
      title: "Reference",
      dataIndex: "transactionReference",
      key: "transactionReference",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount, record) =>
        `${record.currency} ${amount.toLocaleString()}`,
    },
    {
      title: "Type",
      dataIndex: "transactionType",
      key: "transactionType",
      render: (type) => (
        <span style={{ color: type === "CREDIT" ? "#52c41a" : "#f5222d" }}>
          {type}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
    },
  ];

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card>
            <Statistic
              title="Total Balance"
              value={data?.totalBalance ?? 0}
              precision={2}
              prefix={<WalletOutlined />}
              suffix="USD"
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Statistic
              title="Account Name"
              value={`${data?.name} ${data?.surname}`}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
      </Row>
      <Card title="Account Summary" style={{ marginTop: "24px" }}>
        <Table
          dataSource={data?.accountTransactions ?? []}
          columns={accountColumns}
          rowKey="accountNumber"
          pagination={false}
        />
      </Card>

      <Card title="Recent Transactions" style={{ marginTop: "24px" }}>
        <Table
          dataSource={data?.accountTransactions?.flatMap((account) =>
            account.transactionList.map((transaction) => ({
              ...transaction,
              accountNumber: account.accountNumber,
            }))
          )}
          columns={transactionColumns}
          rowKey="transactionReference"
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};

export default AccountInfo;
