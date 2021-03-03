import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import MainAddForm from "../../components/Product/MainAddForm";
import * as reducerToolsAction from "../../actions/reducerToolsAction";
import * as categoryService from "../../services/categoryService";
import * as attributeService from "../../services/attributeService";
import * as brandService from "../../services/brandService";
import * as productService from "../../services/productService";
import * as companyService from "../../services/companyService";

export const AddFormContainer = (props) => {
  const searchQuery = useCallback(() => {
    return [{ action: "search", searchBy: { isActive: true } }];
  }, []);

  const fetchAttributeList = (query) => {
    return props.actions.fetchAttributeList(query);
  };

  const fetchCategoryList = (query) => {
    return props.actions.fetchCategoryList(query);
  };

  const fetchSubCategoryList = (id, query) => {
    return props.actions.fetchSubCategoryList(id, query);
  };

  useEffect(() => {
    if (props.isAddProduct) {
      props.actions.fetchBrandList(searchQuery());
      props.actions.fetchCategoryList(searchQuery());
      props.actions.fetchCompanyById(props.userInfo.companyId);
      props.actions.fetchAttributeList(searchQuery());
    }
  }, [props.actions, searchQuery, props.userInfo, props.isAddProduct]);

  return (
    <MainAddForm
      searchQuery={searchQuery()}
      addNewProduct={productService.addNewProduct}
      fetchAttributeList={fetchAttributeList}
      fetchCategoryList={fetchCategoryList}
      fetchSubCategoryList={fetchSubCategoryList}
      {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  brands: state.brands.payload,
  brandLoading: state.brands.loading,
  brandError: state.brands.error,
  categories: state.categories.payload,
  categoriesLoading: state.categories.loading,
  categoriesError: state.categories.error,
  subCategories: state.subCategories.payload,
  subCategoriesLoading: state.subCategories.loading,
  subCategoriesError: state.subCategories.error,
  userInfo: state.userInfo.payload,
  attributes: state.attributes.payload,
  attributesLoading: state.attributes.loading,
  attributesError: state.attributes.error,
  company: state.company.payload,
  companyLoading: state.company.loading,
  companyError: state.company.error,
});

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      Object.assign(
        {},
        reducerToolsAction,
        categoryService,
        attributeService,
        brandService,
        companyService,
        productService
      ),
      dispatch
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddFormContainer);
