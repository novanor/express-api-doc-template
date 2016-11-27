import {render as template} from 'templates/routesList.twig';
import _ from 'lodash';
import Marionette from 'backbone.marionette';
import RoutesItem from './routeItem';
import routes from '../collections/routes';

const RoutesList = Marionette.CompositeView.extend({
  template,

  childView:          RoutesItem,
  childViewContainer: '.dt-routes-container',
  ui:                 {
    filter: '.dt-filter',
  },
  events:             {
    'keyup @ui.filter': 'filterRoutes',
  },
  filterRoutes(e) {
    this.collection.reset(
      routes.filter((model) =>
        _.includes(
          _.lowerCase(model.get('url')),
          _.lowerCase(this.$(e.currentTarget).val())
        )
      )
    );
  },
});

export default RoutesList;
