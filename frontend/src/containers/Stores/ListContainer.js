import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import List from "../../components/Stores/List";
import * as reducerToolsAction from "../../actions/reducerToolsAction";
import * as storeService from "../../services/storeService";

export const ListContainer = (props) => {
  const [isCalled, setIsCalled] = useState(false);

  const fetchStoreList = (query) => {
    return props.actions.fetchStoreList(query);
  };

  useEffect(() => {
    props.actions.headingRequest("Stores");
    return () => {
      props.actions.reducerCleanRequest();
    };
  }, [props.actions]);

  useEffect(() => {
    if (!isCalled) {
      props.actions.fetchStoreList();
      setIsCalled(true);
    }
  }, [props.actions, isCalled]);

  return (
    <List
      fetchStoreList={fetchStoreList}
      editStore={storeService.editStore}
    deleteStore={storeService.deleteStore}
      {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  stores: state.stores.payload,
  storeLoading: state.stores.loading,
  storeError: state.stores.error,
});

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      Object.assign({}, reducerToolsAction, storeService),
      dispatch
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);
