import Marionette from 'backbone.marionette';
import {render as template} from 'templates/routesLayout.twig';
import RoutesList from './routesList';

const listingLayout = Marionette.View.extend({
  template,

  onAttach() {
    const routesList = new RoutesList({
      collection: this.options.collection,
    });
    this.showChildView('listing', routesList);
  },
  regions: {
    listing: '.listing',
  },
});

export default listingLayout;
