import React, { useEffect, useState } from "react";
import {
  CloseCircleFilled,
  CheckCircleFilled,
  QuestionCircleFilled,
} from "@ant-design/icons";
import { Col, Form, Row, Table } from "antd";

import { Button, Card, Select } from "../Common/Elements";
import CategoryListTop from "./CategoryListTop";
import { isEmpty } from "../../utils/commonUtils";
import history from "../../utils/historyUtil";

const List = (props) => {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);
  const [sortedInfo, setSortedInfo] = useState({});
  const [listQuery, setListQuery] = useState([]);
  const [loading, setLoading] = useState(false);

  const thisAttribute = props.attributes.find(
    ({ _id }) => _id === props.expandedRowKey
  );

  const columns = [
    {
      title: "Category Name",
      dataIndex: "name",
      width: "33%",
      key: "name",
      sorter: (a, b) => a.name - b.name,
      sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
      render: (text, record) => {
        return record?._id === "new" ? (
          <Select
            name={["categoryIdList", 0, "name"]}
            formstyle={{ margin: 0 }}
            array={props.initialCategories.filter((item) => {
              const categoryIdList = thisAttribute.categoryIdList?.map(
                ({ id }) => id
              );

              return !categoryIdList.includes(item?._id);
            })}
            description={"name"}
            value={"_id"}
            hideLabel
            label="category"
            autoFocus
            onBlur={(e) => {
              handleSubmit();
            }}
            initialValue={text}
          />
        ) : (
          <div>{text}</div>
        );
      },
    },
    {
      title: "Approval Status",
      dataIndex: "isApproved",
      width: "33%",
      key: "isApproved",
      sorter: (a, b) => a.isApproved - b.isApproved,
      sortOrder: sortedInfo.columnKey === "isApproved" && sortedInfo.order,
      render: (text, record) => {
        return record?._id !== "new" ? (
          text === undefined ? (
            <b style={{ color: "grey" }}>
              <QuestionCircleFilled /> Pending
            </b>
          ) : text ? (
            <b style={{ color: "#00ff00" }}>
              <CheckCircleFilled /> Approved
            </b>
          ) : (
            <b style={{ color: "orangered" }}>
              <CloseCircleFilled /> Disapproved
            </b>
          )
        ) : null;
      },
    },
    {
      title: "Active Status",
      dataIndex: "isActive",
      width: "33%",
      key: "isActive",
      sorter: (a, b) => a.isActive - b.isActive,
      sortOrder: sortedInfo.columnKey === "isActive" && sortedInfo.order,
      render: (text, record) => {
        return record?._id !== "new" ? (
          text ? (
            <b style={{ color: "#00ff00" }}>
              <CheckCircleFilled /> Yes
            </b>
          ) : (
            <b style={{ color: "orangered" }}>
              <CloseCircleFilled /> No
            </b>
          )
        ) : null;
      },
    },
  ];

  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
    let tempDataSource = [];
    let tempCategories = [];
    switch (sorter.order) {
      case "ascend":
        tempDataSource = dataSource.sort((a, b) =>
          a[sorter.field] > b[sorter.field] ? 1 : -1
        );
        tempCategories = props.categories.sort((a, b) =>
          a[sorter.field] > b[sorter.field] ? 1 : -1
        );
        setDataSource(tempDataSource);
        props.setCategories(tempCategories);
        break;
      case "descend":
        tempDataSource = dataSource.sort((a, b) =>
          a[sorter.field] < b[sorter.field] ? 1 : -1
        );
        tempCategories = props.categories.sort((a, b) =>
          a[sorter.field] < b[sorter.field] ? 1 : -1
        );

        setDataSource(tempDataSource);
        props.setCategories(tempCategories);
        break;
      default:
        tempDataSource = dataSource.sort((a, b) =>
          a.createdAt > b.createdAt ? 1 : -1
        );
        tempCategories = props.categories.sort((a, b) =>
          a.createdAt > b.createdAt ? 1 : -1
        );

        setDataSource(tempDataSource);
        props.setCategories(tempCategories);
        break;
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    const categoryIdList = [
      ...thisAttribute.categoryIdList,
      { id: props.form.getFieldsValue().categoryId },
    ];
    const attribute = {
      ...thisAttribute,
      categoryIdList: categoryIdList,
    };
    ["isApproved", "_id", "createdAt", "__v", "key"].forEach((key) => {
      delete attribute[key];
    });

    let newCategoryList = [];
    categoryIdList.forEach((categoryId) => {
      let category = [...props.initialCategories].find(
        ({ _id }) => _id === categoryId.id
      );

      newCategoryList = [...newCategoryList, category];
    });
    setDataSource(newCategoryList);
    props.editAttribute(attribute, props.expandedRowKey).then(() => {
      props.fetchAttributeList().then(() => {
        setLoading(false);
      });
    });
    props.setIsCategoryAdd(null);
    props.form.resetFields();
  };

  useEffect(() => {
    if (!props.categoriesLoading) {
      const temp = props.categories?.map((category) => ({
        ...category,
        key: category?._id,
      }));
      setDataSource(temp);
    }
  }, [props.categories, props.categoriesLoading]);

  return (
    <div style={{ maxWidth: 1000, minWidth: 500, margin:'auto' }}>
      {!isEmpty(props.categories) && (
        <div style={{ padding: 2, marginBottom: 20 }}>
          <CategoryListTop
            form={form}
            {...props}
            setDataSource={setDataSource}
            setListQuery={setListQuery}
            listQuery={listQuery}
          />
        </div>
      )}

      <div>
        <Card black>
          <Table
            onChange={handleChange}
            dataSource={dataSource}
            scroll={{ x: 500 }}
            loading={props.categoriesLoading || loading}
            columns={columns}
            pagination={
              props.categoriesLoading
                ? { defaultPageSize: 5 }
                : dataSource.length > 5
                ? {
                    showTotal: (total, range) => (
                      <b style={{ color: "white" }}>
                        {" "}
                        {`Showing ${range[0]} - ${range[1]} of ${total}`}
                      </b>
                    ),
                    showSizeChanger: true,
                    pageSizeOptions: ["5", "10", "15", "20"],
                    defaultPageSize: 5,
                    position: ["topRight", "bottomRight"],
                  }
                : false
            }
            bordered
            onRow={(record, rowIndex) => {
              return {
                onClick: (e) => {
                  const searchQuery = [
                    {
                      action: "search",
                      searchBy: { _id: record?._id },
                    },
                  ];
                  if (record?._id !== "new") {
                    props.fetchCategoryList(searchQuery);
                    history.push({
                      pathname: "./categories",
                      state: { categoryId: record?._id },
                    });
                  }
                },
              };
            }}
            summary={() => {
              return (
                <Table.Summary.Row>
                  <Table.Summary.Cell colSpan={3}>
                    {props.isCategoryAdd === "new" && (
                      <Row gutter={16}>
                        <Col span={8}>
                          <Select
                            name={"categoryId"}
                            formstyle={{ margin: 0 }}
                            array={props.initialCategories.filter((item) => {
                              const categoryIdList = thisAttribute.categoryIdList?.map(
                                ({ id }) => id
                              );

                              return !categoryIdList.includes(item?._id);
                            })}
                            description={"name"}
                            value={"_id"}
                            hideLabel
                            label="category"
                            autoFocus
                          />
                        </Col>
                      </Row>
                    )}
                    <Row style={{ paddingRight: "18px" }} gutter={8}>
                      <Col span={4}>
                        {props.isCategoryAdd !== "new" ? (
                          <Button
                            style={{
                              background: "#10BC83",
                              color: "white",
                            }}
                            onClick={() => {
                              props.setIsCategoryAdd("new");
                            }}
                          >
                            + Add Category
                          </Button>
                        ) : (
                          <Button
                            style={{
                              width: "100%",
                              background: "#10BC83",
                              color: "white",
                            }}
                            onClick={handleSubmit}
                          >
                            Save
                          </Button>
                        )}
                      </Col>

                      {props.isCategoryAdd === "new" && (
                        <Col span={4}>
                          <Button
                            style={{
                              width: "100%",
                              background: "#D6D6D8",
                              color: "black",
                            }}
                            onClick={() => {
                              props.setIsCategoryAdd(null);
                              props.form.resetFields();
                            }}
                          >
                            Cancel
                          </Button>
                        </Col>
                      )}
                    </Row>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              );
            }}
          />
        </Card>
      </div>
    </div>
  );
};

export default List;
