import React from "react";
import { Form, Row, Col } from "antd";

import { Card, Input, TextArea } from "../Common/Elements";

const MainAddForm = (props) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      props.addNewStore(values);
    });
  };

  const handelCancel = () => {
    form.resetFields();
  };

  return (
    <Form className={"full"} form={form} layout={"vertical"}>
      <div className="centralize full">
        <Card
          onSave={handleSubmit}
          onCancel={handelCancel}
          to="/stores/manage"
          status
          isActive={true}
          style={{ width: "500px", padding: 20 }}
          black
        >
          <Row gutter={[8, 8]}>
            <Col span={24}>
              <Input name="name" label="Store" required />
            </Col>
          </Row>
          <Row gutter={[8, 8]}>
            <Col span={12}>
              <Input name="contactNumber" label="Contact Number" required />
            </Col>
            <Col span={12}>
              <Input name="city" label="City" required />
            </Col>
          </Row>

          <Row gutter={[8, 8]}>
            <Col span={24}>
              <TextArea name="address" label="Address" required />
            </Col>
          </Row>
        </Card>
      </div>
    </Form>
  );
};

export default MainAddForm;
