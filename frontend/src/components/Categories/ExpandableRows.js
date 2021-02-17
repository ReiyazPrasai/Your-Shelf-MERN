import React, { useState } from "react";
import { Table, Row, Col } from "antd";

import { Input, Switch, Button } from "../Common/Elements";
import SubListTop from "./SubListTop";
import { components, getColumns } from "../Common/EditableCell.js";

const ExpandedRowRender = (props) => {
  const [sortedInfo, setSortedInfo] = useState({});
  const [listQuery, setListQuery] = useState([]);

  const [loading, setLoading] = useState(false);

  const {
    setSubDataSource,
    subDataSource,
    expandedRowKeys,
    setIsEdit,
    form,
    isEdit,
    record,
  } = props;

  const columns = [
    {
      title: "Sub Category Name",
      dataIndex: "name",
      width: "33%",
      key: "name",
      sorter: (a, b) => a.name - b.name,
      isAdd: isEdit,
      sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
      editable: true,
      editComponent: (text, record, toggleEdit) => (
        <Input
          name={["subCategory", record._id, "name"]}
          formstyle={{ margin: 0 }}
          hideLabel
          label={"Sub Category Name"}
          autoFocus
          onBlur={(e) => {
            if (record._id !== "new") {
              toggleEdit();
              form.resetFields(["subCategory", record._id, "name"])
            }
          }}
          onPressEnter={(e) => {
            if (record._id !== "new") {
              handleSubCategorySubmit(e.target.value, record, "name");
              toggleEdit();
            }
          }}
          required={record._id === "new"}
          initialValue={text}
        />
      ),
    },
    {
      title: "Active Status",
      dataIndex: "isActive",
      width: "33%",
      key: "isActive",
      sorter: (a, b) => a.isActive - b.isActive,
      sortOrder: sortedInfo.columnKey === "isActive" && sortedInfo.order,
      editable: "always",
      editComponent: (text, record) => {
        return (
          <Switch
            formstyle={{ margin: 0 }}
            hideLabel
            name={["subCategory", record._id, "isActive"]}
            onChange={(e) => {
              if (record._id !== "new") {
                handleSubCategorySubmit(e, record, "isActive");
              }
            }}
            disabled={isEdit === "new" && record._id !== "new"}
            initialValue={text}
          />
        );
      },
    },
  ];

  const setData = (res) => {
    setSubDataSource({
      ...subDataSource,
      [expandedRowKeys[0]]: res.data?.map((subCategory) => ({
        ...subCategory,
        key: subCategory._id,
      })),
    });
  };

  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
    const query = sorter.order
      ? [
          {
            action: "sort",
            parameter: sorter.field,
            value: sorter.order === "descend" ? -1 : 1,
          },
          ...listQuery.filter((item) => item.action !== "sort"),
        ]
      : [...listQuery.filter((item) => item.action !== "sort")];
    setListQuery(query);

    props.fetchSubCategoryList(expandedRowKeys[0], query).then((res) => {
      setData(res);
    });
  };

  const handleSubCategorySubmit = (e, record, field) => {
    setLoading(true);
    if (e !== undefined && e !== record[field]) {
      setSubDataSource({ ...subDataSource, [expandedRowKeys[0]]: null });
      props
        .editSubCategory(
          {
            name: record.name,
            isActive: record.isActive,
            [field]: e,
            categoryId: expandedRowKeys[0],
          },
          record._id
        )
        .then(() => {
          props.fetchSubCategoryList(expandedRowKeys[0]).then((res) => {
            setData(res);
            setLoading(false);
          });
        });
    }
    setIsEdit(null);
    form.resetFields()
  };

  const handleSubCategoryAdd = (e) => {
    setLoading(true);
    form.validateFields().then((values) => {
      const formData = {
        ...values.subCategory.new,
        categoryId: expandedRowKeys[0],
      };
      console.log("formData", formData);
      props.addNewSubCategory(formData).then(() => {
        setIsEdit(null);
        props.fetchSubCategoryList(expandedRowKeys[0]).then((res) => {
          setData(res);
          setLoading(false);
        });
      });
    });
  };

  return (
    <div style={{ maxWidth: 1000, minWidth: 500, margin:'auto' }}>
      {subDataSource[record._id]?.[0]?._id !== "new" && (
        <SubListTop
          setListQuery={setListQuery}
          listQuery={listQuery}
          setData={setData}
          {...props}
        />
      )}
      {subDataSource[record._id]?.[0]?._id !== "new" && <br />}
      <Table
        components={components}
        onChange={handleChange}
        columns={getColumns(columns)}
        loading={!subDataSource[record._id] || loading}
        dataSource={subDataSource[record._id]}
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
                pageSizeOptions: [5, 10, 15, 20],
                defaultPageSize: 5,
                position: ["bottomRight"],
              }
            : false
        }
        bordered
        summary={() => {
          return (
            <Table.Summary.Row>
              <Table.Summary.Cell colSpan={2}>
                {isEdit === "new" && (
                  <Row>
                    <Col style={{ padding: "0 16px" }} span={12}>
                      <Input
                        name={["subCategory", "new", "name"]}
                        formstyle={{ margin: 0 }}
                        hideLabel
                        label={"Sub Category Name"}
                        autoFocus
                        required={record._id === "new"}
                        initialValue={undefined}
                      />
                    </Col>
                    <Col style={{ padding: "0 18px" }} span={12}>
                      <Switch
                        formstyle={{ margin: 0 }}
                        hideLabel
                        name={["subCategory", "new", "isActive"]}
                        initialValue={true}
                      />
                    </Col>
                  </Row>
                )}
                <Row style={{ padding: "0 16px" }} gutter={16}>
                  <Col span={4}>
                    {" "}
                    {isEdit !== "new" ? (
                      <Button
                        style={{
                          background: "#10BC83",
                          color: "white",
                        }}
                        onClick={() => {
                          setIsEdit("new");
                        }}
                      >
                        + Add Sub Category
                      </Button>
                    ) : (
                      <Button
                        style={{
                          width: "100%",
                          background: "#10BC83",
                          color: "white",
                        }}
                        onClick={handleSubCategoryAdd}
                      >
                        Save
                      </Button>
                    )}
                  </Col>
                  {isEdit === "new" && (
                    <Col span={4}>
                      {" "}
                      <Button
                        style={{
                          width: "100%",
                          background: "#D6D6D8",
                          color: "black",
                        }}
                        onClick={() => {
                          setIsEdit(null);
                          setSubDataSource({
                            ...subDataSource,
                            [expandedRowKeys[0]]: subDataSource[
                              expandedRowKeys[0]
                            ].filter(({ _id }) => _id !== "new"),
                          });
                          form.resetFields();
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
  );
};

export default ExpandedRowRender;
