import React from "react";

import ChildRoutes from "../../routes/ChildRoutes";
import Authorization from "../../routes/Authorization";
import company from "./CompanyContainer";

const Index = ({ match }) => (
  <ChildRoutes>
    <Authorization
      exact
      path={`${match.url}`}
      component={company}
      rights={[1, 2]}
    />
  </ChildRoutes>
);

export default Index;
