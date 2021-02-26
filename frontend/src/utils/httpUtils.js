import { Api } from "./apiUtil";

export const store = (apiRoute, formData, contentType) => {
  return Api(contentType).post(`/${apiRoute}`, formData);
};

export const update = (apiRoute, formData, contentType) => {
  return Api(contentType).put(`/${apiRoute}`, formData);
};

export const fetch = (apiRoute, params = {}, contentType) => {
  return Api(contentType, params).get(`/${apiRoute}`, { params });
};

const request = (type) => {
  return {
    type: type,
  };
};

export function destroy(endpoint) {
  return Api().delete(endpoint);
}

const requestSuccess = (type, data) => {
  return {
    type: type,
    data,
  };
};

const requestFailure = (type, data) => {
  return {
    type: type,
    data,
  };
};

export const get = (
  requestActionType,
  requestSuccessActionType,
  requestFailureActionType,
  api,
  params,
  contentType
) => {
  return (dispatch) => {
    dispatch(request(requestActionType));
    return fetch(api, params, contentType)
      .then((res) => {
        dispatch(requestSuccess(requestSuccessActionType, res?.data));
        return Promise.resolve(res?.data);
      })
      .catch((err) => {
        console.log(err);
        dispatch(requestFailure(requestFailureActionType, err?.data));
        return Promise.reject(err?.data);
      });
  };
};

export const post = async (api, params, contentType, noAuthorize) => {
  return await store(api, params, contentType, noAuthorize)
    .then((res) => {
      return Promise.resolve(res?.data);
    })
    .catch((err) => {
      return Promise.reject(err?.data);
    });
};

export const put = async (api, params, contentType, noAuthorize) => {
  return await update(api, params, contentType, noAuthorize)
    .then((res) => {
      return Promise.resolve(res?.data);
    })
    .catch((err) => {
      return Promise.reject(err?.data);
    });
};

export const deleteData = async (api) => {
  return await destroy(api)
    .then((res) => {
      return Promise.resolve(res?.data);
    })
    .catch((err) => {
      return Promise.reject(err?.data);
    });
};
