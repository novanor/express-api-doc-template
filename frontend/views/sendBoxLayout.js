import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import showdown from 'showdown';
import {render as template} from 'templates/sendBoxLayout.twig';
// import SendBoxView from './sendBox';
import RouteDescriptionView from './routeDescription';
import ExamplesView from './examples';
import KeyValueDescriptionView from './keyValueDescription';

const markdownConverter = new showdown.Converter();

function paramObjectToParamArray(obj) {
  const arr = [];

  Object.keys(obj).forEach((key) => arr.push({
    name: key,
    value: markdownConverter.makeHtml(obj[key]),
  }));

  return arr;
}

function destructureMeta(meta) {
  let description = '';
  let headerParams = [];
  let bodyParams = [];
  let notes = [];

  if (meta.description) {
    description = markdownConverter.makeHtml(meta.description);
  }

  if (meta.headerParams) {
    headerParams = paramObjectToParamArray(meta.headerParams);
  }

  if (meta.bodyParams) {
    bodyParams = paramObjectToParamArray(meta.bodyParams);
  }

  if (meta.notes) {
    notes = paramObjectToParamArray(meta.notes);
  }

  return {
    description,
    headerParams,
    bodyParams,
    notes,
  };
}

const sendBoxLayout = Marionette.View.extend({
  template,

  regions: {
    description: '#routeDescription',
    headerParams: '#headerParams',
    bodyParams: '#bodyParams',
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
      headerParams,
      bodyParams,
      notes,
    } = destructureMeta(this.model.get('meta'));

    this.showChildView('description', new RouteDescriptionView({
      model: description,
    }));

    if (headerParams.length) {
      this.showChildView('headerParams', new KeyValueDescriptionView({
        model: {
          sectionTitle: 'Header Params',
          data: headerParams,
        },
      }));
    }

    if (bodyParams.length) {
      this.showChildView('bodyParams', new KeyValueDescriptionView({
        model: {
          sectionTitle: 'Body Params',
          data: bodyParams,
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
