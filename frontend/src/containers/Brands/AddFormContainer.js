import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import MainAddForm from "../../components/Brands/MainAddForm";
import * as reducerToolsAction from "../../actions/reducerToolsAction";
import * as brandService from "../../services/brandService";

export const AddFormContainer = (props) => {
  useEffect(() => {
    props.actions.headingRequest("Add Brands");
  }, [props]);

  return <MainAddForm addNewBrand={brandService.addNewBrand} {...props} />;
};

const mapStateToProps = (state) => ({
  userInfo: state.userInfo.payload
});

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      Object.assign({}, reducerToolsAction, brandService),
      dispatch
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddFormContainer);
