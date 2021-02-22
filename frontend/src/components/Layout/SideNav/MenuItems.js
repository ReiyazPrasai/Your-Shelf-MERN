import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CaretUpFilled, CaretDownFilled } from "@ant-design/icons";

import menuList from "./menuList";
import { Link } from "react-router-dom";

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
      style={props.isCollapsed ? { marginLeft: 8 } : {}}
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

  return (
    <div className={"menu-wrapper"}>
      {menuList?.map(({ label, id, subMenu, icon, to }, index) => {
        return (
          <div key={id}>
            <Link to={to} style={{ textDecoration: "none", color: "inherit" }}>
              {(index === 1 || index === 3) && (
                <div
                  className="centralize"
                  style={{
                    margin: "16px 0 0 0",
                    width: "100%",
                  }}
                >
                  <span style={{ fontSize: ".6rem", fontWeight: 'bold', color: "#10BC83" }}>
                    {index === 1 ? "Products" : "Company"}
                  </span>
                  {!props.isCollapsed && (
                    <div
                      style={{
                        background: "#10BC83",
                        height: "0px",
                        width: "150px",
                        marginLeft: "10px",
                        marginTop: '3px'
                      }}
                    />
                  )}
                </div>
              )}
              <div
                style={{ position: "relative" }}
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
                  style={subMenu ? { paddingLeft: 16 } : {}}
                >
                  <span
                    style={{ width: 20, textAlign: "right", marginRight: 4 }}
                  >
                    {icon}
                  </span>
                  {!props.isCollapsed && (
                    <span style={{ marginLeft: 16 }}>{label}</span>
                  )}
                </div>
                {subMenu && upDownArrow(id)}
                {props.isCollapsed && toolTip(label, id, false, subMenu)}
              </div>
            </Link>
            {subMenu?.map((item) => {
              return subMenuShow[0] === true && subMenuShow[1] === id ? (
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
                      style={{ position: "relative" }}
                    >
                      <div
                        className="sub-menu-label"
                        style={{ paddingLeft: props.isCollapsed ? 16 : 34 }}
                      >
                        <span
                          style={{
                            width: 20,
                            textAlign: "right",
                            marginRight: 4,
                          }}
                        >
                          {item.icon}
                        </span>
                        {!props.isCollapsed && (
                          <span style={{ marginLeft: 8 }}>{item.label}</span>
                        )}
                      </div>
                      {props.isCollapsed && toolTip(item.label, item.id, true)}
                    </div>
                  </Link>
                </div>
              ) : null;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default MenuItems;
