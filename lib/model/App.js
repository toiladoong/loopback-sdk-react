import generateServices from '../generateServices';
import PropTypes from '../types';

const Model = new generateServices(
  "app",
  {
    find: {
      url: '/',
      data: {
        filter: {
          limit: 10
        }
      }
    },
    findOne: {
      url: '/',
      data: {
        filter: {
          where: {
            name: ''
          }
        }
      }
    },
    findById: {
      url: ':id',
      data: {
        id: ''
      }
    },
    create: {
      url: '/',
      data: {
        title: PropTypes.String,
        description: PropTypes.String,
        view: PropTypes.Number,
        day: PropTypes.Date,
        status: PropTypes.Boolean
      }
    },
    update: {
      url: '/',
      data: {}
    },
    deleteById: {
      url: ':id',
      data: {
        id: ''
      }
    },
    count: {
      url: '/count',
      data: {
        filter: {
          limit: 10
        }
      }
    },
  }
);

module.exports = Model;
