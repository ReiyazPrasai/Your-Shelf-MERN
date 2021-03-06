import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Steps, Row, Col } from "antd";
import Logo from "../../Common/Logo";
import {
  UserOutlined,
  ProfileOutlined,
  LoginOutlined,
  LoadingOutlined,
} from "@ant-design/icons";

import PartnerInformation from "./PartnerInformation";
import { Button } from "../../Common/Elements";
import "../auth.css";
import CompanyBasic from "./CompanyBasic";
import TermsAndCondition from "./TermsAndCondition";
import { AuthContext } from "../../Context/AuthContext";

const { Step } = Steps;

const Index = (props) => {
  const [form] = Form.useForm();
  const { handleSignUp } = useContext(AuthContext);
  const [current, setCurrent] = useState(0);
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [formData, setFormData] = useState({});

  const handleSubmit = () => {
    handleSignUp(formData);
  };
  
  const steps = [
    {
      title: "User",
      content: <PartnerInformation {...props} form={form} />,
      icon: <UserOutlined />,
      description: (
        <span style={{ fontSize: ".6rem" }}>
          Information of owner with majority share.
        </span>
      ),
    },
    {
      title: "Company",
      content: <CompanyBasic {...props} form={form} />,
      icon: <ProfileOutlined />,
      subTitle: "(Basic)",
      description: (
        <span style={{ fontSize: ".6rem" }}>
          Basic information of the company.
        </span>
      ),
    },

    {
      title: "Register",
      content: (
        <TermsAndCondition
          {...props}
          form={form}
          setIsTermsChecked={setIsTermsChecked}
          isTermsChecked={isTermsChecked}
        />
      ),
      icon: <LoginOutlined />,
    },
  ];

  const next = (index) => {
    if (typeof index === "number" && current < steps.length) {
      form.validateFields().then((values) => {
        if (current === 0) {
          values.user.groupName = "Owner";
          values.user.roles = ["All"];
        }
        delete values.confirmPassword;
        setFormData({ ...formData, ...values });
        setCurrent(index);
      });
    } else {
      form.validateFields().then((values) => {
        if (current === 0) {
          values.user.groupName = "Owner";
          values.user.roles = ["All"];
        }
        delete values.confirmPassword;
        setFormData({ ...formData, ...values });
        setCurrent(current + 1);
      });
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <div style={{ width: 500, margin: "20px auto" }}>
      <Logo fontSize={"40px"} auth />
      <br />
      <Steps current={current}>
        {steps.map((step, index) => {
          return (
            <Step
              key={index}
              status={
                current === index
                  ? "process"
                  : index < current
                  ? "finish"
                  : "wait"
              }
              subTitle={step.subTitle}
              title={step.title}
              description={step.description}
              icon={current === index ? <LoadingOutlined /> : step.icon}
              onClick={() => {
                next(index);
              }}
              style={{ cursor: "pointer" }}
            />
          );
        })}
      </Steps>
      <Form form={form} layout="vertical">
        <div className="steps-content">{steps[current].content}</div>
      </Form>
      <p style={{ color: "white", marginTop: 8 }}>
        Already have an account?{" "}
        <span>
          <Link to={"/auth/login"}>login</Link>
        </span>
      </p>
      <Row gutter={8}>
        <Col span={12}>
          {current > 0 && (
            <Button hideLabel onClick={() => prev()}>
              Previous
            </Button>
          )}
        </Col>
        {current < steps.length - 1 && (
          <Col span={12}>
            <Button hideLabel type="primary" onClick={() => next()}>
              Next
            </Button>
          </Col>
        )}
        {current === steps.length - 1 && (
          <Col span={12}>
            <Button
              hideLabel
              type="primary"
              onClick={handleSubmit}
              disabled={!isTermsChecked}
            >
              Register
            </Button>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default Index;
