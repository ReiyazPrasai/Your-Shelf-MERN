import React, { useEffect, useState } from "react";
import { Form, Row, Col, Steps } from "antd";

import {
  UserOutlined,
  ProfileOutlined,
  LoadingOutlined,
  FileImageOutlined,
} from "@ant-design/icons";

import { Button, Card } from "../Common/Elements";
import ProductDescription from "./ProductDescription";
import ProductFinance from "./ProductFinance";
import ProductImageUploads from "./ProductImageUploads";
import { isEmpty } from "../../utils/commonUtils";
const { Step } = Steps;

const MainAddForm = (props) => {
  const [form] = Form.useForm();
  const [attributeValueId, setAttributeValueId] = useState(0);
  const [attributeValues, setAttributeValues] = useState([0]);
  const [attributeSelectOptions, setAttributeSelectOptions] = useState([]);
  const [
    attributeValueSelectOptions,
    setAttributeValueSelectOptions,
  ] = useState([]);
  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState({});
  const [totalQuantityAndPrice, setTotalQuantityAndPrice] = useState([]);
  const [image, setImage] = useState(null);

  const handleAddAttributeValues = () => {
    setAttributeValueId(attributeValueId + 1);
    setAttributeValues([...attributeValues, attributeValueId + 1]);
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {

      const params = new FormData()

      params.append('image', image)
      params.append('data', JSON.stringify({ ...formData, isActive: props.isActive }))

      props
        .addNewProduct(params)
        .then(() => {
          props.setIsAddProduct(false);
          setFormData(false);
          form.resetFields();
          setAttributeValueId(0);
          setAttributeValues([0]);
          setAttributeSelectOptions([]);
          setAttributeValueSelectOptions([]);
          setCurrent(0);
          setTotalQuantityAndPrice([]);
        });
    });
  };

  const next = (index) => {
    if (typeof index === "number" && current < steps.length) {
      form.validateFields().then((values) => {
        current === 0 &&
          setFormData({
            ...formData,
            ...values,
            description: {
              ...values.description,
              attributes: values.description?.attributes.filter((item) => item),
            },
          });
        setCurrent(index);
      });
    } else {
      form.validateFields().then((values) => {
        current === 0 &&
          setFormData({
            ...formData,
            ...values,
            description: {
              ...values.description,
              attributes: values.description?.attributes.filter((item) => item),
            },
          });
        setCurrent(current + 1);
      });
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: "Description",
      content: (
        <ProductDescription
          handleAddAttributeValues={handleAddAttributeValues}
          attributeValueList={attributeValues}
          setAttributeValues={setAttributeValues}
          attributeValueId={attributeValueId}
          setAttributeValueId={setAttributeValueId}
          attributeSelectOptions={attributeSelectOptions}
          setAttributeSelectOptions={setAttributeSelectOptions}
          attributeValueSelectOptions={attributeValueSelectOptions}
          setAttributeValueSelectOptions={setAttributeValueSelectOptions}
          setFormData={setFormData}
          form={form}
          {...props}
        />
      ),
      icon: <UserOutlined />,
      description: (
        <span style={{ fontSize: ".6rem" }}>Product Description</span>
      ),
    },
    {
      title: "Finance",
      content: (
        <ProductFinance
          form={form}
          totalQuantityAndPrice={totalQuantityAndPrice}
          setTotalQuantityAndPrice={setTotalQuantityAndPrice}
          formData={formData}
          setFormData={setFormData}
          {...props}
        />
      ),
      icon: <ProfileOutlined />,
      description: (
        <span style={{ fontSize: ".6rem" }}>Quantity and Price</span>
      ),
    },

    {
      title: "Images",
      content: (
        <ProductImageUploads
          image={image}
          setImage={setImage}
          form={form}
          {...props}
        />
      ),
      icon: <FileImageOutlined />,
    },
  ];

  useEffect(() => {
    if (current !== 1 && isEmpty(formData.finance?.stocksDetail)) {
      setTotalQuantityAndPrice(
        formData.description?.attributes?.map((item) => {
          return {
            attribute: item?.attribute,
            qAndP: item?.attributeValueList?.map((item) => ({
              quantity: 0,
              price: 0,
              attributeValueId: item,
            })),
          };
        })
      );
    }
  }, [formData, current]);

  useEffect(() => {
    setFormData({
      description: {},
      finance: {
        vat: props.company?.finance?.vat,
        discount: props.company.finance?.discount?.discountPercent || 0,
        allowedProfitMargin: props.company.finance?.allowedProfitMargin,
      },
    });
  }, [props.company]);

  return (
    <div style={{ margin: "auto" }}>
      <Card
        style={{
          padding: 20,
        }}
        black
        form={form}
        loading={
          props.categoriesLoading ||
          props.attributesLoading ||
          props.companyLoading
        }
      >
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
                  current !== index && next(index);
                }}
                style={{ cursor: "pointer" }}
              />
            );
          })}
        </Steps>
        <Form className={"full"} form={form} layout={"vertical"}>
          <div className="steps-content">{steps[current].content}</div>
        </Form>
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
              <Button hideLabel type="primary" onClick={handleSubmit}>
                Add Product
              </Button>
            </Col>
          )}
        </Row>
      </Card>
    </div>
  );
};

export default MainAddForm;
