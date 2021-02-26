import menuList from "../components/Layout/SideNav/menuList";

export const isEmpty = (obj) => {
  if (typeof obj === "number") {
    return false;
  }
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

export const isObject = (obj) => {
  if (obj instanceof Object && !(obj instanceof Array)) {
    return true;
  }
  return false;
};

export const isArray = (obj) => {
  if (obj instanceof Array) {
    return true;
  }
  return false;
};

export const numberMask = (number) => {
  if (number) {
    let cv = -1;
    cv = number.replace(/\D/g, "").match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    return !cv[2]
      ? cv[1]
      : "(" + cv[1] + ") " + cv[2] + (cv[3] ? "-" + cv[3] : "");
  } else {
    return undefined;
  }
};

export const getQuery = (formData, previousQuery) => {
  let searchBy = {};
  for (const key in formData) {
    if (
      formData[key] !== undefined &&
      !isArray(formData[key]) &&
      !isObject(formData[key]) &&
      formData[key] !== "all" &&
      formData[key] !== "both"
    ) {
      searchBy = {
        ...searchBy,
        [key]: formData[key],
      };
    }
  }
  return [
    ...previousQuery.filter((item) => item.action !== "search"),
    { action: "search", searchBy: searchBy },
  ];
};

export const listSearch = (form, mainList, setList) => {
  let tempFilteredData = mainList;
  const temp = [];
  for (const key in form.getFieldsValue()) {
    if (
      (key.includes("_") && form.getFieldsValue()[key]) ||
      form.getFieldsValue()[key] === false
    ) {
      tempFilteredData = tempFilteredData.filter((item) => {
        if (
          typeof form.getFieldValue(key) === "string" &&
          isNaN(Number(form.getFieldValue(key))) &&
          typeof item[key.split("_")[1]] === "string"
        ) {
          return item[key.split("_")[1]]
            .toLowerCase()
            .includes(form.getFieldValue(key).toLowerCase());
        }
        return form.getFieldValue(key) === "all"
          ? item[key.split("_")[1]] === true ||
              item[key.split("_")[1]] === false ||
              item[key.split("_")[1]] === "pending"
          : item[key.split("_")[1]] === form.getFieldValue(key);
      });
      temp.push(true);
    } else {
      temp.push(false);
    }
  }

  setList(tempFilteredData);
  if (!temp.includes(true)) {
    setList(mainList);
  }
};

export const getModuleList = () => {
  const test = menuList.map((item) => {
    if (item.subMenu) {
      return [...item.subMenu];
    }
    return item;
  });
  return test.flat();
};
