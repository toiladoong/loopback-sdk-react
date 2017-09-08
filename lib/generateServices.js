import Validator from 'validatorjs'
import request from './request'
import config from './config'
import message from './component/message'

const baseUrl = '';
const modelName = '';
const actions = {};

const lang = config.get('lang');

if (lang) {
  Validator.useLang(lang);
} else {
  Validator.useLang('vi');
}

const Services = (modelName, actions) => {

  const controller = {};

  for (let name in actions) {
    controller[name] = makeCall.bind(this, modelName, name, actions[name]);
  }

  return {
    ...controller
  }
};

const makeCall = (modelName, action, params, postData) => {
  const {url, method} = params;

  if (method.toLowerCase() !== 'get') {
    const rules = params.data;
    const validation = new Validator(postData, rules);

    if (validation.fails()) {
      // let err = validation.errors.all();
      Object.keys(rules).map((key) => {
        if (validation.errors.first(key)) {
          console.log(validation.errors.first(key));
          message.warning(validation.errors.first(key));
        }
      });

      return null;
    }

    if (validation.passes()) {
      return request({
        url: modelName + url,
        method,
        data: postData
      })
    }
  } else {
    return request({
      url: modelName + url,
      method,
      data: postData
    })
  }
};

module.exports = Services;
