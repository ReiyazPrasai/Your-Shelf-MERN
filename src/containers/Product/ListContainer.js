import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import List from "../../components/Product/List";
import * as reducerToolsAction from "../../actions/reducerToolsAction";
import * as productService from "../../services/productService";
import * as categoryService from "../../services/categoryService";
import * as attributeService from "../../services/attributeService";
import * as brandService from "../../services/brandService";
import * as companyService from "../../services/companyService";

export const ListContainer = (props) => {
  const [isCalled, setIsCalled] = useState(false);

  const fetchProductList = (query) => {
    return props.actions.fetchProductList(query);
  };

  useEffect(() => {
    props.actions.headingRequest("Products");
    return () => {
      props.actions.reducerCleanRequest();
    };
  }, [props.actions]);

  useEffect(() => {
    props.actions.fetchProductList();
    props.actions.fetchBrandList();
    props.actions.fetchCategoryList();
    props.actions.fetchCompanyById(props.userInfo.companyId);
    setIsCalled(true);
  }, [props.actions, props.userInfo]);

  return (
    <List
      fetchProductList={fetchProductList}
      // editStore={productService.editStore}
      // deleteStore={productService.deleteStore}
      {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  products: state.products.payload,
  prodcutLoading: state.products.loading,
  prodcutError: state.products.error,
  userInfo: state.userInfo.payload,
  brands: state.brands.payload,
  brandLoading: state.brands.loading,
  brandError: state.brands.error,
  categories: state.categories.payload,
  categoriesLoading: state.categories.loading,
  categoriesError: state.categories.error,
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

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);
