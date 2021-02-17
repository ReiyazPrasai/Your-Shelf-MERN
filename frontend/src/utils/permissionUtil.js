// import { loadSessionState } from "../utils/storageUtil";

export let isAllowed = (permissionCode) => {
  const permissions = [1]
  let isAuthorized = false
  Array.isArray(permissionCode) &&
    permissionCode.forEach((code) => {
      if (Array.isArray(permissions) && permissions.includes(code)) {
        isAuthorized = true
      }
    })
  return isAuthorized
}
