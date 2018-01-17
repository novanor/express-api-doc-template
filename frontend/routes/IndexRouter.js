import Backbone from 'backbone';
import routeCollection from '../collections/routes';
import config from '../helpers/config';
import mainView from '../views/layout';
import RoutesLayout from '../views/routesLayout';
import TitleLayout from '../views/titleLayout';

const IndexRouter = Backbone.Router.extend({
  routes: {
    '': 'showRoutesAction',
  },
  showRoutesAction() {
    const routesLayout = new RoutesLayout({
      collection: routeCollection.clone(),
    });

    const titleLayout = new TitleLayout({
      title: config.meta.title,
      description: config.meta.description,
    });

    mainView.showChildView('title', titleLayout);
    mainView.showChildView('mainContainer', routesLayout);
  },
});

export default IndexRouter;
