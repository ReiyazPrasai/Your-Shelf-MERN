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
  faBuilding,
  faUsers,
  faUser,
  faClipboard,
} from "@fortawesome/free-solid-svg-icons";

const menuList = [
  {
    label: "Dashboard",
    icon: (
      <div className="menu-icon-wrapper" style={{ background: "#2c15ad" }}>
        <FontAwesomeIcon icon={faTachometerAlt} />
      </div>
    ),
    id: "/dashboard",
    to: "/dashboard",
  },
  {
    label: "Products",
    icon: (
      <div className="menu-icon-wrapper" style={{ background: "#F68C02" }}>
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
      <div className="menu-icon-wrapper" style={{ background: "#15ada0" }}>
        <FontAwesomeIcon icon={faThList} />
      </div>
    ),
    id: "/features",
    to: "#",

    subMenu: [
      {
        label: "Brands",
        icon: (
          <div className="menu-icon-wrapper" style={{ background: "#ad157f" }}>
            <FontAwesomeIcon icon={faTag} />
          </div>
        ),
        id: "/features/brands",
        to: "/features/brands",
      },
      {
        label: "Category",
        icon: (
          <div className="menu-icon-wrapper" style={{ background: "#ad7815" }}>
            <FontAwesomeIcon icon={faObjectGroup} />
          </div>
        ),
        id: "/features/categories",
        to: "/features/categories",
      },
      {
        label: "Attributes",
        icon: (
          <div className="menu-icon-wrapper" style={{ background: "#ad1f15" }}>
            <FontAwesomeIcon icon={faFileAlt} />
          </div>
        ),
        id: "/features/attributes",
        to: "/features/attributes",
      },
    ],
  },

  {
    label: "Company",
    icon: (
      <div className="menu-icon-wrapper" style={{ background: "#5ead15" }}>
        <FontAwesomeIcon icon={faBuilding} />
      </div>
    ),
    id: "/company",
    to: "/company",
  },
  {
    label: "Stores",
    icon: (
      <div className="menu-icon-wrapper" style={{ background: "#8215ad" }}>
        <FontAwesomeIcon icon={faStore} />
      </div>
    ),
    id: "/stores",
    to: "#",

    subMenu: [
      {
        label: "Manage",
        icon: (
          <div className="menu-icon-wrapper" style={{ background: "#1069bc" }}>
            <FontAwesomeIcon icon={faPencilRuler} />
          </div> 
        ),
        to: "/stores/manage",
        id: "/stores/manage",
      },
      {
        label: "Orders",
        icon: (
          <div className="menu-icon-wrapper" style={{ background: "#F63702" }}>
            <FontAwesomeIcon icon={faDollarSign} />
          </div>
        ),
        id: "/stores/orders",
      },
    ],
  },
  {
    label: "Manage",
    icon: (
      <div className="menu-icon-wrapper" style={{ background: "#ce0d0d" }}>
        <FontAwesomeIcon icon={faPencilRuler} />
      </div>
    ),
    id: "/manage",
    subMenu: [
      {
        label: "Groups",
        icon: (
          <div className="menu-icon-wrapper" style={{ background: "#bcb910" }}>
            <FontAwesomeIcon icon={faUsers} />
          </div>
        ),
        to: "/manage/groups",
        id: "/manage/groups",
      },
      {
        label: "Roles",
        icon: (
          <div className="menu-icon-wrapper" style={{ background: "#bc10ae" }}>
            <FontAwesomeIcon icon={faClipboard} />
          </div>
        ),
        to: "/manage/roles",
        id: "/manage/roles",
      },
    ],
  },
  {
    label: "Users",
    icon: (
      <div className="menu-icon-wrapper" style={{ background: "#1069BC" }}>
        <FontAwesomeIcon icon={faUser} />
      </div>
    ),
    id: "/users",
    to: "/users",
  },
];

export default menuList;
