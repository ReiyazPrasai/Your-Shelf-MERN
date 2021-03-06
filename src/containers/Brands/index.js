import React from "react";

import ChildRoutes from "../../routes/ChildRoutes";
import Authorization from "../../routes/Authorization";
import AddForm from "./AddFormContainer";
import List from "./ListContainer";
import View from "./ViewContainer";
import EditForm from "./EditFormContainer";

const Index = ({ match }) => (
  <ChildRoutes>
    <Authorization
      exact
      path={`${match.url}/add`}
      component={AddForm}
      rights={["/features/brands:_list"]}
    />
    <Authorization
      exact
      path={`${match.url}`}
      component={List}
      rights={["/features/brands:_add"]}
    />
  </ChildRoutes>
);

export default Index;
