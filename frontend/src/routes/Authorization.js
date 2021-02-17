import React from "react"
import { Redirect, Route } from "react-router-dom"

import { isAllowed } from "../utils/permissionUtil"

const Authorization = ({ component: Component, rights, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAllowed(rights)) {
          return (
            <Redirect
              to={{
                pathname: "/403",
                state: { from: props.location },
              }}
            />
          )
        }
        return <Component {...props} />
      }}
    />
  )
}

export default Authorization
