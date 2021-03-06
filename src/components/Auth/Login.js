import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Form } from "antd";

import { Input, Button, Password } from "../Common/Elements";

import "./auth.css";
import { AuthContext } from "../Context/AuthContext";
import Logo from "../Common/Logo";

const Login = (props) => {
  const [form] = Form.useForm();
  const { handleLogin } = useContext(AuthContext);

  const handleSubmit = () => {
    form.validateFields().then(async (values) => {
      handleLogin(values);
    });
  };

  return (
    <div style={{ width: "fit-content", margin: "20px auto" }}>
      <Logo fontSize={"40px"} auth />
      <br />
      <Form form={form} layout="vertical">
        <div className={"login-wrapper"}>
          <span className={"heading"}>Login</span>
          <br />
          <Input
            name="email"
            label="Username"
            type="email"
            required
            formstyle={{ width: "85%" }}
            labelcolor={"white"}
            initialValue={"prasai.reiyaz@gmail.com"}
          />
          <Password
            name="password"
            label="Password"
            formstyle={{ width: "85%" }}
            required
            labelcolor={"white"}
            initialValue={"Admin@123"}
          />
          <Link to={"/auth/forgot-password"}>Forgot password?</Link>
          <br />
          <Button
            style={{ width: "85%", marginLeft: "7.5%" }}
            type="primary"
            onClick={handleSubmit}
          >
            Login
          </Button>
          <p style={{ color: "white", marginTop: 8 }}>
            Don't have an account?{" "}
            <span>
              <Link to={"/auth/register"}>Signup</Link>
            </span>
          </p>
        </div>
      </Form>
    </div>
  );
};

export default Login;
