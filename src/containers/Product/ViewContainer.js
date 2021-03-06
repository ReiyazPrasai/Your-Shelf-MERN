import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import View from "../../components/Product/View";
import * as reducerToolsAction from "../../actions/reducerToolsAction";
import * as productService from "../../services/productService";
import * as categoryService from "../../services/categoryService";
import * as attributeService from "../../services/attributeService";
import * as brandService from "../../services/brandService";
import * as companyService from "../../services/companyService";

export const ViewContainer = (props) => {
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
    if (!isCalled) {
      props.actions.fetchProductById(props.match.params.id);
      props.actions.fetchBrandList();
      props.actions.fetchCategoryList();
      props.actions.fetchCompanyById(props.userInfo.companyId);
      props.actions.fetchAttributeList();

      setIsCalled(true);
    }
  }, [props.actions, props.userInfo, props.match, isCalled]);

  return (
    <View
      fetchProductList={fetchProductList}
      // editStore={productService.editStore}
      // deleteStore={productService.deleteStore}
      {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  product: state.product.payload,
  productLoading: state.product.loading,
  productError: state.product.error,
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

export default connect(mapStateToProps, mapDispatchToProps)(ViewContainer);
