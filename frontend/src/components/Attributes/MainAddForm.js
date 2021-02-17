import React, { useState } from "react";
import { Form, Row, Col } from "antd";
import { DeleteFilled, PlusOutlined } from "@ant-design/icons";

import { Card, Input, Button, Switch, Select } from "../Common/Elements";

const MainAddForm = (props) => {
  const [form] = Form.useForm();
  const [attributeValueId, setAttributeValueId] = useState(1);
  const [attributeValues, setAttributeValues] = useState([1]);
  const [categoryIdListId, setCategoryIdListId] = useState(1)
  const [categoryIdList, setCategoryIdList] = useState([1])

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const formData = {
        ...values,
        attributeValues: values.attributeValues.filter((item) => item),
        categoryIdList: values.categoryIdList.filter((item) => item),
      };
      props.addNewAttribute(formData);
    });
  };

  const handelCancel = () => {
    form.resetFields();
    form.setFieldsValue({ isActive: true });
  };

  const handleAddAttributeValues = () => {
    setAttributeValueId(attributeValueId + 1);
    setAttributeValues([...attributeValues, attributeValueId + 1]);
  };
  const handleAddCategory = () => {
    setCategoryIdListId(categoryIdListId + 1);
    setCategoryIdList([...categoryIdList, categoryIdListId + 1]);
  };

  return (
    <Form className={"full"} form={form} layout={"vertical"}>
      <div style={{margin: 'auto', padding: 25}} >
        <Card
          onSave={handleSubmit}
          onCancel={handelCancel}
          to="/features/attributes"
          status
          isActive={true}
          style={{ width: "500px", minHeight: "380px", padding: 20, margin: '20px auto' }}
          black
          form={form}
        >
          <Row gutter={[8, 8]}>
            <Col span={24}>
              <Input name="name" label="Attribute Name" required />
            </Col>
          </Row>

          {attributeValues?.map((item, index) => {
            return (
              <Row gutter={[8, 8]}>
                <Col span={attributeValues.length === 1 ? 11 : 10}>
                  <Input
                    name={["attributeValues", item, "name"]}
                    hideLabel={index !== 0}
                    label="Attribute Name"
                    required
                  />
                </Col>
                <Col span={attributeValues.length === 1 ? 11 : 10}>
                  <Input
                    name={["attributeValues", item, "abbreviation"]}
                    hideLabel={index !== 0}
                    label="Abbreviation"
                    required
                  />
                </Col>
                <Col span={2}>
                  <Switch
                    name={["attributeValues", item, "isActive"]}
                    initialValue={true}
                    hideLabel={index !== 0}
                    form={form}
                    size="small"
                  />
                </Col>
                {attributeValues.length > 1 && (
                  <Col span={1}>
                    <DeleteFilled
                      onClick={(e) => {
                        e.preventDefault();
                        setAttributeValues(
                          attributeValues.filter((key) => {
                            return key !== item;
                          })
                        );
                      }}
                      style={{
                        cursor: "pointer",
                        color: "red",
                        margin: index === 0 ? "32px 0 0 5px" : "10px 0 0 5px",
                      }}
                    />
                  </Col>
                )}
              </Row>
            );
          })}
          <Button
            className="centralize"
            style={{ margin: "3px 0 8px 5px", width: 18, height: 30 }}
            onClick={handleAddAttributeValues}
          >
            <PlusOutlined style={{ color: "#15ca00" }} />
          </Button>
          {categoryIdList?.map((item, index) => {
            return (
              <Row gutter={[8, 8]}>
                <Col span={categoryIdList.length === 1 ? 24 : 23}>
                  <Select
                    name={["categoryIdList", item, "id"]}
                    hideLabel={index !== 0}
                    label="Category"
                    array={props.categories}
                    value={"_id"}
                    description={"name"}
                    onChange={(e) => {
                      if (e) {
                        props.fetchSubCategoryList(e);
                      }
                      form.setFieldsValue({ subCategoryId: null });
                    }}
                    required
                  />
                </Col>

                {categoryIdList.length > 1 && (
                  <Col span={1}>
                    <DeleteFilled
                      onClick={(e) => {
                        e.preventDefault();
                        setCategoryIdList(
                          categoryIdList.filter((key) => {
                            return key !== item;
                          })
                        );
                      }}
                      style={{
                        cursor: "pointer",
                        color: "red",
                        margin: index === 0 ? "32px 0 0 5px" : "10px 0 0 5px",
                      }}
                    />
                  </Col>
                )}
              </Row>
            );
          })}
          <Button
            className="centralize"
            style={{ margin: "3px 0 8px 5px", width: 18, height: 30 }}
            onClick={handleAddCategory}
          >
            <PlusOutlined style={{ color: "#15ca00" }} />
          </Button>
        </Card>
      </div>
    </Form>
  );
};

export default MainAddForm;
