import React, { useEffect, useState } from "react";
import { Table, Row, Col, Tabs } from "antd";
import { components, getColumns } from "../Common/EditableCell.js/index.js";

import { Input, Switch, Button } from "../Common/Elements";
import AttributeValueListTop from "./AttributeValueListTop";
import CategoryList from "./CategoryList";
import { isEmpty } from "../../utils/commonUtils.js";

const { TabPane } = Tabs;

const AttributeValueList = (props) => {
  const {
    setSubDataSource,
    subDataSource,
    expandedRowKeys,
    form,
    record,
  } = props;

  const [sortedInfo, setSortedInfo] = useState({});
  const [isAdd, setIsAdd] = useState(null);
  const [isCategoryAdd, setIsCategoryAdd] = useState(null);
  const [loading, setLoading] = useState(false);
  const [listQuery, setListQuery] = useState([]);
  const [dataSource, setDataSource] = useState([]);

  const data = subDataSource[record._id];

  const columns = [
    {
      title: "Value",
      dataIndex: "name",
      key: "name",
      width: 250,
      sorter: (a, b) => a.name - b.name,
      sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
      isAdd: isAdd,
      editable: true,
      editComponent: (text, record, toggleEdit) => {
        return (
          <Input
            name={["subCategory", record._id, "name"]}
            formstyle={{ margin: 0 }}
            hideLabel
            label={"Sub Category Name"}
            autoFocus
            onBlur={() => {
              toggleEdit();
              form.resetFields(["category", record._id, "name"]);
            }}
            onPressEnter={(e) => {
              if (record._id !== "new") {
                handelAttributeEdit(e.target.value, "name", record._id);
                toggleEdit();
              }
            }}
            required={record._id === "new"}
            initialValue={text}
          />
        );
      },
    },
    {
      title: "Abbreviation",
      dataIndex: "abbreviation",
      key: "abbreviation",
      width: 250,
      isAdd: isAdd,
      sorter: (a, b) => a.abbreviation - b.abbreviation,
      sortOrder: sortedInfo.columnKey === "abbreviation" && sortedInfo.order,
      editable: true,
      editComponent: (text, record, toggleEdit) => {
        return (
          <Input
            name={["attributeValues", record._id, "abbreviation"]}
            formstyle={{ margin: 0 }}
            hideLabel
            label={"Sub Category Name"}
            onBlur={toggleEdit}
            onPressEnter={(e) => {
              if (record._id !== "new") {
                handelAttributeEdit(e.target.value, "abbreviation", record._id);
                toggleEdit();
              }
            }}
            autoFocus
            required={record._id === "new"}
            initialValue={text}
          />
        );
      },
    },
    {
      title: "Active Status",
      dataIndex: "isActive",
      key: "isActive",
      width: 250,
      sorter: (a, b) => a.isActive - b.isActive,
      sortOrder: sortedInfo.columnKey === "isActive" && sortedInfo.order,
      editable: "always",
      editComponent: (text, record, toggleEdit) => {
        return (
          <Switch
            formstyle={{ margin: 0 }}
            hideLabel
            name={["attributeValues", record._id, "isActive"]}
            onChange={(e) => {
              if (record._id !== "new") {
                handelAttributeEdit(e, "isActive", record._id);
              }
            }}
            disabled={isAdd === "new" && record._id !== "new"}
            initialValue={text}
          />
        );
      },
    },
  ];

  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
    let tempDataSource = [];
    let tempAttributes = [];
    switch (sorter.order) {
      case "ascend":
        tempDataSource = dataSource.sort((a, b) =>
          a[sorter.field] > b[sorter.field] ? 1 : -1
        );
        tempAttributes = data.sort((a, b) =>
          a[sorter.field] > b[sorter.field] ? 1 : -1
        );

        setDataSource(tempDataSource);
        props.setSubDataSource({
          ...subDataSource,
          [expandedRowKeys[0]]: tempAttributes,
        });
        break;
      case "descend":
        tempDataSource = dataSource.sort((a, b) =>
          a[sorter.field] < b[sorter.field] ? 1 : -1
        );
        tempAttributes = data.sort((a, b) =>
          a[sorter.field] < b[sorter.field] ? 1 : -1
        );

        setDataSource(tempDataSource);
        props.setSubDataSource({
          ...subDataSource,
          [expandedRowKeys[0]]: tempAttributes,
        });
        break;
      default:
        tempDataSource = dataSource.sort((a, b) =>
          a.createdAt > b.createdAt ? 1 : -1
        );
        tempAttributes = data.sort((a, b) =>
          a.createdAt > b.createdAt ? 1 : -1
        );

        setDataSource(tempDataSource);
        props.setSubDataSource({
          ...subDataSource,
          [expandedRowKeys[0]]: tempAttributes,
        });
        break;
    }
  };

  const edit = (attribute, attributeValues) => {
    setLoading(true);
    props.editAttribute(attribute, expandedRowKeys[0]).then(() => {
      props.fetchAttributeList().then((res) => {
        setLoading(false);
      });
      setSubDataSource({
        ...subDataSource,
        [expandedRowKeys[0]]: attributeValues
          .map((item) => ({
            ...item,
            key: item._id,
          }))
          .sort(),
      });
    });
    setIsAdd(null);
  };

  const handelAttributeEdit = (value, field, id) => {
    const attributeValues = subDataSource[record._id].map((item) => {
      const row = item;
      delete row.key;
      delete row.isApproved;
      if (row._id === id) {
        return { ...row, [field]: value };
      }
      return row;
    });

    const attribute = {
      ...record,
      attributeValues: attributeValues,
    };
    delete attribute.isApproved;
    delete attribute._id;
    delete attribute.createdAt;
    delete attribute.__v;
    delete attribute.key;

    edit(attribute, attributeValues);
  };

  const handAddAttributeValues = (value, field, id) => {
    form.validateFields().then((values) => {
      const attributeValues = subDataSource[record._id].map((item) => {
        const row = item;
        delete row.key;
        delete row.isApproved;

        return row;
      });
      const mongoObjectId = function () {
        let timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
        return (
          timestamp +
          "xxxxxxxxxxxxxxxx"
            .replace(/[x]/g, function () {
              return ((Math.random() * 16) | 0).toString(16);
            })
            .toLowerCase()
        );
      };

      const attribute = {
        ...record,
        attributeValues: [
          ...attributeValues,
          { _id: mongoObjectId(), ...values.attributeValues.new },
        ],
      };
      ["isApproved", "_id", "createdAt", "__v", "key"].forEach((key) => {
        delete attribute[key];
      });
      edit(attribute, attribute.attributeValues);
    });
  };

  useEffect(() => {
    setDataSource(data);
  }, [data]);

  return (
    <Tabs
      tabPosition={"left"}
      onChange={(e) => {
        setIsAdd(null);
        setIsCategoryAdd(null);
      }}
    >
      <TabPane tab="Attribute Values" key="1">
        <div style={{ maxWidth: 1000, minWidth: 500, margin: "auto" }}>
          {subDataSource[record._id]?.[0]?._id !== "new" && (
            <AttributeValueListTop
              setDataSource={setDataSource}
              setListQuery={setListQuery}
              listQuery={listQuery}
              attributeList={data}
              form={form}
              expandedRowKey={expandedRowKeys[0]}
              {...props}
            />
          )}
          {subDataSource[record._id]?.[0]?._id !== "new" && <br />}
          <Table
            onChange={handleChange}
            columns={getColumns(columns)}
            loading={isEmpty(data) || loading}
            dataSource={dataSource}
            pagination={
              !subDataSource[record._id]
                ? { defaultPageSize: 5 }
                : subDataSource[record._id]?.length > 5
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
                    position: ["bottomRight"],
                  }
                : false
            }
            components={components}
            scroll={{ x: 500 }}
            bordered
            summary={() => {
              return (
                <Table.Summary.Row>
                  <Table.Summary.Cell colSpan={3}>
                    {isAdd === "new" && (
                      <Row gutter={16}>
                        <Col style={{ paddingRight: 20 }} span={8}>
                          <Input
                            name={["attributeValues", "new", "name"]}
                            formstyle={{ margin: 0 }}
                            hideLabel
                            label={"Sub Category Name"}
                            autoFocus
                            required
                          />
                        </Col>
                        <Col style={{ padding: "0 12px" }} span={8}>
                          <Input
                            name={["attributeValues", "new", "abbreviation"]}
                            formstyle={{ margin: 0 }}
                            hideLabel
                            label={"Sub Category Name"}
                            required={record._id === "new"}
                          />
                        </Col>
                        <Col style={{ paddingLeft: 20 }} span={8}>
                          <Switch
                            formstyle={{ margin: 0 }}
                            hideLabel
                            name={["attributeValues", "new", "isActive"]}
                            initialValue={true}
                          />
                        </Col>
                      </Row>
                    )}
                    <Row style={{ paddingRight: "50px" }} gutter={8}>
                      <Col span={4}>
                        {isAdd !== "new" ? (
                          <Button
                            style={{
                              background: "#10BC83",
                              color: "white",
                            }}
                            onClick={() => {
                              setIsAdd("new");
                            }}
                          >
                            + Add Attribute Values
                          </Button>
                        ) : (
                          <Button
                            style={{
                              width: "100%",
                              background: "#10BC83",
                              color: "white",
                            }}
                            onClick={handAddAttributeValues}
                          >
                            Save
                          </Button>
                        )}
                      </Col>
                      {isAdd === "new" && (
                        <Col span={4}>
                          <Button
                            style={{
                              width: "100%",
                              background: "#D6D6D8",
                              color: "black",
                            }}
                            onClick={() => {
                              setIsAdd(null);
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
        </div>
      </TabPane>
      <TabPane tab="Categories" key="2">
        <CategoryList
          categories={props.categoryDataSource}
          setCategories={props.setCategoryDataSource}
          fetchCategoryList={props.fetchCategoryList}
          expandedRowKey={expandedRowKeys[0]}
          setExpandedRowKeys={props.setExpandedRowKeys}
          initialCategories={props.initialCategories}
          attributes={props.attributes}
          editAttributes={props.editAttributes}
          isCategoryAdd={isCategoryAdd}
          setIsCategoryAdd={setIsCategoryAdd}
          subDataSource={subDataSource}
          setSubDataSource={setSubDataSource}
          editAttribute={props.editAttribute}
          fetchAttributeList={props.fetchAttributeList}
          form={form}
        />
      </TabPane>
    </Tabs>
  );
};

export default AttributeValueList;
