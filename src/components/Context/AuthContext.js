import React, { createContext, useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import jwt from "jsonwebtoken";
import { useLocation } from "react-router-dom";
import { isAuthenticated } from "../../utils/authUtil";
import { fetch, store } from "../../utils/httpUtils";
import history from "../../utils/historyUtil";
import * as userService from "../../services/userService";
import * as reducerToolsAction from "../../actions/reducerToolsAction";

const AuthContext = createContext({});
var userInfo;
const AuthProvider = (props) => {
  const [user, setUser] = useState({ loggedIn: false });
  const [loginLoading, setLoginLoading] = useState(false);
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [authenticated] = useState(isAuthenticated() || false);
  const [pageLoading, setPageLoading] = useState(true);
  const state = {
    user,
    setUser,
    loginLoading,
    signUpLoading,
    authenticated,
    setLoginLoading,
    setSignUpLoading,
    message,
    setMessage,
  };

  const pathname = useLocation().pathname;

  const handleLogin = (values) => {
    userService.userLogin(values).then((res) => {
      const decoded = jwt.verify(
        res.data.token,
        process.env.REACT_APP_TOKEN_SECRET
      );
      props.actions.userInfoRequest({ ...decoded, loggedIn: true });
      setUser({ ...decoded, loggedIn: true });
      history.push("/dashboard");
      // window.location.reload()
    });
  };

  const handleLoginWithPopup = () => {};

  const handleSignUp = (values) => {
    userService.addNewUser("api/user/register", values).then(() => {});
  };

  const logout = () => {
    fetch("api/user/logout").then(() => {
      setUser({ loggedIn: false });
      props.actions.reducerCleanRequest()
      props.actions.userInfoCleanRequest()
      history.push("/auth/login");
    });
  };

  useEffect(() => {
    if (pageLoading) {
      fetch("api/user/info")
        .then((res) => {
          const decoded = jwt.verify(
            res?.data?.data?.token,
            process.env.REACT_APP_TOKEN_SECRET
          );
          setUser({ ...decoded, loggedIn: true });
          props.actions.userInfoRequest({ ...decoded, loggedIn: true });
        })
        .catch((err) => {
          setUser(err?.data);
          history.push("/auth/login");
        })
        .finally((res) => {
          setPageLoading(false);
        });
    }
  }, [props.actions, pathname, pageLoading]);

  return (
    <AuthContext.Provider
      {...props}
      value={{
        ...state,
        handleLogin: handleLogin,
        handleLoginWithPopup: handleLoginWithPopup,
        handleSignUp: handleSignUp,
        logout: logout,
        pageLoading: pageLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      Object.assign({}, userService, reducerToolsAction),
      dispatch
    ),
  };
};

export { AuthContext, userInfo };
export default connect(() => ({}), mapDispatchToProps)(AuthProvider);
