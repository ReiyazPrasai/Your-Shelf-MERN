import React, { useEffect, useState } from "react";
import { Form, Row, Col } from "antd";

import { Card, Input, Password, Select } from "../Common/Elements";

const MainAddForm = (props) => {
  const { fetchRoleList } = props;
  const [form] = Form.useForm();
  const [selectedRole, setSelectedRole] = useState([]);
  const [password, setPassword] = useState(null);

  const [selectedGroupName, setSelectedGroupName] = useState({});

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      delete values.confirmPassword
      props.addNewUser({
        user: { ...values, groupName: selectedGroupName, roles: selectedRole },
      });
    });
  };

  const handelCancel = () => {
    form.resetFields();
    form.setFieldsValue({ isActive: true });
    setSelectedRole([]);
  };

  useEffect(() => {
    // setSelectedRole(props.groups?.roles);
  }, []);
  console.log("selectedRole", selectedRole);
  return (
    <Form className={"full"} form={form} layout={"vertical"}>
      <div>
        <Card
          onSave={handleSubmit}
          onCancel={handelCancel}
          to="/features/brands"
          status
          isActive={true}
          style={{ width: "500px", padding: 20, margin: "auto" }}
          black
          form={form}
          loading={props.groupLoading}
        >
          <Row gutter={[8, 8]}>
            <Col span={24}>
              <Input name="name" label="Full Name" required />
            </Col>
          </Row>
          <Row gutter={[8, 8]}>
            <Col span={24}>
              <Input name="email" label="Email Address" required />
            </Col>
          </Row>
          <Row gutter={[8, 8]}>
            <Col span={12}>
              <Select
                name="groupId"
                label="Group Name"
                array={props.groups}
                description={"name"}
                value={"_id"}
                onChange={(e) => {
                  const group = props.groups.find(({ _id }) => _id === e);
                  setSelectedGroupName(group.name);
                  fetchRoleList([
                    {
                      action: "search",
                      searchBy: { isActive: true, groupId: group?._id },
                    },
                  ]);
                }}
                required
              />
            </Col>
            <Col span={12}>
              <Select
                name="roleId"
                label="Role"
                array={props.roles}
                description={"name"}
                value={"_id"}
                onChange={(e) => {
                  setSelectedRole(
                    props.roles.find(({ _id }) => _id === e)?.roles
                  );
                }}
                required
              />
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={24}>
              <Password
                name={"password"}
                label="Password"
                required
                labelcolor={"white"}
                onChange={(e) => {
                  setPassword(e.target.value);
                  form.getFieldValue("confirmPassword") &&
                    form.validateFields(["confirmPassword"], {
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
        </Card>
      </div>
    </Form>
  );
};

export default MainAddForm;
