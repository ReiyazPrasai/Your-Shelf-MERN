import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import MainEditForm from "../../components/Categories/MainEditForm";
import * as reducerToolsAction from "../../actions/reducerToolsAction";

export const EditFormContainer = (props) => {
  useEffect(() => {
    props.actions.headingRequest("Edit Category");
  }, [props]);

  return <MainEditForm {...props} />;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      Object.assign({}, reducerToolsAction),
      dispatch
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditFormContainer);
