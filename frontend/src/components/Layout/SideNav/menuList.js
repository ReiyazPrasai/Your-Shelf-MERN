import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faTag,
  faStore,
  faObjectGroup,
  faFileAlt,
  faShoppingBag,
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
      <div className="menu-icon-wrapper" style={{ background: "#2c15ad", }}>
        <FontAwesomeIcon style={{fontSize: 12}} icon={faTachometerAlt} />
      </div>
    ),
    id: "/dashboard",
    to: "/dashboard",
  },
  {
    label: "Products",
    icon: (
      <div className="menu-icon-wrapper" style={{ background: "#F68C02" }}>
        <FontAwesomeIcon style={{fontSize: 12}} icon={faShoppingBag} />
      </div>
    ),
    id: "/products",
    to: "/products",
  },
  // {
  //   label: "Brands",
  //   icon: <FontAwesomeIcon style={{fontSize: 12}} icon={faTag} />,
  //   id: "/brands",
  //   to: "/brands",
  // },
  // {
  //   label: "Category",
  //   icon: <FontAwesomeIcon style={{fontSize: 12}} icon={faObjectGroup} />,
  //   id: "/categories",
  //   to: "/categories",
  // },
  // {
  //   label: "Attributes",
  //   icon: <FontAwesomeIcon style={{fontSize: 12}} icon={faFileAlt} />,
  //   id: "/attributes",
  //   to: "/attributes",
  // },
  {
    label: "Features",
    icon: (
      <div className="menu-icon-wrapper" style={{ background: "#15ada0" }}>
        <FontAwesomeIcon style={{fontSize: 12}} icon={faThList} />
      </div>
    ),
    id: "/features",
    to: "#",

    subMenu: [
      {
        label: "Brands",
        icon: (
          <div className="menu-icon-wrapper" style={{ background: "#ad157f" }}>
            <FontAwesomeIcon style={{fontSize: 12}} icon={faTag} />
          </div>
        ),
        id: "/features/brands",
        to: "/features/brands",
      },
      {
        label: "Category",
        icon: (
          <div className="menu-icon-wrapper" style={{ background: "#ad7815" }}>
            <FontAwesomeIcon style={{fontSize: 12}} icon={faObjectGroup} />
          </div>
        ),
        id: "/features/categories",
        to: "/features/categories",
      },
      {
        label: "Attributes",
        icon: (
          <div className="menu-icon-wrapper" style={{ background: "#ad1f15" }}>
            <FontAwesomeIcon style={{fontSize: 12}} icon={faFileAlt} />
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
        <FontAwesomeIcon style={{fontSize: 12}} icon={faBuilding} />
      </div>
    ),
    id: "/company",
    to: "/company",
  },
  {
    label: "Stores",
    icon: (
      <div className="menu-icon-wrapper" style={{ background: "#8215ad" }}>
        <FontAwesomeIcon style={{fontSize: 12}} icon={faStore} />
      </div>
    ),
    id: "/stores",
    to: "#",

    subMenu: [
      {
        label: "Manage",
        icon: (
          <div className="menu-icon-wrapper" style={{ background: "#1069bc" }}>
            <FontAwesomeIcon style={{fontSize: 12}} icon={faPencilRuler} />
          </div> 
        ),
        to: "/stores/manage",
        id: "/stores/manage",
      },
      {
        label: "Orders",
        icon: (
          <div className="menu-icon-wrapper" style={{ background: "#F63702" }}>
            <FontAwesomeIcon style={{fontSize: 12}} icon={faDollarSign} />
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
        <FontAwesomeIcon style={{fontSize: 12}} icon={faPencilRuler} />
      </div>
    ),
    id: "/manage",
    subMenu: [
      {
        label: "Groups",
        icon: (
          <div className="menu-icon-wrapper" style={{ background: "#bcb910" }}>
            <FontAwesomeIcon style={{fontSize: 12}} icon={faUsers} />
          </div>
        ),
        to: "/manage/groups",
        id: "/manage/groups",
      },
      {
        label: "Roles",
        icon: (
          <div className="menu-icon-wrapper" style={{ background: "#bc10ae" }}>
            <FontAwesomeIcon style={{fontSize: 12}} icon={faClipboard} />
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
        <FontAwesomeIcon style={{fontSize: 12}} icon={faUser} />
      </div>
    ),
    id: "/users",
    to: "/users",
  },
];

export default menuList;
