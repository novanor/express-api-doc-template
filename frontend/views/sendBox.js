import Marionette from 'backbone.marionette';
import {render as template} from 'templates/sendBox.twig';
import _ from 'lodash';
import $ from 'jquery';
import options from '../helpers/config';
import Messenger from '../helpers/Messenger';

const FAIL_STATUS_RANGE = 400;
const SendBox = Marionette.View.extend({
  template,

  initialize() {
    this.messenger = new Messenger();
  },
  ui: {
    url: '.dt-url',
    method: '.dt-method',
    input: '.dt-input',
    output: '.dt-output',
    outputStatus: '.dt-status',
  },

  tellStatus(jqXHR) {
    if (jqXHR.status && jqXHR.status >= FAIL_STATUS_RANGE) {
      this.messenger.fail(jqXHR.status);
    } else if (jqXHR.status && jqXHR.status < FAIL_STATUS_RANGE) {
      this.messenger.success(jqXHR.status);
    }
    if (!jqXHR.status) {
      console.error('no status in response'); // eslint-disable-line no-console
    }
  },

  events: {
    'click .dt-send': 'send',
  },

  send() {
    let data = this.ui.input.val();
    let validData = true;
    try {
      data = JSON.stringify(JSON.parse(data));
    } catch (err) {
      validData = false;
    }
    if (!validData) {
      this.messenger.fail('incorrect JSON');
      return;
    }
    const self = this;
    $.ajax({
      data,

      contentType: 'application/json',
      url: this.ui.url.val(),
      method: this.$('.dt-method:checked').val(),
      success(response, textStatus, jqXHR) {
        let result;
        try {
          result = JSON.stringify(response, null, 2);
        } catch (err) {
          result = response;
        }
        self.ui.output.text(result);
        self.tellStatus(jqXHR);
        self.ui.outputStatus.text(jqXHR.status);
      },
      error(jqXHR) {
        let result;
        try {
          result = JSON.stringify(JSON.parse(jqXHR.responseText), null, 2);
        } catch (err) {
          result = jqXHR.responseText;
        }
        self.tellStatus(jqXHR);
        self.ui.output.text(result);
        self.ui.outputStatus.text(jqXHR.status);
      },
    });
  },

  serializeData() {
    const prefix = `${options.baseUrl || ''}`;
    const postfix = `${this.model.get('prefix')}${this.model.get('path')}`.replace(/\/\//, '/');
    let path = `${prefix}${postfix}`;
    if (_.last(prefix) === '/' && _.first(postfix) === '/') {
      path = `${prefix}${postfix.slice(1)}`;
    } else if (_.last(prefix) !== '/' && _.first(postfix) !== '/') {
      path = `${prefix}/${postfix}`;
    }

    return {
      path,
      model: this.model,
      method: this.model.get('method').toUpperCase(),
      lastExampleRequest: JSON.stringify(this.model.get('lastExampleRequest'), null, 2),
    };
  },
});

export default SendBox;
