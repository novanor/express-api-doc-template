import Marionette from 'backbone.marionette';
import {render as template} from 'templates/descriptionLayout.twig';

const descriptionLayout = Marionette.View.extend({
  template,

  serializeData() {
    return {
      description: this.options.description,
    };
  },
});

export default descriptionLayout;
