import React from "react";
import Logo from "../../Common/Logo";
import { PlusOutlined } from "@ant-design/icons";

import "./index.css";
import MenuItems from "./MenuItems";

const SideNav = (props) => {
  return (
    <div className={"side-nav-wrapper"}>
      <Logo {...props} />
      <div className="compose">
        <PlusOutlined /> {!props.isCollapsed && "Add Product"}
      </div>
      <MenuItems {...props} />
    </div>
  );
};

export default SideNav;
