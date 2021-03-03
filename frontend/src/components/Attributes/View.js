import React, { useContext, useState, useEffect, useRef } from "react";
import { Table, Button, Popconfirm, Form } from "antd";
import {  components } from "../Common/EditableCell.js";
import { Input } from "../Common/Elements/index.js";

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "name",
        dataIndex: "name",
        width: "30%",
        editable: true,
        editComponent: (record, toggleEdit) => {
          return (
            <Input
              autoFocus
              name={["name"]}
              hideLabel
              onBlur={toggleEdit}
              formstyle={{ margin: 0 }}
            />
          );
        },
      },
      {
        title: "age",
        dataIndex: "age",
      },
      {
        title: "address",
        dataIndex: "address",
      },
      {
        title: "operation",
        dataIndex: "operation",
        render: (_, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => this.handleDelete(record.key)}
            >
              <a>Delete</a>
            </Popconfirm>
          ) : null,
      },
    ];
    this.state = {
      dataSource: [
        {
          key: "0",
          name: "Edward King 0",
          age: "32",
          address: "London, Park Lane no. 0",
        },
        {
          key: "1",
          name: "Edward King 1",
          age: "32",
          address: "London, Park Lane no. 1",
        },
      ],
      count: 2,
    };
  }



  render() {
    const { dataSource } = this.state;

    const columns = this.columns?.map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          editComponent: col.editComponent,
        }),
      };
    });
    return (
      <div>
        <Button
          onClick={this.handleAdd}
          type="primary"
          style={{
            marginBottom: 16,
          }}
        >
          Add a row
        </Button>
        <Table
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    );
  }
}

export default EditableTable;
