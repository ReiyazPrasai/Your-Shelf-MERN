import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import List from "../../components/Roles/List";
import * as reducerToolsAction from "../../actions/reducerToolsAction";
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

  useEffect(() => {
    props.actions.headingRequest("Roles");
    return () => {
      props.actions.reducerCleanRequest();
    };
  }, [props.actions]);

  useEffect(() => {
    if (!isCalled) {
      props.actions.fetchRoleList();
      props.actions.fetchGroupList();
      setIsCalled(true);
    }
  }, [props.actions, isCalled]);

  return (
    <List
      fetchGroupList={fetchGroupList}
      fetchRoleList={fetchRoleList}
      editRole={roleService.editRole}
      deleteRole={roleService.deleteRole}
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
      Object.assign({}, reducerToolsAction, groupService, roleService),
      dispatch
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);
