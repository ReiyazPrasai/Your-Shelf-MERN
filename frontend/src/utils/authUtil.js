// import moment from "moment"

// import { loadState, removeState } from "./storageUtil"
// import { HL_USER_TOKEN } from "./constants/appConfigs"
// // import { JWT_TOKEN } from '../constants/appConfig';

// export let isTokenExpired = () => {
//   const expiresIn = loadState(HL_USER_TOKEN)?.[`.expires`]?.split(",").join(" ")
//   if (moment(expiresIn).valueOf() > Date.now()) {
//     // Checking if token is expired.
//     return true
//   } else {
//     removeState(HL_USER_TOKEN)
//     return false
//   }
// }

export let isAuthenticated = () => {
  return false
}
