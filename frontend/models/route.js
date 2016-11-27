import Backbone from 'backbone';

const RouteModel = Backbone.Model.extend({
  initialize() {
    this.set('url', `${this.get('prefix')}${this.get('path')}`.replace(/\/\//, '/'));
  },
});

export default RouteModel;
