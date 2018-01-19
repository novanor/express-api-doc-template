import Marionette from 'backbone.marionette';
import {render as template} from 'templates/keyValueDescription.twig';

const KeyValueDescriptionView = Marionette.View.extend({
  template,

  serializeData() {
    return {
      sectionTitle: this.model.sectionTitle,
      keyValuePairs: this.model.data,
    };
  },
});

export default KeyValueDescriptionView;
