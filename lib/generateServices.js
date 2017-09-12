import Validator from 'validatorjs'
import request from './request'
import config from './config'
import message from './component/message'

const lang = config.get('lang');

if (lang) {
  Validator.useLang(lang);
} else {
  Validator.useLang('vi');
}

const buildMethod = (moduleName) => {
  let method;
  if (
    moduleName === 'login' ||
    moduleName === 'logout' ||
    moduleName === 'create' ||
    moduleName === 'deleteById'
  ) {
    method = 'POST'
  } else if (
    moduleName === 'update'
  ) {
    method = 'PATCH'
  } else {
    method = 'GET'
  }
  return method;
};

const makeCall = (modelName, moduleName, params, data) => {
  const {
    url,
    method = buildMethod(moduleName)
  } = params;

  const modelSchema = params.data || {};
  let apiUrl = modelName + url;
  const token = config.get('access_token') || '';

  if (method.toLowerCase() !== 'get') {
    const validation = new Validator(data, modelSchema);
    if (validation.fails()) {
      // let err = validation.errors.all();
      Object.keys(modelSchema).map((key) => {
        if (validation.errors.first(key)) {
          // console.log(validation.errors.first(key));
          message.warning(validation.errors.first(key));
        }
      });

      return null;
    }

    if (token) {
      apiUrl += `?access_token=${token}`
    }

    if (validation.passes()) {
      return request({
        url: apiUrl,
        method,
        data
      })
    }
  } else {
    if (token) {
      data.access_token = token;
    }

    return request({
      url: apiUrl,
      method,
      data
    })
  }
};

export default function Services(modelName, actions) {

  const controller = {};

  for (let moduleName in actions) {
    controller[moduleName] = makeCall.bind(this, modelName, moduleName, actions[moduleName]);
  }

  return controller;
};
