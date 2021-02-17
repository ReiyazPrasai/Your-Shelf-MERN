import { Col, Row } from "antd";
import React from "react";
import { getQuery } from "../../utils/commonUtils";
import { Button, Input, Select } from "../Common/Elements";

const SubListTop = (props) => {
  const {
    setData,
    expandedRowKeys,
    setListQuery,
    listQuery,
    fetchSubCategoryList,
  } = props;
  

  const activeStatus = [
    { value: true, description: "Yes" },
    { value: false, description: "No" },
    { value: "all", description: "Both" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = props.form.getFieldsValue()[expandedRowKeys[0]];

    setListQuery(getQuery(formData, listQuery));
    fetchSubCategoryList(
      expandedRowKeys[0],
      getQuery(formData, listQuery)
    ).then((res) => {
      setData(res);
    });
  };

  return (
    <Row gutter={8}>
      <Col xxl={6} xl={6} lg={6} md={5} sm={12} xs={24}>
        <Input name={[expandedRowKeys[0], "name"]} label="Sub Category Name" />
      </Col>

      <Col xxl={6} xl={6} lg={6} md={5} sm={12} xs={24}>
        <Select
          name={[expandedRowKeys[0], "isActive"]}
          label="Active Status"
          array={activeStatus}
          value={"value"}
          description={"description"}
        />
      </Col>

      <Col xxl={4} xl={4} lg={4} md={4} sm={6} xs={12}>
        <Button
          style={{ color: "#10BC83", width: "100%" }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Col>
      {listQuery.find((item) => item.action === "search") && (
        <Col xxl={4} xl={4} lg={4} md={4} sm={6} xs={12}>
          <Button
            style={{ color: "#10BC83", width: "100%" }}
            onClick={() => {
              props.form.resetFields();
              setListQuery(listQuery.filter((item) => item.action === "sort"));
              fetchSubCategoryList(expandedRowKeys[0]).then((res) => {
                setData(res);
              });
            }}
          >
            Clear Search
          </Button>
        </Col>
      )}
    </Row>
  );
};

export default SubListTop;
