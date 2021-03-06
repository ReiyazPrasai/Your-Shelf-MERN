import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import MainAddForm from "../../components/Group/MainAddForm";
import * as reducerToolsAction from "../../actions/reducerToolsAction";
import * as groupService from "../../services/groupService";

export const AddFormContainer = (props) => {
  useEffect(() => {
    props.actions.headingRequest("Add Groups");
  }, [props]);

  return <MainAddForm addNewGroup={groupService.addNewGroup} {...props} />;
};

const mapStateToProps = (state) => ({
  userInfo: state.userInfo.payload
});

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      Object.assign({}, reducerToolsAction, groupService),
      dispatch
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddFormContainer);
