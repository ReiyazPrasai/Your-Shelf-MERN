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
import ExpandedRowRender from "./ExpandableRows";
import { useLocation } from "react-router";
import { isEmpty } from "../../utils/commonUtils";
import { components, getColumns } from "../Common/EditableCell.js";

const List = (props) => {
  const [form] = Form.useForm();
  const [datasource, setDatasource] = useState([]);
  const [subDataSource, setSubDataSource] = useState([]);
  const [isEdit, setIsEdit] = useState(null);
  const [sortedInfo, setSortedInfo] = useState({});
  const [listQuery, setListQuery] = useState([]);
  const [expandedRowKeys, setexpandedRowKeys] = useState([]);

  const locationState = useLocation().state;

  const columns = [
    {
      title: "Category Name",
      dataIndex: "name",
      width: "33%",
      key: "name",
      sorter: (a, b) => a.name - b.name,
      sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
      editable: true,
      isAdd: isEdit,
      editComponent: (text, record, toggleEdit) => (
        <Input
          name={["category", record._id, "name"]}
          formstyle={{ margin: 0 }}
          hideLabel
          autoFocus
          onBlur={() => {
            toggleEdit();
            form.resetFields(["category", record._id, "name"]);
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
            name={["category", record._id, "isActive"]}
            onChange={(e) => {
              handleSubmit(e, record, "isActive");
            }}
            disabled={isEdit === "new" && record._id !== "new"}
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
            setexpandedRowKeys([]);
            return localProps.onExpand(localProps.record, e);
          }}
        />
      );
    } else {
      return (
        <PlusSquareTwoTone
          onClick={(e) => {
            setexpandedRowKeys([localProps.record._id]);
            if (
              !subDataSource[localProps.record._id] ||
              subDataSource[localProps.record._id]?.[0]?._id === "new"
            ) {
              setIsEdit("new");
            } else {
              setIsEdit(null);
            }
            !subDataSource[localProps.record._id] &&
              props.fetchSubCategoryList(localProps.record._id).then((res) => {
                const data = res.data?.map((subCategory) => ({
                  ...subCategory,
                  key: subCategory._id,
                }));
                setSubDataSource({
                  ...subDataSource,
                  [localProps.record._id]:
                    data.length > 0
                      ? data
                      : [
                          {
                            _id: "new",
                            name: undefined,
                            isActive: true,
                            key: "new",
                          },
                        ],
                });
                if (data.length === 0) {
                  setIsEdit("new");
                } else {
                  setIsEdit(null);
                }
              });
            return localProps.onExpand(localProps.record, e);
          }}
        />
      );
    }
  };

  const handleSubmit = (e, record, field) => {
    if (e !== undefined && e !== record[field]) {
      props
        .editCategory(
          { name: record.name, isActive: record.isActive, [field]: e },
          record._id
        )
        .then(() => {
          props.fetchCategoryList();
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

    props.fetchCategoryList(query);
  };

  useEffect(() => {
    if (!props.categoriesLoading) {
      setDatasource(
        props.categories?.map((category) => ({
          ...category,
          key: category._id,
        }))
      );
    }
  }, [props.categories, props.categoriesLoading]);

  useEffect(() => {
    if (locationState && isEmpty(listQuery)) {
      const searchQuery = [
        {
          action: "search",
          searchBy: { _id: locationState.categoryId },
        },
      ];
      setListQuery([...listQuery, ...searchQuery]);
    }
  }, [locationState, listQuery]);

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
            scroll={{ x: 1000 }}
            loading={props.categoriesLoading}
            columns={getColumns(columns)}
            pagination={
              props.categoriesLoading
                ? { defaultPageSize: 10 }
                : datasource.length > 5
                ? {
                    showTotal: (total, range) => (
                      <b style={{ color: "white" }}>
                        {" "}
                        {`Showing ${range[0]} - ${range[1]} of ${total}`}
                      </b>
                    ),
                    showSizeChanger: true,
                    pageSizeOptions: [5, 10, 15, 20],
                    defaultPageSize: 10,
                    position: ["topRight", "bottomRight"],
                  }
                : false
            }
            bordered
            expandIcon={(p) => <CustomExpandIcon {...p} />}
            expandedRowRender={(rec) => (
              <ExpandedRowRender
                record={rec}
                {...props}
                setSubDataSource={setSubDataSource}
                subDataSource={subDataSource}
                expandedRowKeys={expandedRowKeys}
                setIsEdit={setIsEdit}
                form={form}
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
