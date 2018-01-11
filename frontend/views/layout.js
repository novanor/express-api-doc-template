import Marionette from 'backbone.marionette';
import {render as template} from 'templates/layout.twig';

const Layout = Marionette.View.extend({
  template,

  el:      '.container',
  regions: {
    title: '#title',
    description: '#description',
    mainContainer: '#mainContainer',
  },
});

export default new Layout();
