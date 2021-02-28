import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import MainAddForm from "../../components/Users/MainAddForm";
import * as reducerToolsAction from "../../actions/reducerToolsAction";
import * as roleService from "../../services/roleService";
import * as userService from "../../services/userService";
import * as groupService from "../../services/groupService";

export const AddFormContainer = (props) => {
  const [isCalled, setIsCalled] = useState(false);

  const fetchRoleList = (query) => {
    return props.actions.fetchRoleList(query);
  };

  useEffect(() => {
    props.actions.headingRequest("Add Users");
  }, [props]);

  useEffect(() => {
    if (!isCalled) {
      props.actions.fetchGroupList([
        { action: "search", searchBy: { isActive: true } },
      ]);
      setIsCalled(true);
    }
  }, [props.actions, isCalled]);

  return (
    <MainAddForm
      addNewUser={userService.addNewUser}
      fetchRoleList={fetchRoleList}
      {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  roles: state.roles.payload,
  rolesLoading: state.roles.loading,
  rolesError: state.roles.error,
  groups: state.groups.payload,
  groupLoading: state.groups.loading,
  groupError: state.groups.error,
  userInfo: state.userInfo.payload
});

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      Object.assign(
        {},
        reducerToolsAction,
        roleService,
        groupService,
        userService
      ),
      dispatch
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddFormContainer);
