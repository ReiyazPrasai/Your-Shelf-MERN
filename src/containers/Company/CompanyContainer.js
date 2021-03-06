import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Company from "../../components/Company";
import * as reducerToolsAction from "../../actions/reducerToolsAction";
import * as companyService from "../../services/companyService";

export const CompanyCOntainer = (props) => {
  const [isCalled, setIsCalled] = useState(false);

  useEffect(() => {
    props.actions.headingRequest("Add Roles");
  }, [props]);

  useEffect(() => {
    if (!isCalled) {
      
      props.actions.fetchCompanyById(props.userInfo.companyId);
      setIsCalled(true);
    }
  }, [props.actions, props.userInfo, isCalled]);

  return <Company editCompany={companyService.editCompany} {...props} />;
};

const mapStateToProps = (state) => ({
  company: state.company.payload,
  companyLoading: state.company.loading,
  companyError: state.company.error,
  userInfo: state.userInfo.payload,
});

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      Object.assign({}, reducerToolsAction, companyService),
      dispatch
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyCOntainer);
