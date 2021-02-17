import { Form, Table } from "antd";
import React, { useEffect, useState } from "react";
import {
  CloseCircleFilled,
  CheckCircleFilled,
  QuestionCircleFilled,
} from "@ant-design/icons";

import { Card, Input, Switch } from "../Common/Elements";
import { components, getColumns } from "../Common/EditableCell.js";
import ListTop from "./ListTop";

const List = (props) => {
  const [form] = Form.useForm();
  const [datasource, setDatasource] = useState([]);
  const [sortedInfo, setSortedInfo] = useState({});
  const [listQuery, setListQuery] = useState([]);

  const handleSubmit = (e, record, field) => {
    if (e !== undefined && e !== record[field]) {
      props
        .editBrand(
          { name: record.name, isActive: record.isActive, [field]: e },
          record._id
        )
        .then(() => {
          props.fetchBrandList();
        });
    }
    form.resetFields()
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

    props.fetchBrandList(query);
  };

  const columns = [
    {
      title: "Brand Name",
      dataIndex: "name",
      width: "33%",
      key: "name",
      sorter: (a, b) => a.name - b.name,
      sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
      editable: true,
      editComponent: (text, record, toggleEdit) => (
        <Input
          name={["brand", record._id, "name"]}
          formstyle={{ margin: 0 }}
          hideLabel
          autoFocus
          onBlur={(e) => {
            toggleEdit();
            form.resetFields(["brand", record._id, "name"])
          }}
          onPressEnter={(e) => {
            handleSubmit(e.target.value, record, "name");
            toggleEdit();
          }}
          initialValue={text}
        />
      ),
    },
    {
      title: "Approval Status",
      dataIndex: "isApproved",
      width: "33%",
      key: "isApproved",
      sorter: (a, b) => a.isApproved - b.isApproved,
      sortOrder: sortedInfo.columnKey === "isApproved" && sortedInfo.order,
      render: (text, record) => {
        return text === undefined ? (
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
        );
      },
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
            name={["brand", record._id, "isActive"]}
            onChange={(e) => {
              handleSubmit(e, record, "isActive");
            }}
            initialValue={text}
          />
        );
      },
    },
  ];

  useEffect(() => {
    if (!props.brandLoading) {
      setDatasource(
        props.brands?.map((brand) => ({ ...brand, key: brand._id }))
      );
    }
  }, [props.brands, props.brandLoading]);

  return (
    <Form form={form} layout="vertical">
      <div style={{ padding: 2, marginBottom: 20 }}>
        <Card black style={{ padding: "5px 10px" }}>
          <ListTop
            form={form}
            {...props}
            setListQuery={setListQuery}
            listQuery={listQuery}
          />
        </Card>
      </div>

      <div>
        <Card black style={{ padding: 2 }}>
          <Table
            components={components}
            onChange={handleChange}
            dataSource={datasource}
            scroll={{ x: 500 }}
            loading={props.brandLoading}
            columns={getColumns(columns)}
            bordered
            pagination={
              datasource.length > 5
                ? {
                    showTotal: (total, range) => (
                      <b style={{ color: "white" }}>
                        {" "}
                        {`Showing ${range[0]} - ${range[1]} of ${total}`}
                      </b>
                    ),
                    showSizeChanger: true,
                    pageSizeOptions: ["5", "10", "15", "20"],
                    defaultPageSize: 10,
                    position: ["topRight", "bottomRight"],
                  }
                : false
            }
          />
        </Card>
      </div>
    </Form>
  );
};

export default List;
