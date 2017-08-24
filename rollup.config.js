export default {
  entry: './release/es6/index.js',
  dest: './release/bundles/jasmine-marbles.umd.js',
  format: 'umd',
  moduleName: 'jasmine-marbles',
  globals: {
    'rxjs/Observable': 'Rx',
    'rxjs/Scheduler': 'Rx',
    'rxjs/testing/TestScheduler': 'Rx',
    'lodash': '_'
  },
  external: [
    'rxjs/Observable',
    'rxjs/Scheduler',
    'rxjs/testing/TestScheduler',
    'lodash'
  ],
  context: 'window'
};
