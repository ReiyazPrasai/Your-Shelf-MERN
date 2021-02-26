import React, { useState } from "react";
import { Form, Row, Col, Checkbox } from "antd";

import { Card, Input } from "../Common/Elements";
import { getModuleList } from "../../utils/commonUtils";
import { Switch } from "react-router";

const MainAddForm = (props) => {
  const [form] = Form.useForm();
  const [selectModules, setSelectedModule] = useState([]);

  const handleCheckboxChange = (e, id) => {
    if (e.target.checked) {
      setSelectedModule([...selectModules, id]);
    } else {
      setSelectedModule(selectModules.filter((item) => id !== item));
    }
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      props.addNewGroup({ ...values, modules: selectModules });
    });
  };

  const handelCancel = () => {
    form.resetFields();
    form.setFieldsValue({ isActive: true });
  };

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
        >
          <Row gutter={[8, 8]}>
            <Col span={24}>
              <Input name="name" label="Group Name" required />
            </Col>
          </Row>
          <Row>
            <Col
              style={{
                border: "1px solid #808080",
                padding: 10,
                borderRadius: 2,
              }}
              span={24}
            >
              <h4>Select Allowed Module</h4>
              {getModuleList().map((item) => {
                return (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        padding: 5,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ marginRight: 10 }}>{item.icon}</span>{" "}
                      <span>{item.label}</span>
                    </div>
                    <div style={{ float: "right" }}>
                      <Checkbox
                        onChange={(e) => handleCheckboxChange(e, item.id)}
                      />
                    </div>
                  </div>
                );
              })}
            </Col>
          </Row>
        </Card>
      </div>
    </Form>
  );
};

export default MainAddForm;
