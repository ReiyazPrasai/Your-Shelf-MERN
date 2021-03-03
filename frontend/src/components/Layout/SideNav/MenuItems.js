import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { CaretUpFilled, CaretDownFilled } from "@ant-design/icons";

import menuList from "./menuList";
import { Link } from "react-router-dom";
import { isEmpty } from "../../../utils/commonUtils";

const MenuItems = (props) => {
  const [subMenuShow, setSubMenuShow] = useState([false, null]);
  const [isSelected, setIsSelected] = useState([null, null]);
  const [isHovered, setIsHovered] = useState(null);
  const [tooltipClass, setTooltipClass] = useState(0);

  const pathName = useLocation().pathname;

  useEffect(() => {
    setIsSelected([
      `/${pathName.split("/")[1]}`,
      `/${pathName.split("/")[1]}/${pathName.split("/")[2]}`,
    ]);
  }, [pathName]);

  const menuClass = (id, subMenu) =>
    isSelected[0] === id
      ? !isSelected[1]
        ? !subMenu
          ? "selected-menu"
          : ""
        : !subMenu
        ? "selected-menu"
        : "selected-with-sub"
      : "";

  const subMenuClass = (id) => (isSelected[1] === id ? "selected-menu" : "");

  const upDownArrow = (id) => (
    <div
      className="sub-menu-arrow centralize"
      style={
        props.isCollapsed ? { position: "absolute", right: 0, top: -5 } : {}
      }
    >
      {subMenuShow[0] === true && subMenuShow[1] === id ? (
        <CaretUpFilled
          style={{ fontSize: props.isCollapsed ? ".6rem" : ".9rem" }}
        />
      ) : (
        <CaretDownFilled
          style={{ fontSize: props.isCollapsed ? ".6rem" : ".9rem" }}
        />
      )}
    </div>
  );

  const toolTip = (label, id, isSubMenu, subMenu) => {
    return (
      <div
        className={`menu-tooltip ${isSubMenu ? subMenuClass(id) : ""} ${
          isHovered === id ? tooltipClass : ""
        }`}
        style={{ position: "absolute" }}
      >
        <div className="menu-label" style={{ paddingLeft: "6px" }}>
          {" "}
          {label}
        </div>
        {subMenu && upDownArrow(id)}
      </div>
    );
  };

  const displayMenuItem = (id) => {
    if (props.userInfo?.roles?.includes("All")) return true;
    const roles = props.userInfo?.roles
      ?.map((item) => {
        return item.split(":_")[0];
      })
      ?.filter((role) => role?.includes(id));
    if (id === "/dashboard" || !isEmpty(roles)) return true;
    return false;
  };

  return (
    <div className={"menu-wrapper"}>
      {menuList?.map(({ label, id, subMenu, icon, to }, index) => {
        return (
          displayMenuItem(id) && (
            <div key={id}>
              <Link
                to={to}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {(index === 1 || index === 3) && (
                  <div
                    style={{
                      width: "100%",
                      height: 20,
                      borderTop: "1px solid #555555",
                      padding: "3px 0 0 14px",
                      fontSize: ".6rem",
                      fontWeight: "bold",
                      color: "#10BC83",
                    }}
                  >
                    {index === 1 ? "Products" : "Company"}
                  </div>
                )}
                <div
                  style={
                    props.isCollapsed
                      ? { height: 46, paddingTop: 6 }
                      : { position: "relative" }
                  }
                  onClick={() => {
                    if (subMenuShow[1] === id) {
                      setSubMenuShow([!subMenuShow[0], id]);
                    } else {
                      setSubMenuShow([true, id]);
                    }
                    !subMenu
                      ? setIsSelected([id, null])
                      : setIsSelected([isSelected[0], isSelected[1]]);
                  }}
                  onMouseEnter={() => {
                    setTooltipClass("tooltip-show");
                    setIsHovered(id);
                  }}
                  onMouseLeave={() => {
                    setTooltipClass("");
                    setIsHovered(null);
                  }}
                  className={`menu-items ${menuClass(id, subMenu)}`}
                >
                  <div
                    className="menu-label"
                    style={
                      !props.isCollapsed
                        ? {}
                        : {
                            flexDirection: "column",
                            alignItems: "center",
                            paddingLeft: 0,
                          }
                    }
                  >
                    <span style={{ width: 20, textAlign: "right" }}>
                      {icon}
                    </span>
                    {props.isCollapsed && (
                      <div
                        className={"centralize"}
                        style={{
                          width: "100%",
                          fontSize: "0.55rem",
                          marginTop: 1,
                        }}
                      >
                        {label}
                      </div>
                    )}
                    {!props.isCollapsed && (
                      <span style={{ marginLeft: 10 }}>{label}</span>
                    )}
                  </div>

                  {subMenu && upDownArrow(id)}
                </div>
              </Link>
              {subMenu?.map((item) => {
                return displayMenuItem(item.id) &&
                  subMenuShow[0] === true &&
                  subMenuShow[1] === id ? (
                  <div key={item.id}>
                    <Link
                      to={item.to}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <div
                        onClick={() => {
                          setIsSelected([id, item.id]);
                        }}
                        key={item.id}
                        className={`sub-menu-items ${
                          isSelected[1] === item.id ? "selected-menu" : ""
                        }`}
                        onMouseEnter={() => {
                          setTooltipClass("tooltip-show");
                          setIsHovered(item.id);
                        }}
                        onMouseLeave={() => {
                          setTooltipClass("");
                          setIsHovered(null);
                        }}
                        style={
                          props.isCollapsed
                            ? { height: 46, paddingTop: 6 }
                            : { position: "relative" }
                        }
                      >
                        <div
                          className="sub-menu-label"
                          style={
                            !props.isCollapsed
                              ? { paddingLeft: 34 }
                              : {
                                  flexDirection: "column",
                                  alignItems: "center",
                                  paddingLeft: 0,
                                }
                          }
                        >
                          <span
                            style={{
                              width: 20,
                              textAlign: "right",
                            }}
                          >
                            {item.icon}
                          </span>
                          {props.isCollapsed && (
                            <div
                              className={"centralize"}
                              style={{
                                width: "100%",
                                fontSize: "0.55rem",
                                marginTop: 1,
                              }}
                            >
                              {item.label}
                            </div>
                          )}
                          {!props.isCollapsed && (
                            <span style={{ marginLeft: 10 }}>{item.label}</span>
                          )}
                        </div>
                        {props.isCollapsed &&
                          toolTip(item.label, item.id, true)}
                      </div>
                    </Link>
                  </div>
                ) : null;
              })}
            </div>
          )
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => ({
  userInfo: state.userInfo.payload,
});

export default connect(mapStateToProps)(MenuItems);
