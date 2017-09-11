import React from 'react';
import Notification from 'rc-notification';
import {Icon} from 'antd';
import './message.less';
import './message.css';

let defaultDuration = 3;
let defaultTop;
let messageInstance;
let key = 1;
let prefixCls = 'jarvis-message';
let getContainer;

function getMessageInstance() {
  messageInstance = messageInstance || Notification.newInstance({
      prefixCls,
      transitionName: 'move-up',
      style: {top: defaultTop},
      getContainer,
    });
  return messageInstance;
}

function notice(content,
                duration = defaultDuration,
                type,
                onClose,) {

  let iconType = {
    info: 'info-circle',
    success: 'check-circle',
    error: 'cross-circle',
    warning: 'exclamation-circle',
    loading: 'loading'
  }[type];

  let instance = getMessageInstance();
  instance.notice({
    key: key++,
    duration,
    style: {},
    content: React.createElement(
      'div',
      {className: prefixCls + '-custom-content ' + prefixCls + '-' + type},
      React.createElement(Icon, {type: iconType}),
      React.createElement(
        'span',
        null,
        content
      )
    ),
    onClose
  });
  return (() => {
    let target = key++;
    return () => {
      instance.removeNotice(target);
    };
  });
}

export default {
  info(content, duration, onClose) {
    return notice(content, duration, 'info', onClose)
  },
  success(content, duration, onClose) {
    return notice(content, duration, 'success', onClose);
  },
  error(content, duration, onClose) {
    return notice(content, duration, 'error', onClose);
  },
  warn(content, duration, onClose) {
    return notice(content, duration, 'warning', onClose);
  },
  warning(content, duration, onClose) {
    return notice(content, duration, 'warning', onClose);
  },
  loading(content, duration, onClose) {
    return notice(content, duration, 'loading', onClose);
  },
  config(options) {
    if (options.top !== undefined) {
      defaultTop = options.top;
      messageInstance = null;
    }
    if (options.duration !== undefined) {
      defaultDuration = options.duration;
    }
    if (options.prefixCls !== undefined) {
      prefixCls = options.prefixCls;
    }
    if (options.getContainer !== undefined) {
      getContainer = options.getContainer;
    }
  },
  destroy() {
    if (messageInstance) {
      messageInstance.destroy();
      messageInstance = null;
    }
  }
};
