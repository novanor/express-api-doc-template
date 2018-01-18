import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import {render as template} from 'templates/sendBoxLayout.twig';
// import SendBoxView from './sendBox';
import RouteDescriptionView from './routeDescription';
import ExamplesView from './examples';

const sendBoxLayout = Marionette.View.extend({
  template,

  regions: {
    description: '.routeDescription',
    sendBox: '.sendBox',
    examples: '.examples',
  },
  onAttach() {
    // const sendBoxView = new SendBoxView({
    //   model: this.model,
    // });
    // this.showChildView('sendBox', sendBoxView);

    const routeDescriptionView = new RouteDescriptionView({
      model: this.model,
    });
    this.showChildView('description', routeDescriptionView);

    const examples = new Backbone.Collection(this.options.examples);
    const examplesView = new ExamplesView({
      collection: examples,
    });
    this.showChildView('examples', examplesView);
  },
});

export default sendBoxLayout;
