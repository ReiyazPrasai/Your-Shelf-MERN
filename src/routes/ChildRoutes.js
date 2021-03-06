import React, { Fragment } from "react"
import { Redirect, Switch, Route } from "react-router-dom"

import { isAuthenticated } from "../utils/authUtil"
import NotFound from "../components/Exceptions/404NotFound"

const ChildRoutes = ({ children }) => (
  <Fragment>
    <Switch>
      {children}
      <Route
        render={(props) =>
          !isAuthenticated() ? (
            <Redirect
              to={{
                pathname: "/auth/login",
                state: { from: props.location },
              }}
            />
          ) : (
            <NotFound />
          )
        }
      />
    </Switch>
  </Fragment>
)

export default ChildRoutes
