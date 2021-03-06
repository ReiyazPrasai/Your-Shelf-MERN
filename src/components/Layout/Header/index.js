import React, { useContext } from "react";

import { Avatar } from "antd";
import { connect } from "react-redux";
import { SettingFilled, MailFilled, LogoutOutlined } from "@ant-design/icons";

import "./index.css";
import { AuthContext } from "../../Context/AuthContext";

const Header = (props) => {
  const { logout, user } = useContext(AuthContext);

  return (
    <div className="header-wrapper">
      <div className="left-header">
        <Avatar
          style={{
            background: "linear-gradient(240deg, #00ede1, rgb(6, 149, 102))",
            color: "white",
            marginRight: 5,
            fontSize: "1rem",
          }}
        >
          <span>{user.name[0]}</span>
        </Avatar>
        {user.name}
      </div>
      <div className="right-header">
        <span
          className={'header-title'}
        >
          {props.heading}
        </span>
        <MailFilled style={{ marginRight: 18 }} />
        <SettingFilled style={{ marginRight: 18 }} />
        <LogoutOutlined
          style={{ cursor: "pointer" }}
          onClick={(e) => {
            e.preventDefault();
            logout();
          }}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  heading: state.heading.payload,
});

export default connect(mapStateToProps)(Header);
