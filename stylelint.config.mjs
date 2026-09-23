/** @type {import('stylelint').Config} */
const config = {
  extends: ['stylelint-config-standard'],
  ignoreFiles: ['.next/**', 'node_modules/**'],
  rules: {
    // CSS Modules class names are camelCase and consumed as `styles.className`.
    'selector-class-pattern': ['^[a-z][a-zA-Z0-9]*$', { message: 'Use camelCase class names (CSS Modules).' }],
    'keyframes-name-pattern': ['^[a-z][a-z0-9-]*$'],
    'custom-property-pattern': ['^[a-z][a-z0-9-]*$'],
    'declaration-no-important': true,
    'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['global', 'local'] }],
    // Keep classic (max-width) media queries for the widest browser support.
    'media-feature-range-notation': null,
    'no-descending-specificity': null,
  },
};

export default config;
