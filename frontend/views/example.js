import Marionette from 'backbone.marionette';
import {render as template} from 'templates/example.twig';

const ExampleItem = Marionette.View.extend({
  template,

  ui: {
    item:    '.dt-example-item',
    example: '.dt-example-content',
  },

  events: {
    'click @ui.item': 'showExample',
  },

  showExample() {
    this.ui.example.slideToggle();
  },

  serializeData() { // type "application/json"
    const request = JSON.stringify(JSON.parse(decodeURI(this.model.get('request'))), null, 2);
    const model = this.model;
    const decodedResponce = decodeURI(this.model.get('response'));
    let response;
    try {
      response = JSON.stringify(JSON.parse(decodedResponce), null, 2);
    } catch (err) {
      const tagsToReplace = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
      };
      response = decodedResponce.replace(/[&<>]/g, (tag) =>
        tagsToReplace[tag] || tag
      );
    }
    const method = model.get('method');
    const status = model.get('status');
    const url = model.get('url');
    const type = model.get('type');
    return {
      model,
      url,
      status,
      type,
      method,
      response,
      request,
    };
  },
});

export default ExampleItem;
