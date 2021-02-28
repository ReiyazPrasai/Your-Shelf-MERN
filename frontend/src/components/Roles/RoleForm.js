import React from "react";
import { Row, Col, Checkbox } from "antd";

import { Card, Input, Select } from "../Common/Elements";
import { isEmpty } from "../../utils/commonUtils";

const RoleForm = (props) => {
  const handleCheckboxChange = (e, id, role) => {
    if (e.target.checked) {
      props.setSelectedRole([...props.selectedRole, `${id}:_${role}`]);
    } else {
      props.setSelectedRole(
        props.selectedRole.filter((item) => `${id}:_${role}` !== item)
      );
    }
  };
  
  return (
    <Card
      onSave={props.handleSubmit}
      onCancel={props.handelCancel}
      to="/features/brands"
      status
      isActive={true}
      style={{ width: "800px", padding: 20, margin: "auto" }}
      black
      form={props.form}
      loading={props.loading}
    >
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Input
            name="name"
            label="Role Name"
            initialValue={props.initialValues?.name}
            required
          />
        </Col>
        <Col span={12}>
          <Select
            name="groupId"
            label="Group Name"
            initialValue={props.initialValues?.groupId}
            array={props.groups}
            description={"name"}
            value={"_id"}
            onChange={(e) => {
              props.setSelectedGroup(props.groups.find(({ _id }) => _id === e));
            }}
            required
          />
        </Col>
      </Row>
      {!isEmpty(props.moduleList) && (
        <Row>
          <Col
            style={{
              border: "1px solid #808080",
              padding: 10,
              borderRadius: 2,
            }}
            span={24}
          >
            <span style={{ marginRight: 252, display: "inline-block" }}>
              Roles
            </span>
            <span style={{ marginRight: 60, display: "inline-block" }}>
              List
            </span>
            <span style={{ marginRight: 60, display: "inline-block" }}>
              Add
            </span>
            <span style={{ marginRight: 55, display: "inline-block" }}>
              Edit
            </span>
            <span style={{ marginRight: 40, display: "inline-block" }}>
              Delete
            </span>
            <span style={{ marginRight: 50, display: "inline-block" }}>
              Approve
            </span>
            <span style={{ display: "inline-block" }}>Buy</span>
            <hr />
            {props.moduleList.map((item) => {
              return (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      padding: 5,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ marginRight: 10 }}>{item.icon}</span>{" "}
                    <span>{item.label}</span>
                  </div>
                  <div style={{ float: "right" }}>
                    <div style={{ float: "right", marginRight: 5 }}>
                      <Checkbox
                        checked={props.selectedRole?.includes(
                          `${item.id}:_buy`
                        )}
                        onChange={(e) =>
                          handleCheckboxChange(e, item.id, "buy")
                        }
                      />
                    </div>
                    <div style={{ float: "right", marginRight: 70 }}>
                      <Checkbox
                        checked={props.selectedRole.includes(
                          `${item.id}:_approve`
                        )}
                        onChange={(e) =>
                          handleCheckboxChange(e, item.id, "approve")
                        }
                      />
                    </div>
                    <div style={{ float: "right", marginRight: 70 }}>
                      <Checkbox
                        checked={props.selectedRole.includes(
                          `${item.id}:_delete`
                        )}
                        onChange={(e) =>
                          handleCheckboxChange(e, item.id, "delete")
                        }
                      />
                    </div>
                    <div style={{ float: "right", marginRight: 70 }}>
                      <Checkbox
                        checked={props.selectedRole.includes(
                          `${item.id}:_edit`
                        )}
                        onChange={(e) =>
                          handleCheckboxChange(e, item.id, "edit")
                        }
                      />
                    </div>
                    <div style={{ float: "right", marginRight: 70 }}>
                      <Checkbox
                        checked={props.selectedRole.includes(`${item.id}:_add`)}
                        onChange={(e) =>
                          handleCheckboxChange(e, item.id, "add")
                        }
                      />
                    </div>
                    <div style={{ float: "right", marginRight: 70 }}>
                      <Checkbox
                        checked={props.selectedRole.includes(
                          `${item.id}:_list`
                        )}
                        onChange={(e) =>
                          handleCheckboxChange(e, item.id, "list")
                        }
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </Col>
        </Row>
      )}
    </Card>
  );
};

export default RoleForm;
