import React, { useState } from "react";

import { Input, Password } from "../../Common/Elements";

import "../auth.css";
import { Col, Row } from "antd";

const PartnerInformation = (props) => {
  const [password, setPassword] = useState(null);

  return (
    <div className={"login-wrapper"} style={{ width: "100%" }}>
      <span className={"heading"}>User</span>
      <br />
      <div style={{ width: "100%", padding: "0 25px" }}>
        <Row gutter={8}>
          <Col span={24}>
            <Input
              name={["user", "name"]}
              label="Full Name"
              required
              labelcolor={"white"}
            />
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={24}>
            <Input
              name={["user", "email"]}
              label="Email Address"
              required
              labelcolor={"white"}
              type={"email"}
            />
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={24}>
            <Password
              name={["user", "password"]}
              label="Password"
              required
              labelcolor={"white"}
              onChange={(e) => {
                setPassword(e.target.value);
                props.form.getFieldValue("confirmPassword") &&
                  props.form.validateFields(["confirmPassword"], {
                    force: true,
                  });
              }}
              validate
            />
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={24}>
            <Password
              name="confirmPassword"
              label="Confirm Password"
              required
              labelcolor={"white"}
              rules={[
                {
                  validator: (rules, values) => {
                    if (values === password) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject("Should be same as password");
                    }
                  },
                },
              ]}
            />
          </Col>
        </Row>

        <br />
      </div>
    </div>
  );
};

export default PartnerInformation;
