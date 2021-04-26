module.exports = {
  extends: ["eslint:recommended", "prettier"],
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      modules: true,
      experimentalObjectRestSpread: true 
    }
  },
  env: {
    node: true,
    es6: true
  },
  //ecmaFeatures: {
  //  modules: true
  //},
  //globals: {
  //  __DEV__: true
  //},  
  plugins: ["prettier"],
  rules: {
    //'import/no-unassigned-import': 'off',
    'import/prefer-default-export': 'off',
    'unicorn/prefer-type-error': 'off',
    'unicorn/catch-error-name': 'off',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: false,
        bracketSpacing: false,
        printWidth: 100
      }
    ]
  }
};
