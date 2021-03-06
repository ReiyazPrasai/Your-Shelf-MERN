import React, { useState } from "react";
import { Row, Col } from "antd";
import {
  Button,
  DeleteButton,
  Input,
  Select,
  TextArea,
} from "../Common/Elements";
import history from "../../utils/historyUtil";
import { PlusOutlined } from "@ant-design/icons";
import { isEmpty } from "../../utils/commonUtils";

const ProductDescription = (props) => {
  const [selectedAttributes, setSelectedAttributes] = useState([]);

  const getAttributeArray = (item) => {
    const value = props.form.getFieldValue([
      "description",
      "attributes",
      item,
      "attribute",
    ]);
    
    return props.attributeSelectOptions.filter(({ _id }) => {
      if (_id === value) {
        return true;
      } else {
        return !selectedAttributes.includes(_id);
      }
    });
  };
  return (
    <div style={{ padding: "20px 0" }}>
      <Row gutter={8}>
        <Col span={12}>
          <Input name={["description", "name"]} label="Product Name"  />
        </Col>
        <Col span={12}>
          <Row gutter={4}>
            <Col span={20}>
              <Select
                name={["description", "brand"]}
                label="Associated Brand"
                array={props.brands}
                description={"name"}
                value={"_id"}
              />
            </Col>
            <Col span={4}>
              <Button
                onClick={() => {
                  props.setIsAddProduct(false);
                  history.push("/features/brands/add");
                }}
                type="primary"
              >
                Add
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={24}>
          <TextArea
            name={["description", "description"]}
            label="Product Description"
            
          />
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={12}>
          <Row gutter={4}>
            <Col span={20}>
              <Select
                name={["description", "category"]}
                label="Product Category"
                array={props.categories}
                description={"name"}
                value={"_id"}
                onChange={(e) => {
                  props.fetchSubCategoryList(e, props.searchQuery);
                  props.form.resetFields([
                    ["description", "subCategories"],
                    ["description", "attributes"],
                  ]);

                  props.setAttributeSelectOptions(
                    props.attributes.filter(
                      ({ categoryIdList }) =>
                        categoryIdList.filter(({ id }) => id === e)?.length > 0
                    )
                  );
                  props.setAttributeValues([0]);
                  props.setAttributeValueId(0);
                  props.setAttributeValueSelectOptions([]);

                  setSelectedAttributes([]);
                }}
                
              />
            </Col>
            <Col span={4}>
              <Button
                onClick={() => {
                  props.setIsAddProduct(false);
                  history.push("/features/categories/add");
                }}
                type="primary"
              >
                Add
              </Button>
            </Col>
          </Row>
        </Col>

        <Col span={12}>
          <Select
            name={["description", "subCategories"]}
            label="Sub-Categories"
            array={props.subCategories}
            description={"name"}
            value={"_id"}
            mode="multiple"
            
          />
        </Col>
      </Row>
      {props.attributeValueList?.map((item, index) => {
        return (
          <Row gutter={8}>
            <Col span={12}>
              <Row gutter={4}>
                <Col
                  span={
                    props.attributeValueList.length > 1
                      ? index === props.attributeValueList.length - 1
                        ? 20
                        : 24
                      : 20
                  }
                >
                  <Select
                    name={["description", "attributes", item, "attribute"]}
                    label="Attributes"
                    array={getAttributeArray(item)}
                    hideLabel={index !== 0}
                    description={"name"}
                    value={"_id"}
                    onChange={(e) => {
                      props.form.resetFields([
                        [
                          "description",
                          "attributes",
                          item,
                          "attributeValueList",
                        ],
                      ]);

                      props.setAttributeValueSelectOptions(
                        props.attributeSelectOptions.find(
                          ({ _id }) => _id === e
                        )?.attributeValues
                      );

                      if (e) {
                        let temp = selectedAttributes;
                        temp[index] = e;
                        setSelectedAttributes(temp);
                      } else {
                        setSelectedAttributes(
                          selectedAttributes.filter((_, selectedIndex) => {
                            return index !== selectedIndex;
                          })
                        );
                      }
                    }}
                    
                  />
                </Col>
                {props.attributeValueList.length > 1 ? (
                  index !== props.attributeValueList.length - 1 ? null : (
                    <Col span={4}>
                      <Button
                        hideLabel={index !== 0}
                        onClick={() => {
                          props.setIsAddProduct(false);
                          history.push("/features/attributes/add");
                        }}
                        type="primary"
                      >
                        Add
                      </Button>
                    </Col>
                  )
                ) : (
                  <Col span={4}>
                    <Button
                      hideLabel={index !== 0}
                      onClick={() => {
                        props.setIsAddProduct(false);
                        history.push("/features/attributes/add");
                      }}
                      type="primary"
                    >
                      Add
                    </Button>
                  </Col>
                )}
              </Row>
            </Col>

            <Col span={12}>
              <Row gutter={4}>
                <Col
                  span={
                    props.attributeValueList.length > 1
                      ? index === props.attributeValueList.length - 1
                        ? 18
                        : 21
                      : 20
                  }
                >
                  <Select
                    name={[
                      "description",
                      "attributes",
                      item,
                      "attributeValueList",
                    ]}
                    label="Attribute Values"
                    array={props.attributeValueSelectOptions}
                    hideLabel={index !== 0}
                    description={"name"}
                    value={"_id"}
                    mode="multiple"
                    
                  />
                </Col>
                {props.attributeValueList.length > 1 && (
                  <Col span={3}>
                    {index === 0 && <br />}

                    <DeleteButton
                      noConfirm
                      onClick={(e) => {
                        e.preventDefault();
                        props.setAttributeValues(
                          props.attributeValueList.filter((key) => {
                            return key !== item;
                          })
                        );
                        setSelectedAttributes(
                          selectedAttributes.filter(
                            (_, selectedIndex) => selectedIndex !== index
                          )
                        );
                      }}
                      style={{ width: "100%" }}
                    />
                  </Col>
                )}
                <Col span={props.attributeValueList.length > 1 ? 3 : 4}>
                  {index === props.attributeValueList.length - 1 && (
                    <Button
                      hideLabel={index !== 0}
                      onClick={props.handleAddAttributeValues}
                      type="primary"
                      disabled={isEmpty(
                        props.attributeSelectOptions?.filter(
                          ({ _id }) => !selectedAttributes.includes(_id)
                        )
                      )}
                    >
                      <PlusOutlined />
                    </Button>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
        );
      })}
    </div>
  );
};

export default ProductDescription;
