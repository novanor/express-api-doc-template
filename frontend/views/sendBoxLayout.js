import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import {render as template} from 'templates/sendBoxLayout.twig';
import SendBoxView from './sendBox';
import ExamplesView from './examples';

const sendBoxLayout = Marionette.View.extend({
  template,

  regions: {
    sendBox:  '.sendBox',
    examples: '.examples',
  },
  onAttach() {
    const sendBoxView = new SendBoxView({
      model: this.model,
    });
    this.showChildView('sendBox', sendBoxView);
    const examples = new Backbone.Collection(this.options.examples);
    const examplesView = new ExamplesView({
      collection: examples,
    });
    this.showChildView('examples', examplesView);
  },
});

export default sendBoxLayout;
