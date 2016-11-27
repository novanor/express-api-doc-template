(function () {
  // eslint-disable-next-line import/no-amd
  require.config({
    baseUrl:     '',
    waitSeconds: 30,
    paths:       {},
    shim:        {
      'backbone.chromestorage': {
        deps: ['backbone'],
      },
    },
    // map:         {
    //  '*':                  {
    //    twig: 'config/twig',
    //  },
    //  'helpers/twigMixins': {
    //    twig: 'twig',
    //  },
    // },
  });
})();
