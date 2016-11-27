import Backbone from 'backbone';
import routeCollection from '../collections/routes';
import mainView from '../views/layout';
import RoutesLayout from '../views/routesLayout';

const IndexRouter = Backbone.Router.extend({
  routes: {
    '': 'showRoutesAction',
  },
  showRoutesAction() {
    const routesLayout = new RoutesLayout({
      collection: routeCollection.clone(),
    });
    mainView.showChildView('content', routesLayout);
  },
});

export default IndexRouter;
