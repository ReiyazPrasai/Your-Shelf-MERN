import React, { useState } from "react";
import { Col, Row } from "antd";

import { listSearch } from "../../utils/commonUtils";
import { Input, SearchButton, Select } from "../Common/Elements";

const AttributeValueListTop = (props) => {
  const [isSearched, setIsSearched] = useState(false);

  const activeStatus = [
    { value: true, description: "Yes" },
    { value: false, description: "No" },
    { value: "all", description: "Both" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    let isFields = [];
    for (const key in props.form.getFieldsValue()) {
      if (key.includes("_") && props.form.getFieldsValue()[key] !== undefined) {
        isFields = [...isFields, true];
      }
    }
    if (isFields.includes(true)) {
      listSearch(props.form, props.attributeList, props.setDataSource);
      setIsSearched(true);
    }
  };

  const handleClearSearch = (e) => {
    e.preventDefault();
    props.form.resetFields();
    props.setDataSource(props.attributeList);
    setIsSearched(false);
  };

  return (
    <Row gutter={8}>
      <Col xxl={8} xl={8} lg={8} md={12} sm={12} xs={24}>
        <Input name={`${props.expandedRowKey}_name`} label="Attribute Value" />
      </Col>

      <Col
        xxl={4}
        xl={!isSearched ? 7 : 6}
        lg={!isSearched ? 7 : 6}
        md={12}
        sm={12}
        xs={24}
      >
        <Input
          name={`${props.expandedRowKey}_abbreviation`}
          label="Abbreviation"
        />
      </Col>
      <Col
        xxl={4}
        xl={!isSearched ? 7 : 6}
        lg={!isSearched ? 7 : 6}
        md={12}
        sm={12}
        xs={24}
      >
        <Select
          name={`${props.expandedRowKey}_isActive`}
          label="Active Status"
          array={activeStatus}
          value={"value"}
          description={"description"}
        />
      </Col>
      <Col
        xxl={2}
        xl={!isSearched ? 2 : 4}
        lg={!isSearched ? 2 : 4}
        md={4}
        sm={5}
        xs={24}
      >
        <Row gutter={8}>
          <Col span={!isSearched ? 24 : 12}>
            <SearchButton
              style={{ color: "#10BC83", width: "100%" }}
              onClick={handleSearch}
              isSearch
            >
              Search
            </SearchButton>
          </Col>
          {isSearched && (
            <Col span={isSearched ? 12 : 0}>
              <SearchButton
                style={{ color: "#10BC83", width: "100%" }}
                onClick={handleClearSearch}
              />
            </Col>
          )}
        </Row>
      </Col>
    </Row>
  );
};

export default AttributeValueListTop;
