import _ from 'lodash';

class Config {
  constructor() {
    this.config = {};
  }

  get(key) {
    return this.config[key];
  }

  set(key, value) {
    if (typeof key === 'object') {
      _.assign(this.config, key);
    } else {
      this.config[key] = value;
    }
  }
}

export default new Config();
