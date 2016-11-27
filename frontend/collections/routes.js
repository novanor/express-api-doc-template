import Backbone from 'backbone';
import RouteModel from '../models/route';

const RouteCollection = Backbone.Collection.extend({
  model: RouteModel,
});

export default new RouteCollection(routes);
