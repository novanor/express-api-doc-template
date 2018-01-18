import Marionette from 'backbone.marionette';
import {render as template} from 'templates/example.twig';

const ExampleItem = Marionette.View.extend({
  template,

  ui: {
    item: '.dt-example-item',
    example: '.dt-example-content',
  },

  events: {
    'click @ui.item': 'showExample',
  },

  showExample() {
    this.ui.example.slideToggle();
  },

  serializeData() {
    return {
      model: this.model,
      url: this.model.get('url'),
      status: this.model.get('status'),
      type: this.model.get('type'),
      method: this.model.get('method'),
      requestHeaders: JSON.stringify(this.model.get('request').headers, null, 2),
      requestBody: JSON.stringify(this.model.get('request').body, null, 2),
      responseHeaders: JSON.stringify(this.model.get('response').headers, null, 2),
      responseBody: JSON.stringify(this.model.get('response').body, null, 2),
    };
  },
});

export default ExampleItem;
