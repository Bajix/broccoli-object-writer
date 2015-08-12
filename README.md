# **Broccoli Object Writer**

Broccoli Object Writer is a tool for writing out JS Objects as either JSON, or as an AMD and CommonJS compatible UMD module.


[![Version npm](https://img.shields.io/npm/v/broccoli-object-writer.svg?style=flat-square)](https://www.npmjs.com/package/broccoli-object-writer)[![Support via Gratipay](https://img.shields.io/gratipay/Bajix.svg)](https://gratipay.com/Bajix)[![NPM Downloads](https://img.shields.io/npm/dm/broccoli-object-writer.svg?style=flat-square)](https://www.npmjs.com/package/broccoli-object-writer)[![Build Status](https://img.shields.io/codeship/905f8af0-2360-0133-3e00-4232491ff1b0.svg)](https://codeship.com/projects/96450)[![Dependencies](https://img.shields.io/david/Bajix/broccoli-object-writer.svg?style=flat-square)](https://david-dm.org/Bajix/broccoli-object-writer)

## Install Broccoli Object Writer

[![NPM](https://nodei.co/npm/broccoli-object-writer.png?downloads=true&downloadRank=true)](https://nodei.co/npm/broccoli-object-writer/)

```bash
$ npm install broccoli-object-writer --save
```

## Documentation

### `writeConfig(outputFile, data)`

`outputFile` *{String}*

The file path to write your configuration to.

Supported extensions are `.json` and `.js`, which output JSON files or UMD modules, respectfully

`data` *{Object OR Function}*

Either a Javascript Object that will be stringified using `JSON.stringify`, or a function that returns a Javascript Object.

## Example

```
var writeObject = require('broccoli-object-writer'),
  mergeTrees = require('broccoli-merge-trees'),
  fixtures = require('./lib/fixtures'),
  funnel = require('broccoli-funnel');

var coreAssets = 'assets';

var vendorAssets = 'vendor';

var assets = mergeTrees([
  writeObject('fixtures.js', fixtures),
  vendorAssets,
  coreAssets
], {
  overwrite: true
});

module.exports = assets;
```