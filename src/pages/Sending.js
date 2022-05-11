import React from "react";
import { CheckCircleFilled } from "@ant-design/icons";
import { Typography } from "antd";
const { Title } = Typography;
export const Sending = () => {
  return (
    <div style={{ padding: 24, minHeight: 380, textAlign: "center" }}>
      <CheckCircleFilled
        style={{ fontSize: 100, color: "green", marginTop: 30 }}
      />
      <Title level={3}>Command Sent</Title> <Title level={4}> Note:</Title>
      <Title level={5}>
        {" "}
        Please understand that there would be a little delay, as we would need
        to send the command to the system thank you!
      </Title>
    </div>
  );
};
