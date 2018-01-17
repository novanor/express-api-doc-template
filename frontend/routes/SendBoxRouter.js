import _ from 'lodash';
import Backbone from 'backbone';
import mainView from '../views/layout';
import allExamples from '../helpers/examples';
import routesCollection from '../collections/routes';
import SendBoxLayout from '../views/sendBoxLayout';
import TitleLayout from '../views/titleLayout';
import DescriptionLayout from '../views/descriptionLayout';
import config from '../helpers/config';

const SendBoxRouter = Backbone.Router.extend({
  routes: {
    'sendBox/:id': 'showSendBoxAction',
  },
  showSendBoxAction(id) {
    const model = routesCollection.findWhere({id});
    const exampleForRoute = model.get('examplesPresent')
      ? _.find(allExamples, (e) => e.routeId === id)
      : null;
    const examples = exampleForRoute ? exampleForRoute.rows : [];
    model.set('lastExampleRequest', examples.length ? examples[examples.length - 1].request : {});

    const sendBoxLayout = new SendBoxLayout({
      examples,
      model,
    });

    const titleLayout = new TitleLayout({
      title: config.meta.title,
    });

    const descriptionLayout = new DescriptionLayout({
      description: config.meta.description,
    });

    mainView.showChildView('title', titleLayout);
    mainView.showChildView('description', descriptionLayout);
    mainView.showChildView('mainContainer', sendBoxLayout);
  },
});

export default SendBoxRouter;
