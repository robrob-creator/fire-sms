import { Layout, Menu, Breadcrumb, Typography, Button } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import "./App.css";
import {
  BrowserRouter as Router,
  useLocation,
  useNavigate,
  Routes,
  Route,
} from "react-router-dom";
import React, { useEffect, useState } from "react";
import fire from "./firebase";
import { Sending } from "./pages/Sending";
import { Cancel } from "./pages/Cancel";
const { Header, Content } = Layout;
const { Title } = Typography;

export default function QueryParamsExample() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route exact path="/send" element={<Sending />} />
        <Route exact path="/cancel" element={<Cancel />} />
      </Routes>
    </Router>
  );
}

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function App() {
  let query = useQuery();
  const [data, setData] = useState();
  const navigate = useNavigate();

  const fetchData = () => {
    let SystemsRef = fire
      .database()
      .ref(`FireSystem/${query.get("system_code")}/currentUser`);
    SystemsRef.once("value", (snapshot) => {
      let data = snapshot.val();
      setData(data);
    });
  };

  const sendSMS = () => {
    let SystemsRef = fire
      .database()
      .ref(`FireSystem/${query.get("system_code")}/currentUser`);
    SystemsRef.set({ ...data, send: 1, cancel: 1 }).then(() => {
      navigate("/send", { replace: true });
    });
  };
  const cancelSMS = () => {
    let SystemsRef = fire
      .database()
      .ref(`FireSystem/${query.get("system_code")}/currentUser`);
    SystemsRef.set({ ...data, send: 0, cancel: 1 }).then(() => {
      navigate("/cancel", { replace: true });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {data?.onFire ? (
        <Layout>
          <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal">
              <Title level={3} style={{ marginTop: 15, color: "white" }}>
                SEND SMS
              </Title>
            </Menu>
          </Header>
          <Content
            className="site-layout"
            style={{ padding: "0 50px", marginTop: 64 }}
          >
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>SEND SMS</Breadcrumb.Item>
            </Breadcrumb>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 380, textAlign: "center" }}
            >
              <MessageOutlined style={{ fontSize: 100 }} />
              <Title level={3} style={{ marginTop: 15 }}>
                Continue Sending <span style={{ color: "orange" }}>SMS</span> to
                Responders?
              </Title>
              <Button
                type="primary"
                style={{ margin: 5 }}
                onClick={() => sendSMS()}
              >
                Send
              </Button>
              <Button style={{ margin: 5 }} onClick={() => cancelSMS()}>
                Cancel
              </Button>
            </div>
          </Content>
        </Layout>
      ) : (
        <div style={{ padding: 24, minHeight: 380, textAlign: "center" }}>
          There's nothing here...
        </div>
      )}
    </>
  );
}
