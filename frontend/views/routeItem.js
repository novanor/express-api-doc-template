import Marionette from 'backbone.marionette';
import {render as template} from 'templates/routesItem.twig';

const RoutesItem = Marionette.View.extend({
  template,

  tagName: 'tr',
  serializeData() {
    return {
      url: this.model.get('url'),

      examplesPresent: this.model.get('examplesPresent'),
      model:           this.model,
      method:          this.model.get('method').toUpperCase(),
    };
  },
});

export default RoutesItem;
