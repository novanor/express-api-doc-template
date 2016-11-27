import Marionette from 'backbone.marionette';
import {render as template} from 'templates/routesItem.twig';
import _ from 'lodash';

const RoutesItem = Marionette.View.extend({
  template,

  tagName: 'tr',
  serializeData() {
    return {
      url: this.model.get('url'),

      examplesPresent: this.model.get('examplesPresent'),
      model:           this.model,
      methods:         _.map(this.model.get('methods'), (method, key) => _.upperCase(key)),
    };
  },
});

export default RoutesItem;
