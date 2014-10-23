/*!
 * postcss-filter-declarations | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/postcss-filter-declarations
*/

'use strict';

module.exports = function filterDeclarations(options) {
  options = options || {};

  if (options.properties) {
    options.props = options.properties;
  }

  if (!Array.isArray(options.props)) {
    options.props = [options.props];
  }

  options.exclude = !!options.exclude;

  return function(style) {
    style.eachRule(function(rule) {
      var removeIndex = [];

      rule.decls.forEach(function(decl, index) {
        if (options.exclude !== (options.props.indexOf(decl.prop) === -1)) {
          removeIndex.push(index);
        }
      });

      removeIndex.forEach(function(index) {
        rule.remove(rule.decls[index]);
      });
    });
  };
};
