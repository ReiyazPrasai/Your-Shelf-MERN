import React from "react";
import { Form, Row, Col, Tabs, Descriptions } from "antd";

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
      <div className=" centralize full">
        <Card style={{ width: "550px", padding: 10 }} black>
          <Tabs>
            <Tabs.TabPane key="1" tab="Basic">
              <Card
                onSave={handleSubmit}
                onCancel={handelCancel}
                title={"Company Information"}
                style={{ width: "100%", padding: 10 }}
                className="description"
                black
              >
                <Row gutter={[8, 8]}>
                  <Col span={12}>
                    <Input name="companyName" label="Company Name" required />
                  </Col>
                  <Col span={12}>
                    <Input
                      name="registrationNumber"
                      label="Registration Number"
                      required
                    />
                  </Col>
                </Row>
                <Row gutter={[8, 8]}>
                  <Col span={12}>
                    <Input
                      name="contactNumber"
                      label="Contact Number"
                      required
                    />
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
            </Tabs.TabPane>
            <Tabs.TabPane key="2" tab="Finance">
              <Card
                onSave={handleSubmit}
                onCancel={handelCancel}
                title={"Financial Information"}
                style={{ width: "100%", padding: 10 }}
                black
              >
                <Row gutter={[8, 8]}>
                  <Col span={8}>
                    <Descriptions
                      className="description"
                      style={{ background: "none" }}
                      layout="vertical"
                    >
                      <Descriptions.Item
                        style={{ background: "none", fontWeight: "bold" }}
                        label="App Commission"
                      >
                        0.2 %
                      </Descriptions.Item>
                    </Descriptions>
                  </Col>
                  <Col span={8}>
                    <Input name="vat" label="Vat (%)" required />
                  </Col>
                  <Col span={8}>
                    <Input
                      name="allowedProfitMargin"
                      label="Allowed Profit Margin (%)"
                      required
                    />
                  </Col>
                </Row>
                <Row gutter={[8, 8]}>
                  <Col span={8}>
                    <Input name="specialDiscount" label="Special Discount(%)" />
                  </Col>
                  <Col span={8}>
                    <Input name="validFrom" label="Valid From" />
                  </Col>
                  <Col span={8}>
                    <Input name="validTo" label="Valid To" />
                  </Col>
                </Row>

                <Row gutter={[8, 8]}>
                  <Col span={24}>
                    <TextArea name="message" label="Message" required />
                  </Col>
                </Row>
              </Card>
            </Tabs.TabPane>
          </Tabs>
        </Card>
      </div>
    </Form>
  );
};

export default MainAddForm;
