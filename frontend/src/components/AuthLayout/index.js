import React from "react";

import './authLayout.css'
const AuthLayout = (props) => {
  return <div className="centralize auth-layout">{props.children}</div>;
};

export default AuthLayout;
