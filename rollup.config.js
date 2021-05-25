export default {
  input: './release/es6/index.js',
  output:  {
    file:   './release/bundles/jasmine-marbles.umd.js',
    name:  'jasmine-marbles',
    format: 'umd',
    globals: {
      'rxjs': 'Rx',
      'rxjs/testing': 'Rx',
      'lodash': '_'
    },
  }, 
  external: [
    'rxjs',
    'rxjs/testing',
    'lodash'
  ],
  context: 'window'
};
