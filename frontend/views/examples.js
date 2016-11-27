import 'bootstrap';
import Marionette from 'backbone.marionette';
import ExampleItem from './example';

const RoutesList = Marionette.CollectionView.extend({
  childView: ExampleItem,
});

export default RoutesList;
