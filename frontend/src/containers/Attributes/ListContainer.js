import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import List from "../../components/Attributes/List";
import * as reducerToolsAction from "../../actions/reducerToolsAction";
import * as categoryService from "../../services/categoryService";
import * as attributeService from "../../services/attributeService";

export const ListContainer = (props) => {
  const [isCalled, setIsCalled] = useState(false);

  const fetchAttributeList = (query) => {
    return props.actions.fetchAttributeList(query);
  };

  const fetchCategoryList = (query) => {
    return props.actions.fetchCategoryList(query);
  };

  useEffect(() => {
    props.actions.headingRequest("Attributes");
  }, [props.actions]);

  useEffect(() => {
    if (!isCalled) {
      props.actions.fetchCategoryList();
      props.actions.fetchAttributeList();
      setIsCalled(true);
    }
  }, [props.actions, isCalled]);

  return (
    <List
      fetchAttributeList={fetchAttributeList}
      fetchCategoryList={fetchCategoryList}
      editAttribute={attributeService.editAttribute}
      {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  attributes: state.attributes.payload,
  attributesLoading: state.attributes.loading,
  attributesError: state.attributes.error,
  categories: state.categories.payload,
  categoriesLoading: state.categories.loading,
  categoriesError: state.categories.error,
  subCategories: state.subCategories.payload,
  subCategoriesLoading: state.subCategories.loading,
  subCategoriesError: state.subCategories.error,
});

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      Object.assign({}, reducerToolsAction, categoryService, attributeService),
      dispatch
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);
