import React, { Suspense, useContext } from "react";
import { Redirect, Route } from "react-router-dom";

import { AuthContext } from "../components/Context/AuthContext";

const RestrictRoute = ({ component: Component, layout: Layout, ...rest }) => {
  const { user, pageLoading } = useContext(AuthContext);

  const renderComponent = () => {
    return rest.path === "" || rest.path === "/" ? (
      <Route
        {...rest}
        render={(props) => (
          <Redirect
            to={{
              pathname: "/auth/login",
              state: { from: props.location },
            }}
          />
        )}
      />
    ) : (
      <Route
        {...rest}
        render={(props) =>
          user?.loggedIn ? (
            <Redirect
              to={{
                pathname: "/dashboard",
                state: { from: props.location },
              }}
            />
          ) : (
            <Suspense fallback={<div>Loading...</div>}>
              <Layout>
                <Component {...props} />
              </Layout>
            </Suspense>
          )
        }
      />
    );
  };

  return pageLoading ? (
    <Suspense fallback={<div>Loading...</div>} />
  ) : (
    renderComponent()
  );
};

export default RestrictRoute;
