import { Col, Row } from "antd";
import React from "react";
import { getQuery } from "../../utils/commonUtils";
import { Input, SearchButton, Select } from "../Common/Elements";

const SubListTop = (props) => {
  const {
    setData,
    expandedRowKeys,
    setListQuery,
    listQuery,
    fetchSubCategoryList,
  } = props;

  const isClearSearch = !!listQuery.find((item) => item.action === "search");

  const activeStatus = [
    { value: true, description: "Yes" },
    { value: false, description: "No" },
    { value: "all", description: "Both" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = props.form.getFieldsValue()[expandedRowKeys[0]];
    if (formData.name || formData.isActive || formData.isActive === false) {
      setListQuery(getQuery(formData, listQuery));
      fetchSubCategoryList(
        expandedRowKeys[0],
        getQuery(formData, listQuery)
      ).then((res) => {
        setData(res);
      });
    }
  };

  const handleClearSearch = () => {
    props.form.resetFields();
    setListQuery(listQuery.filter((item) => item.action === "sort"));
    fetchSubCategoryList(expandedRowKeys[0]).then((res) => {
      setData(res);
    });
  };

  return (
    <Row gutter={8}>
      <Col
        xxl={6}
        xl={6}
        lg={!isClearSearch ? 12 : 11}
        md={!isClearSearch ? 12 : 11}
        sm={!isClearSearch ? 12 : 11}
        xs={24}
      >
        <Input name={[expandedRowKeys[0], "name"]} label="Sub Category Name" />
      </Col>

      <Col
        xxl={6}
        xl={6}
        lg={!isClearSearch ? 10 : 9}
        md={!isClearSearch ? 10 : 9}
        sm={!isClearSearch ? 10 : 9}
        xs={!isClearSearch ? 20 : 16}
      >
        <Select
          name={[expandedRowKeys[0], "isActive"]}
          label="Active Status"
          array={activeStatus}
          value={"value"}
          description={"description"}
        />
      </Col>

      <Col xxl={1} xl={1} lg={2} md={2} sm={2} xs={4}>
        <SearchButton
          style={{ color: "#10BC83", width: "100%" }}
          onClick={handleSearch}
          isSearch={true}
        />
      </Col>
      {isClearSearch && (
        <Col span={1} xl={1} lg={2} md={2} sm={2} xs={4}>
          <SearchButton
            style={{ color: "#10BC83", width: "100%" }}
            onClick={handleClearSearch}
          />
        </Col>
      )}
    </Row>
  );
};

export default SubListTop;
