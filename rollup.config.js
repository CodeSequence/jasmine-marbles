export default {
  entry: './release/es6/index.js',
  dest: './release/bundles/jasmine-marbles.umd.js',
  format: 'umd',
  moduleName: 'jasmine-marbles',
  globals: {
    'rxjs': 'Rx',
    'rxjs/testing': 'Rx',
    'lodash': '_'
  },
  external: [
    'rxjs',
    'rxjs/testing',
    'lodash'
  ],
  context: 'window'
};
