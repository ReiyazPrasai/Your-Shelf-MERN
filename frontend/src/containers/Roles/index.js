import React from "react";

import ChildRoutes from "../../routes/ChildRoutes";
import Authorization from "../../routes/Authorization";
import AddForm from "./AddFormContainer";
import List from "./ListContainer";
// import View from "./ViewContainer";
import EditForm from "./EditFormContainer";

const Index = ({ match }) => (
  <ChildRoutes>
    <Authorization
      exact
      path={`${match.url}/add`}
      component={AddForm}
      rights={["/manage/roles:_add"]}
    />
    <Authorization
      exact
      path={`${match.url}`}
      component={List}
      rights={["/manage/roles:_list"]}
    />
    {/* <Authorization
      exact
      path={`${match.url}/:id/view`}
      component={View}
      rights={[1, 2]}
    /> */}
    <Authorization
      exact
      path={`${match.url}/:id/edit`}
      component={EditForm}
      rights={["/manage/roles:_edit"]}
    />
  </ChildRoutes>
);

export default Index;
