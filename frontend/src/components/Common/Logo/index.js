import React from "react";

import "./logo.css";

const Logo = (props) => {
  return (
    <div className={"logo-wrapper"}>
      <div
        className={`centralize logo ${props.auth ? "box-shadow" : ""}`}
        style={props.auth ? {} : { padding: "10px 8px", width: "99%" }}
      >
        <div
          className="centralize"
          style={{
            background: "linear-gradient(240deg, #00ede1, rgb(6, 149, 102))",
            padding: "2px 4px",
            borderRadius: "2px 0 0 2px",
            fontWeight: "bold",
          }}
        >
          <span
            style={{
              color: "#282C34",
              fontSize: !props.fontSize ? "24px" : props.fontSize,
            }}
          >
            {props.isCollapsed ? "Y" : "YOUR"}
          </span>
        </div>

        <div
          style={{
            padding: "0 5px",
            border: `2px ${props.isCollapsed ? "#00EADC" : "#00ede1"} solid`,
            borderBottom: `2px ${props.isCollapsed ? "#04C2A5" : "#00ede1"} solid`,
            borderRadius: "0 2px 2px 0",
            fontSize: !props.fontSize ? "24px" : props.fontSize,
          }}
        >
          {props.isCollapsed ? "S" : "SHELF"}
        </div>
      </div>
    </div>
  );
};

export default Logo;
