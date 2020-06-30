module.exports = {
  'env': {
    'browser': true,
    'es6': true,
  },
  'extends': [
    'google',
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parserOptions': {
    'ecmaVersion': 11,
    'sourceType': 'module',
  },
  'rules': {
    'max-len': 0,
    'no-var': 0,
    'new-cap': 0,
    'no-invalid-this': 0, // PublicLab.TagsModule
    'require-jsdoc': 0, // PublicLab.TitleModule.Related.js
    'guard-for-in': 0, // PublicLAb.Editor.js
    'no-unused-vars': 0,
  },
};
