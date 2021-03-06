import { Col, Row } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { isEmpty } from "../../utils/commonUtils";
import { Button, Card } from "../Common/Elements";
import { v4 as uuidv4 } from "uuid";

const View = (props) => {
  const [description, setDescription] = useState({});
  const [finance, setFinance] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("https://uat.esewa.com.np/epay/main", {
      amt: 100,
      psc: 0,
      pdc: 0,
      txAmt: 13,
      tAmt: 113,
      pid: props.product._id + "_" + uuidv4(),
      scd: "EPAYTEST",
      su: "http://merchant.com.np/page/esewa_payment_success",
      fu: "http://merchant.com.np/page/esewa_payment_failed",
    });
  };

  useEffect(() => {
    if (!isEmpty(props.product)) {
      setDescription(props.product.description);
      setFinance(props.product.finance);
    }
  }, [props.product]);

  return (
    <Card loading={props.productLoading} style={{ padding: 5 }}>
      <Row gutter={8}>
        <Col span={12}>
          <div style={{ padding: 15 }}>
            <img
              style={{ width: "100%" }}
              src={
                process.env.REACT_APP_BUCKET_ENDPOINT +
                props.product?.image?.url
              }
              alt={"product"}
            />
          </div>
        </Col>
        <Col span={12}>
          <Row>
            <Col>
              <div style={{ padding: 15 }}>
                <h1>
                  <b>{description.name}</b>
                </h1>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button type="primary" onClick={handleSubmit}>
                Buy Now
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default View;
