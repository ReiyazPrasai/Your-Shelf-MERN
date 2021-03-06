import React, { useEffect, useState } from "react";
import { Form } from "antd";

import { getModuleList } from "../../utils/commonUtils";
import RoleForm from "./RoleForm";

const MainAddForm = (props) => {
  const [form] = Form.useForm();
  const [selectedRole, setSelectedRole] = useState([]);
  const [moduleList, setModulelist] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState({});

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      props.addNewRole({ ...values, roles: selectedRole });
    });
  };

  const handelCancel = () => {
    form.resetFields();
    form.setFieldsValue({ isActive: true });
    setSelectedRole([]);
  };

  useEffect(() => {
    setModulelist(
      getModuleList().filter((item) =>
        selectedGroup?.modules?.includes(item.id)
      )
    );
  }, [selectedGroup]);

  return (
    <Form className={"full"} form={form} layout={"vertical"}>
      <div>
        <RoleForm
          {...props}
          form={form}
          moduleList={moduleList}
          setSelectedGroup={setSelectedGroup}
          handleSubmit={handleSubmit}
          handelCancel={handelCancel}
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
          loading={props.groupLoading}
        />
      </div>
    </Form>
  );
};

export default MainAddForm;
