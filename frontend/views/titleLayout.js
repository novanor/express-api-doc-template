import Marionette from 'backbone.marionette';
import {render as template} from 'templates/titleLayout.twig';

const titleLayout = Marionette.View.extend({
  template,

  serializeData() {
    return {
      title: this.options.title,
      description: this.options.description,
    };
  },
});

export default titleLayout;
