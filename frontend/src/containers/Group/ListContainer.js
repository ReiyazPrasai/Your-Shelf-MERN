import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import List from "../../components/Group/List";
import * as reducerToolsAction from "../../actions/reducerToolsAction";
import * as groupService from "../../services/groupService";

export const ListContainer = (props) => {
  const [isCalled, setIsCalled] = useState(false);

  const fetchGroupList = (query) => {
    return props.actions.fetchGroupList(query);
  };

  useEffect(() => {
    props.actions.headingRequest("Groups");
    return () => {
      props.actions.reducerCleanRequest();
    };
  }, [props.actions]);

  useEffect(() => {
    if (!isCalled) {
      props.actions.fetchGroupList();
      setIsCalled(true);
    }
  }, [props.actions, isCalled]);

  return (
    <List
      fetchGroupList={fetchGroupList}
      editGroup={groupService.editGroup}
      deleteGroup={groupService.deleteGroup}
      {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  groups: state.groups.payload,
  groupLoading: state.groups.loading,
  groupError: state.groups.error,
});

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      Object.assign({}, reducerToolsAction, groupService),
      dispatch
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);
