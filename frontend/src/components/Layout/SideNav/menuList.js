import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faTag,
  faStore,
  faObjectGroup,
  faFileAlt,
  faDatabase,
  faDollarSign,
  faPencilRuler,
  faThList,
} from "@fortawesome/free-solid-svg-icons";

const menuList = [
  {
    label: "Dashboard",
    icon: (
      <div className="menu-icon-wrapper" style={{ background: "#488FFF" }}>
        <FontAwesomeIcon icon={faTachometerAlt} />
      </div>
    ),
    id: "/dashboard",
    to: "/dashboard",
  },
  {
    label: "My Collection",
    icon: (
      <div className="menu-icon-wrapper" style={{ background: "#8A67B7" }}>
        <FontAwesomeIcon icon={faDatabase} />
      </div>
    ),
    id: "/collection",
    to: "/collection",
  },
  // {
  //   label: "Brands",
  //   icon: <FontAwesomeIcon icon={faTag} />,
  //   id: "/brands",
  //   to: "/brands",
  // },
  // {
  //   label: "Category",
  //   icon: <FontAwesomeIcon icon={faObjectGroup} />,
  //   id: "/categories",
  //   to: "/categories",
  // },
  // {
  //   label: "Attributes",
  //   icon: <FontAwesomeIcon icon={faFileAlt} />,
  //   id: "/attributes",
  //   to: "/attributes",
  // },
  {
    label: "Features",
    icon: (
      <div className="menu-icon-wrapper" style={{ background: "#CA8E4D" }}>
        <FontAwesomeIcon icon={faThList} />
      </div>
    ),
    id: "/features",
    to: "#",

    subMenu: [
      {
        label: "Brands",
        icon: (
          <div className="menu-icon-wrapper" style={{ background: "#C94D84" }}>
            <FontAwesomeIcon icon={faTag} />
          </div>
        ),
        id: "/features/brands",
        to: "/features/brands",
      },
      {
        label: "Category",
        icon: (
          <div className="menu-icon-wrapper" style={{ background: "#9F584A" }}>
            <FontAwesomeIcon icon={faObjectGroup} />
          </div>
        ),
        id: "/features/categories",
        to: "/features/categories",
      },
      {
        label: "Attributes",
        icon: (
          <div className="menu-icon-wrapper" style={{ background: "#ffde4c" }}>
            <FontAwesomeIcon icon={faFileAlt} />
          </div>
        ),
        id: "/features/attributes",
        to: "/features/attributes",
      },
    ],
  },
  {
    label: "Stores",
    icon: (
      <div className="menu-icon-wrapper" style={{ background: "#15AD90" }}>
        <FontAwesomeIcon icon={faStore} />
      </div>
    ),
    id: "/stores",
    to: "#",

    subMenu: [
      {
        label: "Manage",
        icon: (
          <div className="menu-icon-wrapper" style={{ background: "#ff4c6a" }}>
            <FontAwesomeIcon icon={faPencilRuler} />
          </div>
        ),
        to: "/stores/manage",
        id: "/stores/manage",
      },
      {
        label: "Orders",
        icon: (
          <div className="menu-icon-wrapper" style={{ background: "#ff704c" }}>
            <FontAwesomeIcon icon={faDollarSign} />
          </div>
        ),
        id: "/stores/orders",
      },
    ],
  },
];

export default menuList;
