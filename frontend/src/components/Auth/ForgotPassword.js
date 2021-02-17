import React, { useContext } from "react";

import { Form } from "antd";

import { Input, Button } from "../Common/Elements";

import "./auth.css";
import { AuthContext } from "../Context/AuthContext";
import { Link } from "react-router-dom";
import Logo from "../Common/Logo";
import { store } from "../../utils/httpUtils";

const ForgotPassword = (props) => {
  const [form] = Form.useForm();
  const { handleLogin } = useContext(AuthContext);

  const handleSubmit = () => {
    form.validateFields().then(async (values) => {
      store('api/user/forgot-password',values);
    });
  };

  return (
    <Form form={form} layout="vertical">
      <div style={{ paddingBottom: "40px" }}>
        <Logo fontSize={"40px"} auth />
      </div>
      <div className={"login-wrapper"}>
        <span className={"heading"}>Forgot Password</span>
        <br />
        <p style={{ color: "white", width: "85%" }}>
          Enter your email address and we’ll send you the link to reset your
          password.
        </p>
        <Input
          name="email"
          label="Username"
          type="email"
          required
          formstyle={{ width: "85%" }}
          labelcolor={"white"}
          initialValue={"prasai.reiyaz@gmail.com"}
        />
        <br />
        <Button
          style={{ width: "85%", marginLeft: "7.5%" }}
          type="primary"
          onClick={handleSubmit}
        >
          Submit
        </Button>
        <Link style={{marginTop: 8}} to={"/auth/login"}>Back to Login</Link>
        <br />
      </div>
    </Form>
  );
};

export default ForgotPassword;
