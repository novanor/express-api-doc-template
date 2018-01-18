import Marionette from 'backbone.marionette';
import {render as template} from 'templates/routeDescription.twig';

const SendBox = Marionette.View.extend({
  template,

  serializeData() {
    const routeMeta = this.model.get('meta');
    const routeDescription = routeMeta.description ? routeMeta.description : '';
    delete routeMeta.description;

    return {
      path: this.model.get('path'),
      model: this.model,
      method: this.model.get('method').toUpperCase(),
      lastExampleRequest: JSON.stringify(this.model.get('lastExampleRequest'), null, 2),
      meta: Object.keys(routeMeta).length ? JSON.stringify(routeMeta, null, 2) : null,
      routeDescription,
    };
  },
});

export default SendBox;
