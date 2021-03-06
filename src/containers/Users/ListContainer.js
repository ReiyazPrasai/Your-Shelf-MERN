import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import List from "../../components/Users/List";
import * as reducerToolsAction from "../../actions/reducerToolsAction";
import * as userService from "../../services/userService";
import * as groupService from "../../services/groupService";
import * as roleService from "../../services/roleService";

export const ListContainer = (props) => {
  const [isCalled, setIsCalled] = useState(false);

  const fetchGroupList = (query) => {
    return props.actions.fetchGroupList(query);
  };

  const fetchRoleList = (query) => {
    return props.actions.fetchRoleList(query);
  };

  const fetchUserList = (query) => {
    return props.actions.fetchUserList(query);
  };

  useEffect(() => {
    props.actions.headingRequest("Users");
    return () => {
      props.actions.reducerCleanRequest();
    };
  }, [props.actions]);

  useEffect(() => {
    if (!isCalled) {
      props.actions.fetchUserList();
      props.actions.fetchRoleList();
      props.actions.fetchGroupList();
      setIsCalled(true);
    }
  }, [props.actions, isCalled]);

  return (
    <List
      fetchUserList={fetchUserList}
      fetchGroupList={fetchGroupList}
      fetchRoleList={fetchRoleList}
      editUser={userService.editUser}
      deleteUser={userService.deleteUser}
      {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  users: state.users.payload,
  usersLoading: state.users.loading,
  usersError: state.users.error,
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
        groupService,
        roleService,
        userService
      ),
      dispatch
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);
