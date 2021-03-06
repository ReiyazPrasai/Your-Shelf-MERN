import React, { useEffect, useState } from "react";
import { Form, Row, Col, Tabs, Descriptions } from "antd";

import { Card, Input, TextArea } from "../Common/Elements";
import { isEmpty } from "../../utils/commonUtils";

const MainAddForm = (props) => {
  const [form] = Form.useForm();
  const [initialValues, setInitialValues] = useState([]);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const formData = {
        basic: { ...initialValues.basic, ...values.basic },
        finance: { ...initialValues.finance, ...values.finance },
      };

      delete formData.basic._id;
      delete formData.finance._id;
      delete formData._id;
      delete formData.isApproved;
      delete formData.createdAt;
      delete formData.__v;

      formData.finance.vat = formData.finance.vat
        ? Number(formData.finance.vat)
        : 0;
      formData.finance.allowedProfitMargin = formData.finance
        .allowedProfitMargin
        ? Number(formData.finance.allowedProfitMargin)
        : 0;
      isEmpty(formData.finance.discount.discountPercent) &&
        delete formData.finance.discount;
      props.editCompany(formData, props.userInfo.companyId);
    });
  };

  const handelCancel = () => {
    form.resetFields();
  };

  useEffect(() => {
    setInitialValues(props.company);
  }, [props.company]);

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
                loading={isEmpty(initialValues)}
                black
              >
                <Row gutter={[8, 8]}>
                  <Col span={24}>
                    <Input
                      name={["basic", "name"]}
                      label="Company Name"
                      initialValue={initialValues?.basic?.name}
                      required
                    />
                  </Col>
                </Row>
                <Row gutter={[8, 8]}>
                  <Col span={12}>
                    <Input
                      name={["basic", "registrationNumber"]}
                      label="Registration Number"
                      initialValue={initialValues?.basic?.registrationNumber}
                      required
                    />
                  </Col>
                  <Col span={12}>
                    <Input
                      name={["basic", "ownerCount"]}
                      label="Number of Owners"
                      initialValue={initialValues?.basic?.ownerCount}
                      required
                    />
                  </Col>
                </Row>
                <Row gutter={[8, 8]}>
                  <Col span={12}>
                    <Input
                      name={["basic", "contactNumber"]}
                      label="Contact Number"
                      initialValue={initialValues?.basic?.contactNumber}
                      required
                    />
                  </Col>
                  <Col span={12}>
                    <Input
                      name={["basic", "city"]}
                      label="City"
                      initialValue={initialValues?.basic?.city}
                      required
                    />
                  </Col>
                </Row>

                <Row gutter={[8, 8]}>
                  <Col span={24}>
                    <TextArea
                      name={["basic", "address"]}
                      label="Company Address"
                      initialValue={initialValues?.basic?.address}
                      required
                    />
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
                    <Input
                      name={["finance", "vat"]}
                      label="Vat (%)"
                      initialValue={initialValues?.finance?.vat}
                      required
                    />
                  </Col>
                  <Col span={8}>
                    <Input
                      name={["finance", "allowedProfitMargin"]}
                      label="Allowed Profit Margin (%)"
                      initialValue={initialValues?.finance?.allowedProfitMargin}
                      required
                    />
                  </Col>
                </Row>
                <Row gutter={[8, 8]}>
                  <Col span={8}>
                    <Input
                      name={[
                        "company",
                        "finance",
                        "discount",
                        "discountPercent",
                      ]}
                      label="Special Discount(%)"
                      initialValue={
                        initialValues?.finance?.discount?.discountPercent
                      }
                    />
                  </Col>
                  <Col span={8}>
                    <Input
                      initialValue={initialValues?.finance?.discount?.validFrom}
                      name={["finance", "discount", "validFrom"]}
                      label="Valid From"
                    />
                  </Col>
                  <Col span={8}>
                    <Input
                      initialValue={initialValues?.finance?.discount?.validTo}
                      name={["finance", "discount", "validTo"]}
                      label="Valid To"
                    />
                  </Col>
                </Row>

                <Row gutter={[8, 8]}>
                  <Col span={24}>
                    <TextArea
                      name={["finance", "message"]}
                      label="Message"
                      initialValue={initialValues?.finance?.message}
                    />
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
