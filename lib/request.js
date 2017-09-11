import axios from 'axios'
import qs from 'qs'
import _ from 'lodash'
import config from './config'

axios.defaults.baseURL = config.get('baseUrl');

if (!axios.defaults.baseURL) {
  setTimeout(() => {
    axios.defaults.baseURL = config.get('baseUrl');
  });
}

const fetch = (options) => {
  let {
    method = 'get',
    data,
    url
  } = options;

  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(`${url}${!_.isEmpty(data) ? `?${qs.stringify(data)}` : ''}`);
    case 'delete':
      return axios.delete(url, {data});
    case 'head':
      return axios.head(url, data);
    case 'post':
      return axios.post(url, data);
    case 'put':
      return axios.put(url, data);
    case 'patch':
      return axios.patch(url, data);
    default:
      return axios(options)
  }
};

export default function request(options) {
  return fetch(options).then((response) => {
    const {statusText, status} = response;
    let data = response.data;
    data.success = true;
    data.message = statusText;
    data.status = status;
    return data;
  }).catch((error) => {
    const {response} = error;
    let message;
    let status;
    if (response) {
      status = response.status;
      const {data, statusText} = response;
      message = data.message || statusText
    } else {
      status = 600;
      message = 'Đã có lỗi xảy ra!'
    }
    return {
      success: false,
      status,
      message
    }
  })
}
