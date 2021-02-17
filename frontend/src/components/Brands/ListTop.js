import { Col, Row } from "antd";
import React from "react";
import { getQuery } from "../../utils/commonUtils";
import { Button, Input, Select } from "../Common/Elements";

const ListTop = (props) => {
  const { setListQuery, listQuery, fetchBrandList } = props;
  const isClearSearch = !!listQuery.find((item) => item.action === "search");

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
    const formData = props.form.getFieldsValue();

    setListQuery(getQuery(formData, listQuery));
    fetchBrandList(getQuery(formData, listQuery));
  };

  return (
    <Row gutter={8}>
      <Col
        xxl={6}
        xl={!isClearSearch ? 7 : 6}
        lg={8}
        md={8}
        sm={!isClearSearch ? 24 : 12}
        xs={24}
      >
        <Input name="name" label="Category Name" />
      </Col>

      <Col xxl={4} xl={!isClearSearch ? 5 : 4} lg={8} md={8} sm={12} xs={24}>
        <Select
          name="isApproved"
          label="Approval Status"
          array={approvalStatus}
          value={"value"}
          description={"description"}
        />
      </Col>
      <Col xxl={4} xl={!isClearSearch ? 5 : 4} lg={8} md={8} sm={12} xs={24}>
        <Select
          name="isActive"
          label="Active Status"
          array={activeStatus}
          value={"value"}
          description={"description"}
        />
      </Col>
      <Col xxl={3} xl={3} lg={8} md={8} sm={!isClearSearch ? 12 : 6} xs={12}>
        <Button
          style={{ color: "#10BC83", width: "100%" }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Col>

      <Col
        xxl={!isClearSearch ? 0 : 3}
        xl={!isClearSearch ? 0 : 3}
        lg={!isClearSearch ? 0 : 8}
        md={!isClearSearch ? 0 : 8}
        sm={!isClearSearch ? 0 : 6}
        xs={!isClearSearch ? 0 : 12}
      >
        {isClearSearch && (
          <Button
            style={{ color: "#10BC83", width: "100%" }}
            onClick={() => {
              props.form.resetFields();
              setListQuery(listQuery.filter((item) => item.action === "sort"));
              fetchBrandList();
            }}
          >
            Clear Search
          </Button>
        )}
      </Col>

      <Col
        xxl={4}
        xl={4}
        lg={8}
        md={8}
        sm={!isClearSearch ? 12 : 24}
        xs={!isClearSearch ? 12 : 24}
      >
        <Button
          style={{ float: "right", width: "100%" }}
          type="primary"
          to="/brands/add"
        >
          Add Brand
        </Button>
      </Col>
    </Row>
  );
};

export default ListTop;
