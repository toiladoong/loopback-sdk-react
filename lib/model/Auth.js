import generateServices from '../generateServices';
import PropTypes from '../types';

const Model = new generateServices(
  "admin",
  {
    login: {
      url: '/login',
      data: {
        username: PropTypes.Array,
        password: PropTypes.String
      }
    },
    logout: {
      url: '/logout'
    }
  }
);

module.exports = Model;
