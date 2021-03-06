// import { loadSessionState } from "../utils/storageUtil";

export let isAllowed = (permissions, permissionCode) => {
  if (permissions.includes("All")) return true;
  let isAuthorized = false;
  Array.isArray(permissionCode) &&
    permissionCode.forEach((code) => {
      if (Array.isArray(permissions) && permissions.includes(code)) {
        isAuthorized = true;
      }
    });
  return isAuthorized;
};
