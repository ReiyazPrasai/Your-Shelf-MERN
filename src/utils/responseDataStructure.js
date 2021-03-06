module.exports.onSuccess = (code, data, message) => {
  return {
    status: "SUCCESS",
    code: code,
    message: data.message || message,
    data: data,
  };
};

module.exports.onFailure = (code, message, data) => {
  return {
    status: "FAILURE",
    code: code,
    message: message,
    data: data,
  };
};
