import React from "react";
import { Form, Row, Col } from "antd";

import { Card, Input } from "../Common/Elements";

const MainAddForm = (props) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      props.addNewBrand(values);
    });
  };

  const handelCancel = () => {
    form.resetFields();
    form.setFieldsValue({ isActive: true });
  };

  return (
    <Form className={"full"} form={form} layout={"vertical"}>
      <div className="centralize full">
        <Card
          onSave={handleSubmit}
          onCancel={handelCancel}
          to="/brands"
          status
          isActive={true}
          style={{ width: "500px", padding: 20 }}
          black
          form={form}
        >
          <Row gutter={[8, 8]}>
            <Col span={24}>
              <Input name="name" label="Brand Name" required />
            </Col>
          </Row>
        </Card>
      </div>
    </Form>
  );
};

export default MainAddForm;
