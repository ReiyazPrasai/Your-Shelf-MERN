import React, { useEffect, useState } from "react";
import {
  CloseCircleFilled,
  CheckCircleFilled,
  QuestionCircleFilled,
  PlusSquareTwoTone,
  MinusSquareTwoTone,
} from "@ant-design/icons";
import { Form, Table } from "antd";

import { Card, Input, Switch } from "../Common/Elements";
import ListTop from "./ListTop";
import AttributeValueList from "./AttributeValueListTop";
import { components, getColumns } from "../Common/EditableCell.js";

const List = (props) => {
  const [form] = Form.useForm();
  const [datasource, setDatasource] = useState([]);
  const [subDataSource, setSubDataSource] = useState([]);
  const [isEdit, setIsEdit] = useState(null);
  const [sortedInfo, setSortedInfo] = useState({});
  const [listQuery, setListQuery] = useState([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [categoryDataSource, setCategorDataSource] = useState([]);
  const [initialCategories, setinitialCategories] = useState([]);

  const columns = [
    {
      title: "Attribute Name",
      dataIndex: "name",
      width: "33%",
      key: "name",
      sorter: (a, b) => a.name - b.name,
      sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
      editable: true,
      editComponent: (text, record, toggleEdit) => (
        <Input
          name={["attributes", record._id, "name"]}
          formstyle={{ margin: 0 }}
          hideLabel
          autoFocus
          onBlur={(e) => {            
            toggleEdit();
            form.resetFields(["attributes", record._id, "name"])
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
      render: (text, record) => {
        return (
          <Switch
            formstyle={{ margin: 0 }}
            hideLabel
            name={["Attributes", record._id, "isActive"]}
            onChange={(e) => {
              handleSubmit(e, record, "isActive");
            }}
            initialValue={text}
          />
        );
      },
    },
  ];

  const CustomExpandIcon = (localProps) => {
    if (localProps.expanded) {
      return (
        <MinusSquareTwoTone
          onClick={(e) => {
            setExpandedRowKeys([]);
            return localProps.onExpand(localProps.record, e);
          }}
        />
      );
    } else {
      return (
        <PlusSquareTwoTone
          onClick={(e) => {
            setExpandedRowKeys([localProps.record._id]);
            setSubDataSource({
              ...subDataSource,
              [localProps.record._id]: localProps.record.attributeValues?.map(
                (attributeItem) => ({
                  ...attributeItem,
                  key: attributeItem._id,
                })
              ),
            });
            let categoryList = [];

            localProps.record.categoryIdList.forEach((categoryId) => {
              let category = [...initialCategories].find(
                ({ _id }) => _id === categoryId.id
              );

              categoryList = [...categoryList, category];
            });

            setCategorDataSource(categoryList);
            return localProps.onExpand(localProps.record, e);
          }}
        />
      );
    }
  };

  const handleSubmit = (e, record, field) => {
    if (e !== undefined && e !== record[field]) {
      props
        .editAttribute(
          {
            name: record.name,
            isActive: record.isActive,
            categoryIdList: record.categoryIdList,
            attributeValues: record.attributeValues,
            [field]: e,
          },
          record._id
        )
        .then(() => {
          props.fetchAttributeList();
        });
    }
    form.resetFields()
    setIsEdit(null);
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

    props.fetchAttributeList(query);
  };

  useEffect(() => {
    if (!props.attributesLoading) {
      setDatasource(
        props.attributes?.map((category) => ({
          ...category,
          key: category._id,
        }))
      );
    }
  }, [props.attributes, props.attributesLoading]);

  useEffect(() => {
    if (!props.categoriesLoading) {
      setinitialCategories(
        props.categories?.map((item) => ({ ...item, key: item._id }))
      );
    }
  }, [props.categories, props.categoriesLoading]);

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
            loading={props.attributesLoading}
            columns={getColumns(columns)}
            pagination={
              props.attributesLoading
                ? { defaultPageSize: 10 }
                :
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
                    defaultPageSize: 5,
                    position: ["topRight", "bottomRight"],
                  }
                : false
            }
            bordered
            expandIcon={(p) => <CustomExpandIcon {...p} />}
            expandedRowRender={(rec) => (
              <AttributeValueList
                record={rec}
                {...props}
                categoryDataSource={categoryDataSource}
                setCategoryDataSource={setCategorDataSource}
                setSubDataSource={setSubDataSource}
                subDataSource={subDataSource}
                expandedRowKeys={expandedRowKeys}
                setIsEdit={setIsEdit}
                form={form}
                initialCategories={initialCategories}
                setExpandedRowKey={setExpandedRowKeys}
                isEdit={isEdit}
              />
            )}
            expandedRowKeys={expandedRowKeys}
          />
        </Card>
      </div>
    </Form>
  );
};

export default List;
