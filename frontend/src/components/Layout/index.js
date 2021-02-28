import React, { useState } from "react";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";

import Content from "./Content";
import Header from "./Header";
import "./index.css";
import SideNav from "./SideNav";

import MainAddForm from "../../containers/Product/AddFormContainer";
import { Modal, Switch } from "../Common/Elements";
import { Col, Row } from "antd";

const Layout = (props) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isToggleButtonShow, setIsToggleButtonShow] = useState(false);
  const [isAddProduct, setIsAddProduct] = useState(false);
  const [isActive, setIsActive] = useState(true);

  return (
    <div className="main">
      <div
        className="left-section"
        onMouseEnter={() => {
          setIsToggleButtonShow(true);
        }}
        onMouseLeave={() => {
          setIsToggleButtonShow(false);
        }}
        style={{
          width: isCollapsed ? "70px" : "220px",
          minWidth: isCollapsed ? "70px" : "220px",
        }}
      >
        {isToggleButtonShow && (
          <div
            onClick={() => {
              setIsCollapsed(!isCollapsed);
            }}
            className="collapse-toggle-button centralize"
          >
            {isCollapsed ? (
              <RightOutlined />
            ) : (
              <LeftOutlined style={{ marginRight: 2 }} />
            )}
          </div>
        )}
        <SideNav
          isCollapsed={isCollapsed}
          isAddProduct={isAddProduct}
          setIsAddProduct={setIsAddProduct}
        />
      </div>
      <div className="right-section">
        <Header />

        <Content>{props.children}</Content>
        <Modal
          visible={isAddProduct}
          onCancel={() => {
            setIsAddProduct(false);
          }}
          style={{ padding: 0 }}
          title={
            <Row align="middle">
              <Col span={17}>
                <span style={{ color: "#10BC83" }}>Add Product</span>
              </Col>
              <Col span={5}>
                <span
                  style={{
                    fontWeight: "light",
                    fontSize: "0.8rem",
                    display: "inline-block",
                    marginRight: 8,
                  }}
                >
                  Active status:
                </span>
              </Col>
              <Col span={2}>
                <Switch
                  initialValue={isActive}
                  onChange={(e) => {
                    setIsActive(e);
                  }}
                  size={"medium"}
                  formstyle={{ margin: 0 }}
                  hideLabel
                />
              </Col>
            </Row>
          }
        >
          <MainAddForm isActive={isActive} />
        </Modal>
      </div>
    </div>
  );
};

export default Layout;
