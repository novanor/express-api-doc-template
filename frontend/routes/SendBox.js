import _ from 'lodash';
import Backbone from 'backbone';
import mainView from '../views/layout';
import allExamples from '../helpers/examples';
import SendBoxLayout from '../views/sendBoxLayout';
import routesCollection from '../collections/routes';

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
    const sendBoxLayout = new SendBoxLayout({
      examples,
      model,
    });
    mainView.showChildView('mainContainer', sendBoxLayout);
  },
});

export default SendBoxRouter;
