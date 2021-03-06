import React, { useContext } from "react";

import { Redirect, Route } from "react-router-dom";

import { AuthContext } from "../components/Context/AuthContext";
import { isAllowed } from "../utils/permissionUtil";

const Authorization = ({ component: Component, rights, ...rest }) => {
  const { user } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAllowed(user.roles, rights)) {
          return (
            <Redirect
              to={{
                pathname: "/403",
                state: { from: props.location },
              }}
            />
          );
        }
        return <Component {...props} />;
      }}
    />
  );
};

export default Authorization;
