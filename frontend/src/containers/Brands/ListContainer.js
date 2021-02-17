import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import List from "../../components/Brands/List";
import * as reducerToolsAction from "../../actions/reducerToolsAction";
import * as brandService from "../../services/brandService";

export const ListContainer = (props) => {
  const [isCalled, setIsCalled] = useState(false);

  const fetchBrandList = (query) => {
    return props.actions.fetchBrandList(query);
  };

  useEffect(() => {
    props.actions.headingRequest("Brands");
  }, [props]);

  useEffect(() => {
    if (!isCalled) {
      props.actions.fetchBrandList();
      setIsCalled(true);
    }
  }, [props.actions, isCalled]);

  return (
    <List
      fetchBrandList={fetchBrandList}
      editBrand={brandService.editBrand}
      {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  brands: state.brands.payload,
  brandLoading: state.brands.loading,
  brandError: state.brands.error,
});

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      Object.assign({}, reducerToolsAction, brandService),
      dispatch
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);
