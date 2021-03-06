import React, { Suspense } from "react";
import { Route } from "react-router-dom";

const PublicRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      return (
        <Suspense fallback={<>Loading...</>}>
          <Layout menu={rest.menu}>
            <Component {...props} />
          </Layout>
        </Suspense>
      );
    }}
  />
);

export default PublicRoute;
