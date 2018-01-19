import Marionette from 'backbone.marionette';
import {render as template} from 'templates/routeDescription.twig';

const SendBox = Marionette.View.extend({
  template,

  serializeData() {
    return {
      description: this.model,
    };
  },
});

export default SendBox;
