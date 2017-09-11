# loopback-sdk-react
Loopback SDK React

# Installation

Using npm:

```javascript
$ npm i -g npm
$ npm i --save loopback-sdk-react
```

Using yarn:

```javascript
$ npm i -g yarn
$ yarn add loopback-sdk-react
```
# Config
```javascript
import {config} from 'loopback-sdk-react';
config.set('baseUrl', 'http://localhost:1102/dev/v1');
config.set('access_token', 'xxx');
config.set('lang', 'vi');
```

# Model
App.js
```javascript
import {generateServices, PropTypes} from 'loopback-sdk-react';
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
```
# Services
```javascript
import App from '../model/App';
App.find({
filter: {
          limit: 10
        }
}).then((responsive) => {
...
}).catch(() => {
...
})
App.create({
        title: '',
        description: '',
        view: '',
        day: '',
        status: ''
      })
```
