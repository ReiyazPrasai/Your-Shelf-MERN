import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import MainAddForm from "../../components/Categories/MainAddForm";
import * as reducerToolsAction from "../../actions/reducerToolsAction";
import * as categoryService from '../../services/categoryService'

export const AddFormContainer = (props) => {
  useEffect(() => {
    props.actions.headingRequest("Add Categories");
  }, [props]);

  return <MainAddForm addNewCategory={categoryService.addNewCategory} {...props} />;
};

const mapStateToProps = (state) => ({
  userInfo: state.userInfo.payload
});

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      Object.assign({}, reducerToolsAction, categoryService),
      dispatch
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddFormContainer);
