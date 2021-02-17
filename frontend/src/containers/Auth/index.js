import React from "react";
import { Route } from "react-router-dom";

import ChildRoutes from "../../routes/ChildRoutes";
import Login from "./LoginContainer";
import Register from "./RegisterContainer";
import ForgotPassword from "./ForgotPasswordContainer";
import ResetPassword from "./ResetPasswordContainer";


const Index = ({ match }) => (
  <ChildRoutes>
    <Route exact path={`${match.url}/login`} component={Login} />
    <Route exact path={`${match.url}/register`} component={Register} />
    <Route
      exact
      path={`${match.url}/forgot-password`}
      component={ForgotPassword}
    />
     <Route
      exact
      path={`${match.url}/reset-password/:token`}
      component={ResetPassword}
    />
  </ChildRoutes>
);

export default Index;
