import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import MainAddForm from "../../components/Roles/MainAddForm";
import * as reducerToolsAction from "../../actions/reducerToolsAction";
import * as roleService from "../../services/roleService";
import * as groupService from "../../services/groupService";

export const AddFormContainer = (props) => {
  const [isCalled, setIsCalled] = useState(false);
  
  useEffect(() => {
    props.actions.headingRequest("Add Roles");
  }, [props]);

  useEffect(() => {
    if (!isCalled) {
      props.actions.fetchGroupList([
        { action: "search", searchBy: { isActive: true } },
      ]);
      setIsCalled(true);
    }
  }, [props.actions, isCalled]);

  return <MainAddForm addNewRole={roleService.addNewRole} {...props} />;
};

const mapStateToProps = (state) => ({
  groups: state.groups.payload,
  groupLoading: state.groups.loading,
  groupError: state.groups.error,
  userInfo: state.userInfo.payload
});

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      Object.assign({}, reducerToolsAction, roleService, groupService),
      dispatch
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddFormContainer);
