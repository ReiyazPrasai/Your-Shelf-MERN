import React from "react";

import ChildRoutes from "../../routes/ChildRoutes";
import Authorization from "../../routes/Authorization";
import AddForm from "./AddFormContainer";
import List from "./ListContainer";
// import View from "./ViewContainer";
// import EditForm from "./EditFormContainer";

const Index = ({ match }) => (
  <ChildRoutes>
    <Authorization
      exact
      path={`${match.url}/add`}
      component={AddForm}
      rights={[1, 2]}
    />
    <Authorization
      exact
      path={`${match.url}/manage`}
      component={List}
      rights={[1, 2]}
    />
    {/* <Authorization
      exact
      path={`${match.url}/:id/view`}
      component={View}
      rights={[1, 2]}
    />
    <Authorization
      exact
      path={`${match.url}/:id/edit`}
      component={EditForm}
      rights={[1, 2]}
    /> */}
  </ChildRoutes>
);

export default Index;
