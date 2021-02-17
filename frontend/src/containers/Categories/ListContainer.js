import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import List from "../../components/Categories/List";
import * as reducerToolsAction from "../../actions/reducerToolsAction";
import * as categoryService from "../../services/categoryService";
import { useLocation } from "react-router";

export const ListContainer = (props) => {
  const [isCalled, setIsCalled] = useState(false);

  const locationStateCategoryId = useLocation().state?.categoryId;

  const fetchCategoryList = (query) => {
    return props.actions.fetchCategoryList(query);
  };

  const fetchSubCategoryList = (id, query) => {
    return props.actions.fetchSubCategoryList(id, query);
  };

  useEffect(() => {
    props.actions.reducerCleanRequest()
    props.actions.headingRequest("Categories");
  }, [props.actions]);

  useEffect(() => {
    if (!isCalled) {
      console.log('here', locationStateCategoryId)
      !locationStateCategoryId && props.actions.fetchCategoryList();
      setIsCalled(true);
    }
  }, [props.actions, isCalled, locationStateCategoryId]);

  return (
    <List
      fetchSubCategoryList={fetchSubCategoryList}
      fetchCategoryList={fetchCategoryList}
      editCategory={categoryService.editCategory}
      editSubCategory={categoryService.editSubCategory}
      addNewSubCategory={categoryService.addNewSubCategory}
      {...props}
    />
  );
};

const mapStateToProps = (state) => ({
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
      Object.assign({}, reducerToolsAction, categoryService),
      dispatch
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);
