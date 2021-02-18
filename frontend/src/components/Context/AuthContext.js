import React, { createContext, useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import { useLocation } from "react-router-dom";
import { isAuthenticated } from "../../utils/authUtil";
import { fetch, store } from "../../utils/httpUtils";
import history from "../../utils/historyUtil";

const AuthContext = createContext({});

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
    store("api/user/login", values).then((res) => {
            const decoded = jwt.verify(
        res.data.data.token,
        process.env.REACT_APP_TOKEN_SECRET
      );
      setUser({ ...decoded, loggedIn: true });
      history.push("/dashboard");
    });
  };

  const handleLoginWithPopup = () => {};

  const handleSignUp = (values) => {   
    
    store("api/user/register", values).then(()=>{
      
    })
  };

  const logout = () => {
    fetch("api/user/logout").then(() => {
      setUser({ loggedIn: false });
      history.push("/auth/login");
    });
  };

  useEffect(() => {
    if (pageLoading) {
      fetch("api/user/info")
        .then((res) => {
          const decoded = jwt.verify(
            res.data.data.token,
            process.env.REACT_APP_TOKEN_SECRET
          );
          setUser({ ...decoded, loggedIn: true });
        })
        .catch((err) => {
          setUser(err.data);
          history.push('/auth/login')
        })
        .finally((res) => {
          setPageLoading(false);
        });
    }
  }, [pathname, pageLoading]);

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

export { AuthProvider, AuthContext };
