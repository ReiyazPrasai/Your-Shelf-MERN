import { Form, Table } from "antd";
import React, { useEffect, useState } from "react";

import {
  Card,
  DeleteButton,
  EditButton,
  Input,
  Switch,
} from "../Common/Elements";
import { components, getColumns } from "../Common/EditableCell.js";
import ListTop from "./ListTop";
import history from "../../utils/historyUtil";

const List = (props) => {
  const [form] = Form.useForm();
  const [datasource, setDatasource] = useState([]);
  const [sortedInfo, setSortedInfo] = useState({});
  const [listQuery, setListQuery] = useState([]);

  const handleSubmit = (e, record, field) => {
    if (e !== undefined && e !== record[field]) {
      props
        .editRole(
          {
            name: record.name,
            isActive: record.isActive,
            roles: record.roles,
            groupId: record.groupId,
            [field]: e,
          },
          record._id
        )
        .then(() => {
          props.fetchRoleList();
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

    props.fetchRoleList(query);
  };

  const columns = [
    {
      title: "Role Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name - b.name,
      sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
      editable: true,
      editComponent: (text, record, toggleEdit) => (
        <Input
          name={["Role", record._id, "name"]}
          formstyle={{ margin: 0 }}
          hideLabel
          autoFocus
          onBlur={(e) => {
            toggleEdit();
            form.resetFields(["brand", record._id, "name"]);
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
      title: "Group Name",
      dataIndex: "groupId",
      key: "name",
      sorter: (a, b) => a.name - b.name,
      sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
      render: (text, record) => {
        return <div>{props.groups?.find(({ _id }) => _id === text)?.name}</div>;
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
      width: 120,
      render: (text, record) => {
        return (
          <div
            className="centralize"
            style={{ justifyContent: "space-around" }}
          >
            <EditButton
              onClick={() => {
                history.push(`/manage/roles/${record._id}/edit`);
              }}
            />
            <DeleteButton
              onClick={() => {
                props.deleteRole(record._id).then(() => {
                  props.fetchRoleList();
                });
              }}
            />
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    if (!props.rolesLoading) {
      setDatasource(
        props.roles?.map((brand) => ({ ...brand, key: brand._id }))
      );
    }
  }, [props.roles, props.rolesLoading]);

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
