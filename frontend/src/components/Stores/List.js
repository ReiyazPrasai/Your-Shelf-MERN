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
    console.log(e);
    if (e !== undefined && e !== record[field] && e !== "") {
      props
        .editStore(
          {
            name: record.name,
            contactNumber: record.contactNumber,
            city: record.city,
            address: record.address,
            isActive: record.isActive,
            [field]: e,
          },
          record._id
        )
        .then(() => {
          props.fetchStoreList();
        });
    }
    form.resetFields();
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

    props.fetchStoreList(query);
  };

  const columns = [
    {
      title: "Store Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name - b.name,
      sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
      editable: true,
      editComponent: (text, record, toggleEdit) => (
        <Input
          name={["store", record._id, "name"]}
          formstyle={{ margin: 0 }}
          hideLabel
          autoFocus
          onBlur={(e) => {
            toggleEdit();
            form.resetFields(["store", record._id, "name"]);
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
      title: "Contact Number",
      dataIndex: "contactNumber",
      key: "contactNumber",
      sorter: (a, b) => a.name - b.name,
      sortOrder: sortedInfo.columnKey === "contactNumber" && sortedInfo.order,
      editable: true,
      editComponent: (text, record, toggleEdit) => (
        <Input
          name={["store", record._id, "contactNumber"]}
          formstyle={{ margin: 0 }}
          hideLabel
          autoFocus
          onBlur={(e) => {
            toggleEdit();
            form.resetFields(["store", record._id, "contactNumber"]);
          }}
          onPressEnter={(e) => {
            handleSubmit(e.target.value, record, "contactNumber");
            toggleEdit();
          }}
          initialValue={text}
        />
      ),
    },

    {
      title: "City",
      dataIndex: "city",
      key: "city",
      sorter: (a, b) => a.name - b.name,
      sortOrder: sortedInfo.columnKey === "city" && sortedInfo.order,
      editable: true,
      editComponent: (text, record, toggleEdit) => (
        <Input
          name={["store", record._id, "city"]}
          formstyle={{ margin: 0 }}
          hideLabel
          autoFocus
          onBlur={(e) => {
            toggleEdit();
            form.resetFields(["store", record._id, "city"]);
          }}
          onPressEnter={(e) => {
            handleSubmit(e.target.value, record, "city");
            toggleEdit();
          }}
          initialValue={text}
        />
      ),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      sorter: (a, b) => a.name - b.name,
      sortOrder: sortedInfo.columnKey === "address" && sortedInfo.order,
      editable: true,
      editComponent: (text, record, toggleEdit) => (
        <Input
          name={["store", record._id, "address"]}
          formstyle={{ margin: 0 }}
          hideLabel
          autoFocus
          onBlur={(e) => {
            toggleEdit();
            form.resetFields(["store", record._id, "address"]);
          }}
          onPressEnter={(e) => {
            handleSubmit(e.target.value, record, "address");
            toggleEdit();
          }}
          initialValue={text}
        />
      ),
    },
    {
      title: "Approval Status",
      dataIndex: "isApproved",
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
      key: "isActive",
      sorter: (a, b) => a.isActive - b.isActive,
      sortOrder: sortedInfo.columnKey === "isActive" && sortedInfo.order,
      editable: "always",
      editComponent: (text, record) => {
        return (
          <Switch
            formstyle={{ margin: 0 }}
            hideLabel
            name={["store", record._id, "isActive"]}
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
    if (!props.storeLoading) {
      setDatasource(
        props.stores?.map((store) => ({ ...store, key: store._id }))
      );
    }
  }, [props.stores, props.storeLoading]);

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
            loading={props.storeLoading}
            columns={getColumns(columns)}
            bordered
            pagination={
              datasource?.length > 5
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
