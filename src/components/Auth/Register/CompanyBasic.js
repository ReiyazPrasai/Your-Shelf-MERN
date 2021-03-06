import React from "react";
import { Row, Col } from "antd";

import { Input, TextArea } from "../../Common/Elements";

import "../auth.css";

const CompanyBasic = (props) => {
  return (
    <div className={"login-wrapper"} style={{ width: "100%" }}>
      <span className={"heading"}>Company (Finance)</span>
      <br />
      <div style={{ width: "100%", padding: "0 25px" }}>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Input
              name={["company", "basic", "name"]}
              label="Company Name"
              required
            />
          </Col>
        </Row>
        <Row gutter={[8, 8]}>
          <Col span={12}>
            <Input
              name={["company", "basic", "registrationNumber"]}
              label="Registration Number"
              required
            />
          </Col>
          <Col span={12}>
            <Input
              name={["company", "basic", "ownerCount"]}
              label="Number of Owners"
              required
            />
          </Col>
        </Row>
        <Row gutter={[8, 8]}>
          <Col span={12}>
            <Input
              name={["company", "basic", "contactNumber"]}
              label="Contact Number"
              required
            />
          </Col>
          <Col span={12}>
            <Input name={["company", "basic", "city"]} label="City" required />
          </Col>
        </Row>

        <Row gutter={[8, 8]}>
          <Col span={24}>
            <TextArea
              name={["company", "basic", "address"]}
              label="Company Address"
              required
            />
          </Col>
        </Row>
        <br />
      </div>
    </div>
  );
};

export default CompanyBasic;
