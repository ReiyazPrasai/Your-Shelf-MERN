import React from "react";

import ChildRoutes from "../../routes/ChildRoutes";
import Authorization from "../../routes/Authorization";
import List from "./ListContainer";
import View from './ViewContainer'

const Index = ({ match }) => (
  <ChildRoutes>
    <Authorization
      exact
      path={`${match.url}`}
      component={List}
      rights={["/products:_list"]}
    />
     <Authorization
      exact
      path={`${match.url}/view/:id`}
      component={View}
      rights={["/products:_view"]}
    />
  </ChildRoutes>
);

export default Index;
