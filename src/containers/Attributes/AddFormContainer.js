import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import MainAddForm from "../../components/Attributes/MainAddForm";
import * as reducerToolsAction from "../../actions/reducerToolsAction";
import * as categoryService from "../../services/categoryService";
import * as attributeService from "../../services/attributeService";
import { isEmpty } from "../../utils/commonUtils";

export const AddFormContainer = (props) => {
  const { categories } = props;

  const [isCalled, setIsCalled] = useState(false);

  const fetchSubCategoryList = (categoryId) => {
    return props.actions.fetchSubCategoryList(categoryId);
  };

  useEffect(() => {
    props.actions.headingRequest("Add Attributes");
  }, [props]);

  useEffect(() => {
    if (!isCalled) {
      if (isEmpty(categories)) {
        props.actions.fetchCategoryList();
        setIsCalled(true);
      }
    }
  }, [props.actions, categories, isCalled]);

  return (
    <MainAddForm
      addNewAttribute={attributeService.addNewAttribute}
      fetchSubCategoryList={fetchSubCategoryList}
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
      Object.assign({}, reducerToolsAction, categoryService, attributeService),
      dispatch
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddFormContainer);
