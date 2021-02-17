import React, { useState } from "react";
import { Form, Row, Col } from "antd";
import { DeleteFilled, PlusOutlined } from "@ant-design/icons";

import { Card, Input, Button, Switch } from "../Common/Elements";

const MainAddForm = (props) => {
  const [form] = Form.useForm();
  const [subCategoriesId, setSubCategorieId] = useState(1);
  const [subCategories, setSubCategories] = useState([1]);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const formData = {
        ...values,
        subCategories: values.subCategories.filter((item) => item?.name),
      };
      props.addNewCategory(formData);
    });
  };

  const handelCancel = () => {
    form.resetFields();
  };

  const handleAddSubCategory = () => {
    setSubCategorieId(subCategoriesId + 1);
    setSubCategories([...subCategories, subCategoriesId + 1]);
  };

  return (
    <Form className={"full"} form={form} layout={"vertical"}>
      <div style={{margin: 'auto', padding: 24}}>
        <Card
          onSave={handleSubmit}
          onCancel={handelCancel}
          to="/categories"
          status
          isActive={true}
          style={{ width: "500px", padding: 20, margin: '20px auto' }}
          black
          form={form}
        >
          <Row gutter={[8, 8]}>
            <Col span={24}>
              <Input name="name" label="Category Name" required />
            </Col>
          </Row>
          {subCategories?.map((item, index) => {
            return (
              <Row gutter={[8, 8]}>
                <Col span={subCategories.length === 1 ? 22 : 20}>
                  <Input
                    name={["subCategories", item, "name"]}
                    hideLabel={index !== 0}
                    label="Sub Category Name"
                  />
                </Col>
                <Col span={2}>
                  <Switch
                    name={["subCategories", item, "isActive"]}
                    initialValue={true}
                    hideLabel={index > 0}
                    form={form}
                    size="small"
                  />
                </Col>
                {subCategories.length > 1 && (
                  <Col span={1}>
                    <DeleteFilled
                      onClick={(e) => {
                        e.preventDefault();
                        setSubCategories(
                          subCategories.filter((key) => {
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
            onClick={handleAddSubCategory}
          >
            <PlusOutlined style={{ color: "#15ca00" }} />
          </Button>
        </Card>
      </div>
    </Form>
  );
};

export default MainAddForm;
