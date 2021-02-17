import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Form } from "antd";

import { Input, Button, Password } from "../Common/Elements";

import "./auth.css";
import { AuthContext } from "../Context/AuthContext";
import Logo from "../Common/Logo";

const Register = (props) => {
  const [form] = Form.useForm();
  const { handleSignUp } = useContext(AuthContext);

  const handleSubmit = () => {
    form.validateFields().then(async (values) => {
      delete values.confirmPassword;
      handleSignUp(values);
    });
  };

  return (
    <Form form={form} layout="vertical">
      <div style={{ paddingBottom: "40px" }}>
        <Logo fontSize={"40px"} auth />
      </div>
      <div className={"login-wrapper"}>
        <span className={"heading"}>Register</span>
        <br />
        <Input
          name="name"
          label="Full Name"
          required
          formstyle={{ width: "85%" }}
          labelcolor={"white"}
        />

        <Input
          name="email"
          label="Username"
          required
          formstyle={{ width: "85%" }}
          labelcolor={"white"}
        />
        <Password
          name="password"
          label="Password"
          formstyle={{ width: "85%" }}
          required
          labelcolor={"white"}
        />

        <Password
          name="confirmPassword"
          label="Confirm Password"
          formstyle={{ width: "85%" }}
          required
          labelcolor={"white"}
        />
        <br />
        <Button
          style={{ width: "85%", marginLeft: "7.5%" }}
          type="primary"
          onClick={handleSubmit}
        >
          Register
        </Button>

        <p style={{ color: "white", marginTop: 8 }}>
          Already have an account?{" "}
          <span>
            <Link to={"/auth/login"}>login</Link>
          </span>
        </p>
      </div>
    </Form>
  );
};

export default Register;
