import Backbone from 'backbone';

const RouteModel = Backbone.Model.extend({
  initialize() {
    this.set('url', this.get('path'));
  },
});

export default RouteModel;
