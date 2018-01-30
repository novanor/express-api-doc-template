import Marionette from 'backbone.marionette';
import {render as template} from 'templates/titleLayout.twig';
import showdown from 'showdown';

const titleLayout = Marionette.View.extend({
  template,

  serializeData() {
    return {
      title: this.options.title,
      description: new showdown.Converter().makeHtml(this.options.description),
    };
  },
});

export default titleLayout;
