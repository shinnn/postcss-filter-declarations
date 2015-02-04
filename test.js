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

test('postcssFilterDeclarations()', function(t) {
  t.plan(8);

  t.equal(filterDeclarations.name, 'postcssFilterDeclarations', 'should have a function name.');

  t.equal(
    postcss().use(filterDeclarations({properties: 'display'})).process(fixture).css,
    includeDisplay,
    'should select the rules based on the property name.'
  );

  t.equal(
    postcss().use(filterDeclarations({props: 'display'})).process(fixture).css,
    includeDisplay,
    'should use `props` option as an alias of `properties` option.'
  );

  t.equal(
    postcss().use(filterDeclarations({props: ['border', 'content']})).process(fixture).css,
    includeBorderAndContent,
    'should select the rules in response to the array of property names.'
  );

  var options = {
    props: ['border', 'content'],
    exclude: true
  };

  t.equal(
    postcss().use(filterDeclarations(options)).process(fixture).css,
    includeDisplay,
    'should exclude the rules in response to the property names, using `exclude` option.'
  );

  t.deepEqual(
    options,
    {
      props: ['border', 'content'],
      exclude: true
    },
    'should not modify the original option object.'
  );

  t.equal(
    postcss().use(filterDeclarations({properties: [{foo: 'bar'}, 123]})).process(fixture).css,
    includeNothing,
    'should ignore non-string values in the `properties` option.'
  );

  t.equal(
    postcss().use(filterDeclarations()).process(fixture).css,
    includeNothing,
    'should exclude all properties when it takes no arguments.'
  );
});
