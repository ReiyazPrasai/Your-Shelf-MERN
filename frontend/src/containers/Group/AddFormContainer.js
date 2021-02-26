import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import MainAddForm from "../../components/Roles/MainAddForm";
import * as reducerToolsAction from "../../actions/reducerToolsAction";
import * as roleService from "../../services/roleService";

export const AddFormContainer = (props) => {
  useEffect(() => {
    props.actions.headingRequest("Add Roles");
  }, [props]);

  return <MainAddForm addNewRole={roleService.addNewRole} {...props} />;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      Object.assign({}, reducerToolsAction, roleService),
      dispatch
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddFormContainer);
