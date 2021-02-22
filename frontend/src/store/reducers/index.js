import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import history from "../../utils/historyUtil";
import { headingReducer } from "./headingReducer";
import { brandByIdReducer, brandListReducer } from "./brandReducer";
import { productByIdReducer, productListReducer } from "./productReducer";
import { storeListReducer, storeByIdReducer } from "./storeReducer";
import {
  categoryListReducer,
  categoryByIdReducer,
  subCategoryListReducer,
} from "./categoryReducer";
import { attributeListReducer } from "./attributeReducer";
import { groupByIdReducer, groupListReducer } from "./groupReducer";
import { roleByIdReducer, roleListReducer } from "./roleReducer";

const appReducer = combineReducers({
  router: connectRouter(history),
  heading: headingReducer,
  brands: brandListReducer,
  brand: brandByIdReducer,
  products: productListReducer,
  product: productByIdReducer,
  stores: storeListReducer,
  store: storeByIdReducer,
  categories: categoryListReducer,
  category: categoryByIdReducer,
  subCategories: subCategoryListReducer,
  attributes: attributeListReducer,
  attribute: attributeListReducer,
  groups: groupListReducer,
  group: groupByIdReducer,
  roles: roleListReducer,
  role: roleByIdReducer,
});

const rootReducer = (state, action) => {
  if (action && action.type === "SIGN_OUT") {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
