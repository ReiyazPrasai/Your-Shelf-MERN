import React, { useEffect, useState } from "react";
import { Form } from "antd";

import { getModuleList, isEmpty } from "../../utils/commonUtils";
import RoleForm from "./RoleForm";

const MainAddForm = (props) => {
  const [form] = Form.useForm();
  const [selectedRole, setSelectedRole] = useState([]);
  const [moduleList, setModulelist] = useState(null);
  const [initialValues, setInitialValues] = useState({});
  const [selectedGroup, setSelectedGroup] = useState({});

  const handleCheckboxChange = (e, id, role) => {
    if (e.target.checked) {
      setSelectedRole([...selectedRole, `${id}:_${role}`]);
    } else {
      setSelectedRole(selectedRole.filter((item) => `${id}:_${role}` !== item));
    }
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      props.editRole({ ...values, roles: selectedRole }, props.match.params.id);
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

  useEffect(() => {
    setInitialValues(props.role);
    setSelectedRole(props.role?.roles);
    setSelectedGroup(
      props.groups.find(({ _id }) => _id === props.role?.groupId)
    );
  }, [props.role, props.groups]);

  return (
    <Form className={"full"} form={form} layout={"vertical"}>
      <div>
        <RoleForm
          {...props}
          form={form}
          moduleList={moduleList}
          setSelectedGroup={setSelectedGroup}
          handleCheckboxChange={handleCheckboxChange}
          handleSubmit={handleSubmit}
          initialValues={initialValues}
          handelCancel={handelCancel}
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
          loading={props.groupLoading || isEmpty(initialValues)}
        />
      </div>
    </Form>
  );
};

export default MainAddForm;
