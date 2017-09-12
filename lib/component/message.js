import React from 'react';
import styled from 'styled-components';
import Notification from 'rc-notification';
import {Icon} from 'antd';

let defaultDuration = 3;
let defaultTop = '16px';
let messageInstance;
let key = 1;
let prefixCls = 'jarvis-message';
let getContainer;

const Wrapper = styled.div`
  padding: 8px 16px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  background: #fff;
  display: inline-block;
  pointer-events: all;
  
  .anticon {
		margin-right: 8px;
    font-size: 15px;
    top: 1px;
    position: relative;
	}
	
	.jarvis-message-success .anticon {
    color: #00a854;
  }

  .jarvis-message-error .anticon {
    color: #f04134;
  }

  .jarvis-message-warning .anticon {
    color: #ffbf00;
  }

  .jarvis-message-info .anticon, .jarvis-message-loading .anticon {
    color: #108ee9;
  }
`;

function getMessageInstance() {
  messageInstance = messageInstance || Notification.newInstance({
      prefixCls,
      transitionName: 'move-up',
      style: {
        top: defaultTop,
        position: 'fixed',
        fontSize: '13px',
        zIndex: 1010,
        width: '100%',
        left: 0,
        pointerEvents: 'none'
      },
      getContainer
    });
  return messageInstance;
}

function notice(content,
                duration = defaultDuration,
                type,
                onClose) {

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
    style: {
      textAlign: 'center',
      marginBottom: '8px'
    },
    content: React.createElement(
      Wrapper,
      {className: prefixCls + '-custom-content'},
      React.createElement(
        'div',
        {className: prefixCls + '-' + type},
        React.createElement(Icon, {type: iconType}),
        React.createElement('span', null, content)
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
