import { Col, Row } from "antd";
import React, { useState } from "react";
import { Input } from "../Common/Elements";

const ProductFinance = (props) => {
  const [total, setTotal] = useState({ quantity: 0, price: 0 });
  let temp = props.totalQuantityAndPrice;
  const handelChange = (e, index, valueIndex, field) => {
    temp[index] = {
      ...temp[index],
      qAndP: temp[index].qAndP.map((item, i) => {
        return i === valueIndex
          ? { ...item, [field]: Number(e.target.value) }
          : item;
      }),
    };
    props.setTotalQuantityAndPrice(temp);
    props.setFormData({
      ...props.formData,
      finance: { ...props.formData.finance, stocksDetail: temp },
    });
    setTotal({
      quantity: handleTotal("quantity"),
      price: handleTotal("price"),
    });
  };

  const handleTotal = (field) => {
    return props.totalQuantityAndPrice.reduce((acc, value) => {
      return (
        acc +
        value.qAndP.reduce((a, qp) => {
          if (field === "quantity") return a + qp[field];
          return a + qp[field] * qp.quantity;
        }, 0)
      );
    }, 0);
  };

  return (
    <div style={{ padding: "20px 0" }}>
      <Row align="middle" gutter={8}>
        <Col span={6}>
          <div className={"centralize"}>Vat (%):</div>
          <div className={"centralize"}>{props.company.finance?.vat}</div>
        </Col>
        <Col span={18}>
          <Row align="middle" gutter={8}>
            <Col span={9}>
              <Input
                name="discount"
                label={"Discount"}
                initialValue={props.company.finance?.discount?.discountPercent}
                onChange={(e) => {
                  props.setFormData({
                    ...props.formData,
                    finance: {
                      ...props.formData.finance,
                      discount: Number(e.target.value),
                    },
                  });
                }}
              />
            </Col>
            <Col span={15}>
              <Input
                name="allowedProfitMargin"
                label={"Allowed Profit Margin (%"}
                initialValue={props.company.finance?.allowedProfitMargin}
                onChange={(e) => {
                  props.setFormData({
                    ...props.formData,
                    finance: {
                      ...props.formData.finance,
                      allowedProfitMargin: Number(e.target.value),
                    },
                  });
                }}
              />
            </Col>
          </Row>
        </Col>
      </Row>

      <hr />
      {props.formData.description?.attributes?.map(
        ({ attribute, attributeValueList }, index) => {
          return (
            <div key={index}>
              <Row align="middle" gutter={8}>
                <Col span={6}>
                  <div className={"centralize"}>
                    {
                      props.attributes.find(({ _id }) => _id === attribute)
                        ?.name
                    }
                    :
                  </div>
                </Col>
                <Col span={18}>
                  {attributeValueList?.map((item, valueIndex) => {
                    return (
                      <Row key={item} align="middle" gutter={8}>
                        <Col span={9}>
                          <div className={"centralize"}>
                            {
                              props.attributes
                                .find(({ _id }) => _id === attribute)
                                ?.attributeValues.find(
                                  ({ _id }) => _id === item
                                )?.name
                            }
                            :
                          </div>
                        </Col>
                        <Col span={5}>
                          <Input
                            name={[attribute, item, "quantity"]}
                            label="Quantity"
                            hideLabel={valueIndex !== 0}
                            placeholder="Quantity"
                            onChange={(e) => {
                              handelChange(e, index, valueIndex, "quantity");
                            }}
                          />
                        </Col>
                        <Col span={10}>
                          <Input
                            name={[attribute, item, "price"]}
                            hideLabel={valueIndex !== 0}
                            label="Price Per Unit"
                            onChange={(e) => {
                              handelChange(e, index, valueIndex, "price");
                            }}
                          />
                        </Col>
                      </Row>
                    );
                  })}
                </Col>
              </Row>
            </div>
          );
        }
      )}
      <hr />
      <Row align="middle" gutter={8}>
        <Col span={6}></Col>
        <Col span={18}>
          <Row align="middle" gutter={8}>
            <Col span={9}>
              <div className={"centralize"}>Total:</div>
            </Col>
            <Col span={5}>
              <div className={"centralize"}>{total.quantity}</div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default ProductFinance;
