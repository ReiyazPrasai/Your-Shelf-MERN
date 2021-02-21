import React from "react";
import Layout from "../../components/Layout";
import AuthLayout from "../../components/AuthLayout";

const asyncComponent = (importString) => {
  return React.lazy(() => import(`../${importString}`));
};

const AsyncComponents = [
  Layout,
  AuthLayout,
  [
    [asyncComponent("Auth"), ["auth", "", "/"], "restricted"],
    [asyncComponent("Dashboard"), ["dashboard"], "private"],
    [asyncComponent("Brands"), ["features/brands"], "private"],
    [asyncComponent("Categories"), ["features/categories"], "private"],
    [asyncComponent("Stores"), ["stores"], "private"],
    [asyncComponent("Attributes"), ["features/attributes"], "private"],
    [asyncComponent("Company"), ["company"], "private"],
  ],
];

export default AsyncComponents;
