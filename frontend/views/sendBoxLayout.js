import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import {render as template} from 'templates/sendBoxLayout.twig';
// import SendBoxView from './sendBox';
import RouteDescriptionView from './routeDescription';
import ExamplesView from './examples';
import KeyValueDescriptionView from './keyValueDescription';

function paramObjectToParamArray(obj) {
  const arr = [];

  Object.keys(obj).forEach((key) => arr.push({
    name: key,
    value: obj[key],
  }));

  return arr;
}

function destructureMeta(meta) {
  let description = '';
  let reqParams = [];
  let resParams = [];
  let notes = [];

  if (meta.description) {
    description = meta.description;
  }

  if (meta.requestParams) {
    reqParams = paramObjectToParamArray(meta.requestParams);
  }

  if (meta.responseParams) {
    resParams = paramObjectToParamArray(meta.responseParams);
  }

  if (meta.notes) {
    notes = paramObjectToParamArray(meta.notes);
  }

  return {
    description,
    reqParams,
    resParams,
    notes,
  };
}

const sendBoxLayout = Marionette.View.extend({
  template,

  regions: {
    description: '#routeDescription',
    requestParams: '#requestParams',
    responseParams: '#responseParams',
    notes: '#notes',
    // sendBox: '#sendBox',
    examples: '#examples',
  },
  onAttach() {
    // const sendBoxView = new SendBoxView({
    //   model: this.model,
    // });
    // this.showChildView('sendBox', sendBoxView);

    const {
      description,
      reqParams,
      resParams,
      notes,
    } = destructureMeta(this.model.get('meta'));

    this.showChildView('description', new RouteDescriptionView({
      model: description,
    }));

    if (reqParams.length) {
      this.showChildView('requestParams', new KeyValueDescriptionView({
        model: {
          sectionTitle: 'Request Params',
          data: reqParams,
        },
      }));
    }

    if (resParams.length) {
      this.showChildView('responseParams', new KeyValueDescriptionView({
        model: {
          sectionTitle: 'Response Params',
          data: resParams,
        },
      }));
    }

    if (notes.length) {
      this.showChildView('notes', new KeyValueDescriptionView({
        model: {
          sectionTitle: 'Notes',
          data: notes,
        },
      }));
    }

    this.showChildView('examples', new ExamplesView({
      collection: new Backbone.Collection(this.options.examples),
    }));
  },
});

export default sendBoxLayout;
