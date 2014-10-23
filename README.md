# postcss-filter-declarations

[![NPM version](https://badge.fury.io/js/postcss-filter-declarations.svg)](https://www.npmjs.org/package/postcss-filter-declarations)
[![Build Status](https://travis-ci.org/shinnn/postcss-filter-declarations.svg?branch=master)](https://travis-ci.org/shinnn/postcss-filter-declarations)
[![Build status](https://ci.appveyor.com/api/projects/status/bi4pflltlq5368ym?svg=true)](https://ci.appveyor.com/project/ShinnosukeWatanabe/postcss-filter-declarations)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/postcss-filter-declarations.svg)](https://coveralls.io/r/shinnn/postcss-filter-declarations)
[![devDependency Status](https://david-dm.org/shinnn/postcss-filter-declarations/dev-status.svg)](https://david-dm.org/shinnn/postcss-filter-declarations#info=devDependencies)

[PostCSS](https://github.com/postcss/postcss) plugin to filter declarations by property names

```javascript
var fs = require('fs');

var postcss = require('postcss');
var filterDeclarations = require('postcss-filter-declarations');

postcss()
  .use(filterDeclarations({props: ['display', 'color']}))
  .process(fs.readFileSync('path/to/css/file'))
  .css;
```

```css
.menubar {
  display: block;
  position: fixed;
  color: gray;
}

@media print {
  h1 {
    font-size: 16px;
  }

  a {
    color: blue;
  }
}
```

↓

```css
.menubar {
  display: block;
  color: gray;
}
@media print {
  h1 {
  }

  a {
    color: blue;
  }
}
```

## Installation

[Use npm](https://www.npmjs.org/doc/cli/npm-install.html).

```
npm install postcss-filter-declarations
```

## API

```javascript
var filterDeclarations = require('postcss-filter-declarations');
```

### filterDeclarations([options])

*options*: `Object`  
Return: `Function`

#### options.props

(alias: **options.properties**)

Type: `Stirng` or `Array` of `String`  
Default: `[]`

Removes all [CSS declarations](https://github.com/postcss/postcss#declaration-node) except for the proerties specified by this option.

```javascript
postcss()
  .use(filterDeclarations({
    pops: 'color'
  }))
  .process('a {color: red;} b {background: blue;}')
  .css //=> 'a {color: red;} b {}'
```

#### options.exclude

Type: `Boolean`  
Defult: `false`

Inverts the filtering result.

```javascript
postcss()
  .use(filterDeclarations({
    pops: 'color',
    exclude: true
  }))
  .process('a {color: red;} b {background: blue;}')
  .css //=> 'a {} b {background: blue;}'
```

## License

Copyright (c) 2014 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT License](./LICENSE).
