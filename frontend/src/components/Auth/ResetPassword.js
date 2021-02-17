import React, { useContext, useEffect, useState } from "react";
import jwt from "jsonwebtoken";

import { Form } from "antd";

import { Button, Password } from "../Common/Elements";

import "./auth.css";
import { AuthContext } from "../Context/AuthContext";
import { Link } from "react-router-dom";
import Logo from "../Common/Logo";
import history from "../../utils/historyUtil";
import { update } from "../../utils/httpUtils";

const ForgotPassword = (props) => {
  const [form] = Form.useForm();
  const [userInfo, setUserInfo] = useState({});
  const { handleLogin } = useContext(AuthContext);

  const token = props.match.params.token;

  const handleSubmit = () => {
    form.validateFields().then(async (values) => {
      update("api/user/reset-password", {
        id: userInfo._id,
        password: values.password,
        resetToken: props.match.params.token,
        resetFlag: userInfo.resetFlag,
      });
    });
  };

  useEffect(() => {
    try {
      const decoded = jwt.verify(
        token,
        process.env.REACT_APP_PASSWORD_TOKEN_SECRET
      );
      setUserInfo(decoded);
    } catch (err) {
      history.push("/auth/login");
    }
  }, [token]);

  return (
    <Form form={form} layout="vertical">
      <div style={{ paddingBottom: "40px" }}>
        <Logo fontSize={"40px"} auth />
      </div>
      <div className={"login-wrapper"}>
        <span className={"heading"}>Reset Password</span>
        <br />
        <p style={{ color: "white", width: "85%" }}>Enter new password.</p>
        <Password
          name="password"
          label="New Password"
          formstyle={{ width: "85%" }}
          required
          labelcolor={"white"}
          initialValue={"Admin@123"}
        />

        <Password
          name="confirmPassword"
          label="Confirm Password"
          formstyle={{ width: "85%" }}
          required
          labelcolor={"white"}
          initialValue={"Admin@123"}
        />

        <br />
        <Button
          style={{ width: "85%", marginLeft: "7.5%" }}
          type="primary"
          onClick={handleSubmit}
        >
          Change Passowrd
        </Button>
        <Link style={{ marginTop: 8 }} to={"/auth/login"}>
          Back to Login
        </Link>
        <br />
      </div>
    </Form>
  );
};

export default ForgotPassword;
