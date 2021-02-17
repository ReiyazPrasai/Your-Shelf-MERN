import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import MainAddForm from "../../components/Stores/MainAddForm";
import * as reducerToolsAction from "../../actions/reducerToolsAction";
import * as storeService from "../../services/storeService";

export const AddFormContainer = (props) => {
  useEffect(() => {
    props.actions.headingRequest("Add Stores");
  }, [props]);

  return <MainAddForm addNewStore={storeService.addNewStore} {...props} />;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      Object.assign({}, reducerToolsAction, storeService),
      dispatch
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddFormContainer);
