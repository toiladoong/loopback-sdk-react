import generateServices from './lib/generateServices';
import config from './lib/config';
import request from './lib/request';
import PropTypes from './lib/types';
import message from './lib/component/message';
import Auth from './lib/model/Auth';

const model = {
  Auth
};

export {
  generateServices,
  config,
  request,
  PropTypes,
  message,
  model
}
