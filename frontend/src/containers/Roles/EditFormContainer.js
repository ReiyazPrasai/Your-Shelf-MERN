import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import MainEditForm from "../../components/Roles/MainEditForm";
import * as reducerToolsAction from "../../actions/reducerToolsAction";
import * as roleService from "../../services/roleService";
import * as groupService from "../../services/groupService";

export const EditFormContainer = (props) => {
  const { match } = props;
  const [isCalled, setIsCalled] = useState(false);

  useEffect(() => {
    if (!isCalled) {
      props.actions.fetchGroupList([
        { action: "search", searchBy: { isActive: true } },
      ]);
      props.actions.fetchRoleById(match.params.id);
      setIsCalled(true);
    }
  }, [props.actions, isCalled, match]);

  useEffect(() => {
    props.actions.headingRequest("Edit Role");
    return () => {
      props.actions.reducerCleanRequest();
    };
  }, [props.actions]);

  return <MainEditForm editRole={roleService.editRole} {...props} />;
};

const mapStateToProps = (state) => ({
  role: state.role.payload,
  roleLoading: state.role.loading,
  roleError: state.role.error,
  groups: state.groups.payload,
  groupLoading: state.groups.loading,
  groupError: state.groups.error,
  userInfo: state.userInfo.payload,
});

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      Object.assign({}, reducerToolsAction, roleService, groupService),
      dispatch
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditFormContainer);
