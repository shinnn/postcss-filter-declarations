/*!
 * postcss-filter-declarations | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/postcss-filter-declarations
*/
'use strict';

module.exports = function postcssFilterDeclarations(options) {
  options = options || {};

  var properties = options.properties || options.props;
  var exclude = !!options.exclude;

  if (!Array.isArray(properties)) {
    properties = [properties];
  }

  function filterDeclarations(style) {
    style.walkRules(function(rule) {
      rule.each(function(decl, index) {
        if (exclude !== (properties.indexOf(decl.prop) === -1)) {
          rule.removeChild(index);
        }
      });
    });
  }

  return filterDeclarations;
};
