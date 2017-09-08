import generateServices from '../generateServices';
import PropTypes from '../types';

const Model = generateServices(
  "admin",
  {
    login: {
      url: '/login',
      method: 'POST',
      data: {
        username: PropTypes.String,
        password: PropTypes.String
      }
    },
    logout: {
      url: '/logout',
      method: 'POST'
    }
  }
);

module.exports = Model;
