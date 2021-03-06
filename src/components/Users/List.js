import { Form, Table } from "antd";
import React, { useEffect, useState } from "react";

import { Card, DeleteButton, Switch } from "../Common/Elements";
import { components, getColumns } from "../Common/EditableCell.js";
import ListTop from "./ListTop";
import {
  CloseCircleFilled,
  CheckCircleFilled,
} from "@ant-design/icons";

const List = (props) => {
  const [form] = Form.useForm();
  const [datasource, setDatasource] = useState([]);
  const [sortedInfo, setSortedInfo] = useState({});
  const [listQuery, setListQuery] = useState([]);

  const handleSubmit = (e, record, field) => {
    if (e !== undefined && e !== record[field]) {
      props
        .editUser(
          {
            name: record.name,
            isActive: record.isActive,
            users: record.users,
            groupId: record.groupId,
            [field]: e,
          },
          record._id
        )
        .then(() => {
          props.fetchUserList();
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

    props.fetchUserList(query);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name - b.name,
      sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
    },
    {
      title: "Email Address",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email - b.email,
      sortOrder: sortedInfo.columnKey === "email" && sortedInfo.order,
    },
    {
      title: "Group Name",
      dataIndex: "groupName",
      key: "groupName",
      sorter: (a, b) => a.groupName - b.groupName,
      sortOrder: sortedInfo.columnKey === "groupName" && sortedInfo.order,
    },
    {
      title: "Assigned Role",
      dataIndex: "roleId",
      key: "roleId",
      sorter: (a, b) => a.groupName - b.groupName,
      sortOrder: sortedInfo.columnKey === "groupName" && sortedInfo.order,
      render: (text, record) => {
        return <div>{props.roles?.find(({ _id }) => _id === text)?.name}</div>;
      },
    },
    {
      title: "Confirmed",
      dataIndex: "isConfirmed",
      key: "isConfirmed",
      sorter: (a, b) => a.isConfirmed - b.isConfirmed,
      sortOrder: sortedInfo.columnKey === "isConfirmed" && sortedInfo.order,
      render: (text, record) => {
        return  text ? (
          <b style={{ color: "#00ff00" }}>
            <CheckCircleFilled /> No
          </b>
        ) : (
          <b style={{ color: "orangered" }}>
            <CloseCircleFilled /> Yes
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
            name={["brand", record._id, "isActive"]}
            onChange={(e) => {
              handleSubmit(e, record, "isActive");
            }}
            initialValue={text}
          />
        );
      },
    },
    {
      title: "Action",
      width: 75,
      render: (text, record) => {
        return (
          <div className="centralize">
            <DeleteButton
              onClick={() => {
                props.deleteUser(record._id).then(() => {
                  props.fetchUserList();
                });
              }}
            />
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    if (!props.usersLoading) {
      setDatasource(
        props.users
          ?.map((brand) => ({ ...brand, key: brand._id }))
          .filter(({ roleId }) => roleId !== "owner")
      );
    }
  }, [props.users, props.usersLoading]);

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
            loading={props.groupLoading}
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
