import React, { useState } from "react";
import { Col, Row } from "antd";

import { listSearch } from "../../utils/commonUtils";
import { Button, Input, Select } from "../Common/Elements";

const ListTop = (props) => {
  const [isSearched, setIsSearched] = useState(false);

  const activeStatus = [
    { value: true, description: "Yes" },
    { value: false, description: "No" },
    { value: "all", description: "Both" },
  ];

  const approvalStatus = [
    { value: true, description: "Approved" },
    { value: false, description: "Disapproved" },
    { value: "pending", description: "Pending" },

    { value: "all", description: "All" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    listSearch(props.form, props.categories, props.setDataSource);
    setIsSearched(true);
  };

  return (
    <Row gutter={8}>
      <Col
        xxl={6}
        xl={!isSearched ? 7 : 6}
        lg={8}
        md={8}
        sm={!isSearched ? 24 : 12}
        xs={24}
      >
        <Input name={`${props.expandedRowKey}_name`} label="Category Name" />
      </Col>

      <Col xxl={4} xl={!isSearched ? 5 : 4} lg={8} md={8} sm={12} xs={24}>
        <Select
          name={`${props.expandedRowKey}_isApproved`}
          label="Approval Status"
          array={approvalStatus}
          value={"value"}
          description={"description"}
        />
      </Col>
      <Col xxl={4} xl={!isSearched ? 5 : 4} lg={8} md={8} sm={12} xs={24}>
        <Select
          name={`${props.expandedRowKey}_isActive`}
          label="Active Status"
          array={activeStatus}
          value={"value"}
          description={"description"}
        />
      </Col>
      <Col xxl={3} xl={3} lg={8} md={8} sm={!isSearched ? 12 : 6} xs={12}>
        <Button
          style={{ color: "#10BC83", width: "100%" }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Col>

      <Col
        xxl={!isSearched ? 0 : 3}
        xl={!isSearched ? 0 : 3}
        lg={!isSearched ? 0 : 8}
        md={!isSearched ? 0 : 8}
        sm={!isSearched ? 0 : 6}
        xs={!isSearched ? 0 : 12}
      >
        {isSearched && (
          <Button
            style={{ color: "#10BC83", width: "100%" }}
            onClick={() => {
              props.form.resetFields();
              props.setDataSource(props.categories);
              setIsSearched(false);
            }}
          >
            Clear Search
          </Button>
        )}
      </Col>
    </Row>
  );
};

export default ListTop;
