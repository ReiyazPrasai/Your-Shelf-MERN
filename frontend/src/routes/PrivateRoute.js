import React, { Suspense, useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { AuthContext } from "../components/Context/AuthContext";

const PrivateRoute = ({ component: Component, layout: Layout, ...rest }) => {
  const { user, pageLoading } = useContext(AuthContext);

  const renderComponent = () => {
    return (
      <Route
        {...rest}
        render={(props) => {
          if (!user?.loggedIn) {
            return (
              <Redirect
                to={{
                  pathname: "/auth/login",
                  state: { from: props.location },
                }}
              />
            );
          }
          return (
            <Layout>
              <Suspense fallback={<>Loading...</>}>
                <Component {...props} />
              </Suspense>
            </Layout>
          );
        }}
      />
    );
  };

  return pageLoading ? (
    <Suspense fallback={<div>Loading...</div>} />
  ) : (
    renderComponent()
  );
};

export default PrivateRoute;
