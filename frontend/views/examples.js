import 'bootstrap';
import Marionette from 'backbone.marionette';
import ExampleItem from './example';

const ExamplesView = Marionette.CollectionView.extend({
  childView: ExampleItem,
});

export default ExamplesView;
