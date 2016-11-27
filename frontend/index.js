import Backbone from 'backbone';
import 'bootstrap';
import mainView from './views/layout';
import initRoutes from './helpers/initRoutes';

mainView.render();
initRoutes();
Backbone.history.start();
