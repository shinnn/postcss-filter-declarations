# postcss-filter-declarations

[![npm version](https://img.shields.io/npm/v/postcss-filter-declarations.svg)](https://www.npmjs.com/package/postcss-filter-declarations)
[![Build Status](https://travis-ci.com/shinnn/postcss-filter-declarations.svg?branch=master)](https://travis-ci.com/shinnn/postcss-filter-declarations)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/postcss-filter-declarations.svg)](https://coveralls.io/github/shinnn/postcss-filter-declarations)

A [PostCSS](https://github.com/postcss/postcss) plugin to filter declarations by property names

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

[Use](https://docs.npmjs.com/cli/install) [npm](https://docs.npmjs.com/about-npm/).

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

#### options.properties

(alias: **options.props**)

Type: `Stirng` or `Array` of `String`  
Default: `[]`

Removes all [CSS declarations](https://github.com/postcss/postcss/blob/master/API.md#declaration-node) except for the proerties specified by this option.

```javascript
postcss()
  .use(filterDeclarations({
    props: 'color'
  }))
  .process('a {color: red;} b {background: blue;}')
  .css; //=> 'a {color: red;} b {}'
```

#### options.exclude

Type: `Boolean`  
Defult: `false`

`true` inverts the filtering result.

```javascript
postcss()
  .use(filterDeclarations({
    props: 'color',
    exclude: true
  }))
  .process('a {color: red;} b {background: blue;}')
  .css; //=> 'a {} b {background: blue;}'
```

## License

Copyright (c) 2014 - 2019 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT License](./LICENSE).
