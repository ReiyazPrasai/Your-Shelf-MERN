import React, { useState } from "react";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";

import Content from "./Content";
import Header from "./Header";
import "./index.css";
import SideNav from "./SideNav";

const Layout = (props) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isToggleButtonShow, setIsToggleButtonShow] = useState(false);

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
        <SideNav isCollapsed={isCollapsed} />
      </div>
      <div className="right-section">
        <Header />

        <Content>{props.children}</Content>
      </div>
    </div>
  );
};

export default Layout;
