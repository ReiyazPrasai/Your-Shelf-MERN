import { Col, Row } from "antd";
import React from "react";
import { getQuery } from "../../utils/commonUtils";
import { Button, Input, SearchButton, Select } from "../Common/Elements";

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
    if (
      formData.name ||
      formData.isActive ||
      formData.isActive === false ||
      formData.isApproved ||
      formData.isApproved === false
    ) {
      setListQuery(getQuery(formData, listQuery));
      fetchBrandList(getQuery(formData, listQuery));
    }
  };

  const handleClearSearch = () => {
    props.form.resetFields();
    setListQuery(listQuery.filter((item) => item.action === "sort"));
    fetchBrandList();
  };

  return (
    <Row gutter={8}>
      <Col xxl={8} xl={7} lg={6} md={12} sm={12} xs={24}>
        <Input name="name" label="Brand Name" />
      </Col>

      <Col xxl={4} xl={5} lg={5} md={12} sm={12} xs={24}>
        <Select
          name="isApproved"
          label="Approval Status"
          array={approvalStatus}
          value={"value"}
          description={"description"}
        />
      </Col>
      <Col xxl={4} xl={5} lg={5} md={12} sm={12} xs={24}>
        <Select
          name="isActive"
          label="Active Status"
          array={activeStatus}
          value={"value"}
          description={"description"}
        />
      </Col>

      <Col xxl={8} xl={7} lg={8} md={12} sm={12} xs={24}>
        <Row gutter={8}>
          <Col span={2} xl={3} md={3} sm={4} xs={3}>
            <SearchButton
              style={{ color: "#10BC83", width: "100%" }}
              onClick={!isClearSearch ? handleSearch : handleClearSearch}
              isSearch
            >
              Search
            </SearchButton>
          </Col>
          {isClearSearch && (
            <Col span={2} xl={3} md={3} sm={4} xs={3}>
              <SearchButton
                style={{ color: "#10BC83", width: "100%" }}
                onClick={!isClearSearch ? handleSearch : handleClearSearch}
              />
            </Col>
          )}
          <Col
            span={!isClearSearch ? 22 : 20}
            xl={!isClearSearch ? 21 : 18}
            md={!isClearSearch ? 21 : 18}
            sm={!isClearSearch ? 20 : 16}
            xs={!isClearSearch ? 21 : 18}
          >
            <Button
              style={{ float: "right", width: "100%" }}
              type="primary"
              to="/features/brands/add"
            >
              Add Brand
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ListTop;
