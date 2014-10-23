'use strict';

var postcss = require('postcss');
var filterDeclarations = require('./');
var test = require('tape');

var fixture = [
  'a {',
  '  display: none;',
  '  border: 1px solid #000;',
  '}',
  '@media screen {',
  '  b:after {',
  '    content: "b";',
  '  }',
  '  @media (min-width: 300px) {',
  '    p q {',
  '      display: block;',
  '    }',
  '  }',
  '}'
].join('\n');

var includeDisplay = [
  'a {',
  '  display: none;',
  '}',
  '@media screen {',
  '  b:after {',
  '  }',
  '  @media (min-width: 300px) {',
  '    p q {',
  '      display: block;',
  '    }',
  '  }',
  '}'
].join('\n');

var includeBorderAndContent = [
  'a {',
  '  border: 1px solid #000;',
  '}',
  '@media screen {',
  '  b:after {',
  '    content: "b";',
  '  }',
  '  @media (min-width: 300px) {',
  '    p q {',
  '    }',
  '  }',
  '}'
].join('\n');

var includeNothing = [
  'a {',
  '}',
  '@media screen {',
  '  b:after {',
  '  }',
  '  @media (min-width: 300px) {',
  '    p q {',
  '    }',
  '  }',
  '}'
].join('\n');

test('filterDeclarations()', function(t) {
  t.plan(6);

  t.equal(
    postcss().use(filterDeclarations({props: 'display'})).process(fixture).css, includeDisplay,
    'should select the rules based on the property name.'
  );

  t.equal(
    postcss().use(filterDeclarations({properties: 'display'})).process(fixture).css,
    includeDisplay,
    'should use `properties` option as an alias of `props` option.'
  );

  t.equal(
    postcss().use(filterDeclarations({props: ['border', 'content']})).process(fixture).css,
    includeBorderAndContent,
    'should select the rules based on an array of the property names.'
  );

  t.equal(
    postcss().use(filterDeclarations({
      props: 'display',
      exclude: true
    })).process(fixture).css,
    includeBorderAndContent,
    'should exclude the rules based on the property name, using `exclude` option.'
  );

  t.equal(
    postcss().use(filterDeclarations({
      props: ['border', 'content'],
      exclude: true
    })).process(fixture).css,
    includeDisplay,
    'should exclude the rules based on an array of the property names, using `exclude` option.'
  );

  t.equal(
    postcss().use(filterDeclarations()).process(fixture).css, includeNothing,
    'should exclude all properties when it takes no arguments.'
  );
});
