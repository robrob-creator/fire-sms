import React from "react";
import { CheckCircleFilled } from "@ant-design/icons";
import { Typography } from "antd";
const { Title } = Typography;
export const Cancel = () => {
  return (
    <div style={{ padding: 24, minHeight: 380, textAlign: "center" }}>
      <CheckCircleFilled
        style={{ fontSize: 100, color: "green", marginTop: 30 }}
      />
      <Title level={3}>SMS CANCELED</Title> <Title level={4}> Greetings</Title>
      <Title level={5}> Thank you for checking have a good day!</Title>
    </div>
  );
};
