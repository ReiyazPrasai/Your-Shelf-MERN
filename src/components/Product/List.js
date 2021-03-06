import { Form, Table } from "antd";
import React, { useEffect, useState } from "react";

import { Card, CartButton, Input, Switch } from "../Common/Elements";
import { components, getColumns } from "../Common/EditableCell.js";
import ListTop from "./ListTop";
import history from "../../utils/historyUtil";

const List = (props) => {
  const [form] = Form.useForm();
  const [datasource, setDatasource] = useState([]);
  const [sortedInfo, setSortedInfo] = useState({});
  const [listQuery, setListQuery] = useState([]);

  const handleSubmit = (e, record, field) => {

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
      title: "Product Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name - b.name,
      sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
      editable: true,
      editComponent: (text, record, toggleEdit) => (
        <Input
          name={["product", record._id, "name"]}
          formstyle={{ margin: 0 }}
          hideLabel
          autoFocus
          onBlur={(e) => {
            toggleEdit();
            form.resetFields(["product", record._id, "name"]);
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
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      sorter: (a, b) => a.brand - b.brand,
      sortOrder: sortedInfo.columnKey === "brand" && sortedInfo.order,
      render: (text, record) => {
        return <div>{props.brands?.find(({ _id }) => _id === text)?.name}</div>;
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      sorter: (a, b) => a.description - b.description,
      sortOrder: sortedInfo.columnKey === "description" && sortedInfo.order,
      editable: true,
      editComponent: (text, record, toggleEdit) => (
        <Input
          name={["product", record._id, "description"]}
          formstyle={{ margin: 0 }}
          hideLabel
          autoFocus
          onBlur={(e) => {
            toggleEdit();
            form.resetFields(["product", record._id, "description"]);
          }}
          onPressEnter={(e) => {
            handleSubmit(e.target.value, record, "description");
            toggleEdit();
          }}
          initialValue={text}
        />
      ),
    },

    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      sorter: (a, b) => a.category - b.category,
      sortOrder: sortedInfo.columnKey === "category" && sortedInfo.order,
      render: (text, record) => {
        return <div>{props.categories?.find(({ _id }) => _id === text)?.name}</div>;
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
            name={["product", record._id, "isActive"]}
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
            <CartButton
              onClick={() => {
              history.push(`/products/view/${record._id}`)
              }}
            />
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    if (!props.productLoading) {
      setDatasource(
        props.products?.map((product) => ({
          ...product.description,
          isActive: product.isActive,
          _id: product._id,
          key: product._id,
        }))
      );
    }
  }, [props.products, props.productLoading]);

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
            loading={props.productLoading}
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
