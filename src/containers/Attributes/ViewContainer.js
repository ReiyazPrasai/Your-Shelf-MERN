import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import View from "../../components/Attributes/View";
import * as reducerToolsAction from "../../actions/reducerToolsAction";

export const ViewContainer = (props) => {
  useEffect(() => {
    props.actions.headingRequest("View Attribute");
  }, [props]);

  return <View {...props} />;
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

export default connect(mapStateToProps, mapDispatchToProps)(ViewContainer);